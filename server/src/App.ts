import exp from 'constants'
import express, { Application } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import ws, { Server } from 'ws'
import { APIServer } from './servers/APIServer'
import { ChatServer } from './servers/ChatServer'
import { authenticate } from './middlewares/SocketAuthentication'

class App {
  public express: Application
  public port: number
  public dbUrl: string
  public wsServer: ws.Server
  public static apiServer = new APIServer()
  public static chatServer = new ChatServer()
  public static testStr = 'hello world'
  
  

  constructor(port: number, dbUrl: string) {
    this.express = express()
    this.port = port
    this.dbUrl = dbUrl
    this.wsServer = new ws.Server({ noServer: true })

    // Micro servers
    // App.apiServer = new APIServer()
    // App.chatServer = new ChatServer()

    this.mountDatabase()
    

    // mount Http-based service
    App.apiServer.mount(this.express)

    // mount WS-based service
    App.chatServer.mount(this.wsServer)
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
    const server = this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port} ...`)
    })

    const wss = this.wsServer
    server.on('upgrade', (req: http.IncomingMessage, socket, head) => {
      wss.handleUpgrade(req, socket, head, function done(ws) {
        wss.emit('connection', ws, req)
      })
    })
  }
}

export default App;


