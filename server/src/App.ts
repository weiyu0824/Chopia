import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { AuthController } from './controllers/AuthController'
import { ChatController } from './controllers/ChatController'
import { Controller } from './interfaces/Controller'
import { errorMiddleware } from './middlewares/ErrorMiddleware'

class App {
  public express: Application
  public port: number
  public dbUrl: string
  public apiUrl: string

  constructor(port: number, dbUrl: string) {
    this.express = express()
    this.port = port
    this.dbUrl = dbUrl
    this.apiUrl = '/api'

    const controllers: Controller[] = [new AuthController(), new ChatController()]
    this.mountDatabase()
    this.mountMiddlewares()
    this.mountControllers(controllers)
    this.mountErrorHandler()
  }

  private mountMiddlewares(): void {
    // this.express.use(helmet())
    this.express.use(cors())
    // this.express.use(morgan('dev'))

    // body-parser
    this.express.use(express.json())
    // this.express.use(express.urlencoded({ extended: false })) 
    // this.express.use(compression())
  }

  private mountControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      console.log(this.apiUrl + controller.path)
      this.express.use(this.apiUrl + controller.path, controller.router)
    })
  }

  private mountErrorHandler(): void {
    this.express.use(errorMiddleware)
  }

  private async mountDatabase() {
    try {
      await mongoose.connect(this.dbUrl)
      console.log(`Sucussefully connect to ${this.dbUrl} !!`);
    } catch (error) {
      console.log("Could not connect to database");
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port} ...`)
    })
  }
}

export default App;
