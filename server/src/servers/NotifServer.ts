import { Server, WebSocket } from 'ws'
import { authenticate } from '../middlewares/SocketAuthentication'

export class NotifServer {
    private onlineUsers: Map<string, WebSocket[]>
    private unAuthSockets: Set<WebSocket>

    constructor (){
      this.onlineUsers = new Map()
      this.unAuthSockets = new Set()
    }
  
    public mount(wsServer: Server) {
      wsServer.on('connection', (ws, req) => {
        console.log('connection establish in notification server')
  
        this.unAuthSockets.add(ws)
        setTimeout(() => {
          if (this.unAuthSockets.has(ws)) {
            console.log('Time out for authentication, close connection!')
            ws.close()
          }
        }, 100)
  
        ws.on('message', (message) => {
          console.debug('recv message')
          const dmessage =  JSON.parse(message.toString())
          console.log(dmessage)
  
          if (dmessage.type === 'auth') {
            if (!this.unAuthSockets.has(ws)) {
              console.log('Repeat authenticate')
              return
            }
            const userId = authenticate(dmessage.token)
            if (userId === '') {
              console.log('error')
              ws.close()
            } else {
              console.log(userId, 'is connected')
              let sockets = this.onlineUsers.get(userId)
              sockets = (sockets) ? sockets : []
              sockets.push(ws)
              this.onlineUsers.set(userId, sockets)
              this.unAuthSockets.delete(ws)
            }
          } else {
            ws.close()
          }
        })
      })
  
      wsServer.on('close', (ws, req) => {
        console.log(req.socket.remoteAddress, 'is closed')
      })
    }
  
    
    public sendMessage(notification: Object, targetUserIds: string[]) {
        console.log('send notification to friend')
        console.log('target: ', targetUserIds)
    
        for (const userId of targetUserIds) {
          const sockets = this.onlineUsers.get(userId)
          if (sockets !== undefined) {
            sockets.forEach((ws) => {
              console.log('send')
              ws.send(JSON.stringify(notification))
            })
          }
        }
      }
  }