import React, { useState } from 'react'
import ChatFeed from './ChatFeed'
import LeftNav from './LeftNav'
import styled from 'styled-components'
import TopicDrawer from './TopicDrawer'
import FriendPanal from '../Friend/FriendPanal'
import NotificationPanal from '../Notification/NotificationPanal'
import SettingPanel from '../Setting/SettingPanal'

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Home: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([""])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    console.log(inputMessage)
  }
  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(inputMessage)
    const updatedMessages = messages.concat(inputMessage)
    setMessages(updatedMessages)
    setInputMessage("")

  }

  let chatHistory: JSX.Element[] = []
  messages.forEach((message, index) => {
    chatHistory.push(<div key={index}>{message}</div>)
  })
  return (
      
    <MyContainer>
      <LeftNav/>
      {/* <Chatting >sdf</Chatting> */}
      {/* <NotificationPanal /> */}
      
      
      {/* <div className='overlay'></div>
      <SettingPanel /> */}
      <ChatFeed />
      <TopicDrawer />
    </MyContainer>
    
    // <Container fluid className='gx-0 vh-100'>
    //     <Row className='gx-0'>
    //         {/* <Col>
    //             <TopicBox />
    //         </Col> */}
    //     </Row>
    // </Container>
  )
}

export default Home