import http from 'http'
import ws, { Server, WebSocket } from 'ws'
import { ChatHandler } from '../handlers/ChatHandler'

export class ChatServer {
  private onlineUsers: Map<string, WebSocket[]>
  private chatHandler: ChatHandler
  constructor (){
    this.onlineUsers = new Map()
    this.chatHandler = new ChatHandler()
  }

  public mount(wsServer: Server) {
    wsServer.on('connection', (ws, req, userId) => {
      console.log(userId, 'is connected')
      let sockets = this.onlineUsers.get(userId)
      sockets = (sockets) ? sockets : []
      sockets.push(ws)
      this.onlineUsers.set(userId, sockets)
      
      // console.log('Current user')
      // console.log(this.onlineUsers)

      // send notification to the server
      
      ws.on('message', (message) => {
        message =  JSON.parse(message.toString())
        if (message.type === 'private') {
          const notification = this.chatHandler.receiveMessage(userId, message.friendId, message.messageText)
          this.sendMessage(notification, [message.friendId])


        } else if (message.type === 'group') {

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
    console.log('----------------')
    console.log(message)
    console.log(this.onlineUsers)    
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