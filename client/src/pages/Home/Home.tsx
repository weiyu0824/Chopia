import React, { useState } from 'react'
import ChatFeed from './ChatFeed'
import LeftNav from './LeftNav'
import styled from 'styled-components'
import TopicDrawer from './TopicDrawer'
// const MessageBox: React.FC = (props: {message: string}) => {
//     return <div>props.message</div>
// }

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
`

// const Chatting = styled.div`
//     height: 100vh;
//     width: 100%;
//     background-color: pink;
// `
// const Trigger = styled.div`
//     height: 100vh;
//     width: 80px;
//     background-color: coral;
// `

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