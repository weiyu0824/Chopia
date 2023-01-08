import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ChatFeed from './ChatFeed'
import LeftNav from './LeftNav'
import styled from 'styled-components'
import TopicDrawer from './TopicDrawer'
import FriendPanal from '../Friend/FriendPanal'
import NotificationPanal from '../Notification/NotificationPanal'
import SettingPanel from '../Setting/SettingPanal'
import DefaultArea from './DefaultArea'
import { useAuthStore } from '../../store/AuthStore'
import { useUserInfoStore } from '../../store/UserInfoStore';
import { useCookies } from 'react-cookie';
import { loginWithToken } from '../../api/auth';
import Demo from '../../pages/Demo/Demo'
import MyNav from '../../components/MyNav'
import { useChatStore } from '../../store/ChatStore'



const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
`

interface IHome{
  page: 'inbox' | 'notification' | 'default'
}
const Home: React.FC<IHome> = (props) => {

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const userId = useUserInfoStore((state => state.userId))
  const wsChat = useRef<WebSocket | null>(null)
  const wsNotif = useRef<WebSocket | null>(null)
  const [cookies] = useCookies(['access_token', 'refresh_token'])  
  const params = useParams()
  const addNewMessage = useChatStore((state) => state.addNewMessage)
  const friendInfo = useUserInfoStore((state) => state.friendInfos)


  useEffect(() => {
    if (isLoggedIn) {
      console.log('Use effect in Home')
      // Socket for chat server
      wsChat.current = new WebSocket('ws://localhost:8088/chat')
      wsChat.current.onopen = (event) => {
        console.log('open ws (chat)')
        if (wsChat.current) {
          wsChat.current.send(JSON.stringify({
            type: 'auth',
            token: `${cookies.access_token}`
          }))
        }
      }
      wsChat.current.onclose = (event) => {
        console.log('close ws (chat)')
      }
      wsChat.current.onerror = (event) => {
        console.log('error ws (chat)')
      }
      wsChat.current.onmessage = (event) => {
        console.log('message ws')
        const message = JSON.parse(event.data)

        addNewMessage(message.chatRoomId, {
          senderId: message.senderId,
          timestamp: message.timestamp,
          messageText: message.messageText
        })

        console.log(message)
      }
      // Socket for notification server
      wsNotif.current = new WebSocket('ws://localhost:8088/notif')
      wsNotif.current.onopen = () => {
        console.log('open ws (notif)')
        if (wsNotif.current) {
          wsNotif.current.send(JSON.stringify({
            type: 'auth',
            token: `${cookies.access_token}`
          }))
        }
      }
      wsNotif.current.onclose = () => {
        console.log('close ws (notif)')
      }
      wsNotif.current.onerror = () => {
        console.log('error ws (notif)')
      }
      wsNotif.current.onmessage = () => {
        console.log('message ws (notif)')
      }
    }
  }, [isLoggedIn])

  const sendMessage = (messageText: string, friendId: string) => {
    const message = {
      type: 'chat',
      senderId: userId,
      messageText: messageText,
      friendId: friendId,
    }
    if (wsChat.current) {
      wsChat.current.send(JSON.stringify(message))
    }
  }
   
  if (!isLoggedIn) {
    return (
      <>
        <MyNav />
        <Demo />
      </>
    )
  } else {
    if (props.page === 'notification') {
      return (
        <MyContainer>
          <LeftNav/>
          <NotificationPanal/>
        </MyContainer>
      )
    } else if (props.page === 'default' 
      || !friendInfo[(params.friendId)? params.friendId: '']) {
      return (
        <MyContainer>
          <LeftNav/>
          <DefaultArea />
        </MyContainer>
      )
    } else if (props.page === 'inbox') {

      return (
        <MyContainer>
          <LeftNav/>
          <ChatFeed 
            friendId={(params.friendId)? params.friendId : ''} 
            sendMessage={sendMessage}
          /> 
          <TopicDrawer />
        </MyContainer>
      )
    } else {
      return <></>
    }
  }
}

export default Home