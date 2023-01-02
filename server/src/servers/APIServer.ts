import express, { Application } from 'express'
import cors from 'cors'
import { AuthController } from '../controllers/AuthController'
import { ChatController } from '../controllers/ChatController'
import { MLController } from '../controllers/MLController'
import { UserController } from '../controllers/UserController'
import { Controller } from '../interfaces/Controller'
import { handleError } from '../middlewares/ErrorHandler'

export class APIServer {
  private apiUrl: string
  private controllers: Controller[]

  constructor() {
    this.apiUrl = '/api'
    this.controllers = [
      new AuthController(), new ChatController(), new MLController(), new UserController()
    ]

  }

  public mount(app: Application) {
    this.mountMiddlewares(app)
    this.mountControllers(app)
    this.mountErrorHandler(app)
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