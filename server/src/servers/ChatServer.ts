import { Server, WebSocket } from 'ws'
import { ChatHandler } from '../handlers/ChatHandler'
import { authenticate } from '../middlewares/SocketAuthentication'

export class ChatServer {
  private onlineUsers: Map<string, WebSocket[]>
  private chatHandler: ChatHandler
  private unAuthSockets: Set<WebSocket>
  private static INSTANCE: ChatServer | null = null
  
  private constructor (){
    this.onlineUsers = new Map()
    this.chatHandler = new ChatHandler()
    this.unAuthSockets = new Set()
  }

  public static getInstance = () => {
    if (!this.INSTANCE){
      this.INSTANCE = new ChatServer()
    }
    return this.INSTANCE
  }

  public mount(wsServer: Server) {
    wsServer.on('connection', (ws, req) => {
      console.log('connection establish in chat server')

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
        } else if (dmessage.type === 'chat') {
          const notification = this.chatHandler.receiveMessage(dmessage.senderId, dmessage.friendId, dmessage.messageText)
          this.sendMessage(notification, [dmessage.friendId])
        } else {
          ws.close()
        }
      })
    })

    wsServer.on('close', (ws, req) => {
      console.log(req.socket.remoteAddress, 'is closed')
    })
  }

  public sendMessage(message: Object, targetUserIds: string[]) {
    console.log('send message to friend')
    console.log('target: ', targetUserIds)
    for (const userId of targetUserIds) {
      const sockets = this.onlineUsers.get(userId)
      if (sockets !== undefined) {
        sockets.forEach((ws) => {
          console.log('send')
          ws.send(JSON.stringify(message))
        })
      }
    }
  }

}