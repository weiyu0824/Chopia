import exp from 'constants'
import express, { Application } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import ws, { Server } from 'ws'
import { parse } from 'url'
import { APIServer } from './servers/APIServer'
import { ChatServer } from './servers/ChatServer'
import { NotifServer } from './servers/NotifServer'

class App {
  public express: Application
  public port: number
  public dbUrl: string
  public wsServer1: ws.Server
  public wsServer2: ws.Server
  public static chatServer = new ChatServer()
  public static notifServer = new NotifServer()
  public static apiServer = new APIServer(App.notifServer)
  
  

  constructor(port: number, dbUrl: string) {
    this.express = express()
    this.port = port
    this.dbUrl = dbUrl
    this.wsServer1 = new ws.Server({ noServer: true })
    this.wsServer2 = new ws.Server({ noServer: true })

    // Micro servers
    // App.apiServer = new APIServer()
    // App.chatServer = new ChatServer()

    this.mountDatabase()
    

    // mount Http-based service
    App.apiServer.mount(this.express)

    // mount WS-based service
    App.chatServer.mount(this.wsServer1)
    App.notifServer.mount(this.wsServer2)
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

    
    server.on('upgrade', (req: http.IncomingMessage, socket, head) => {
      console.log('hello new conn')
      if (req.url) {
        const { pathname } = parse(req.url)
        if (pathname === '/chat') {
          const wss = this.wsServer1
          wss.handleUpgrade(req, socket, head, function done(ws) {
            wss.emit('connection', ws, req)
          })
        } else if (pathname === '/notif') {
          const wss = this.wsServer2
          wss.handleUpgrade(req, socket, head, function done(ws) {
            wss.emit('connection', ws, req)
          })
        } else {
          socket.destroy()
        }
      }else {
        socket.destroy()
      }
      
    })
  }
}

export default App;


