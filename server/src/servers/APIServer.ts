import express, { Application } from 'express'
import cors from 'cors'
import { AuthController } from '../controllers/AuthController'
import { ChatController } from '../controllers/ChatController'
import { MLController } from '../controllers/MLController'
import { UserController } from '../controllers/UserController'
import { Controller } from '../interfaces/Controller'
import { handleError } from '../middlewares/ErrorHandler'
import { NotifServer } from './NotifServer'
import { NotifController } from '../controllers/NotifController'

export class APIServer {
  private apiUrl: string
  private controllers: Controller[]
  private notifServer: NotifServer
  private static INSTANCE: APIServer | undefined = undefined

  private constructor() {
    this.apiUrl = '/api'
    this.controllers = [
      new AuthController(), new ChatController(), new MLController(), new UserController(), new NotifController()
    ]
    this.notifServer = NotifServer.getInstance()
  }

  public static getInstance = () => {
    if (!this.INSTANCE){
      this.INSTANCE = new APIServer()
    }
    return this.INSTANCE
  }
  

  public mount(app: Application) {
    this.mountMiddlewares(app)
    this.mountControllers(app)
    this.mountErrorHandler(app)
    app.use((req, res, next) => {
      // console.log('notif service')
      // console.log(res.locals)
    })
  }

  private mountMiddlewares(app: Application) {
    // app.use(helmet())
    app.use(cors())
    // app.use(morgan('dev'))

    // body-parser
    app.use(express.json())
    // app.use(express.urlencoded({ extended: false })) 
    // app.use(compression())
  }

  private mountControllers(app: Application) {
    this.controllers.forEach((controller) => {
      console.log(this.apiUrl + controller.path)
      app.use(this.apiUrl + controller.path, controller.router)
    })
  }

  private mountErrorHandler(app: Application) {
    app.use(handleError)
  }
}