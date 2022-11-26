import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import MyMessage from './MyMessage'


const Box = styled.div`
  /* display: flex;
  flex-direction: column; */

  width: auto;
  /* height: 700px; */
  background-color: white;
  border-style: solid;
  border-right: none;
  border-color: lightgray;
`

const Editor = styled.div`
  border-style: solid;
  margin: 10px 50px;
  padding: 0px 10px;
  border-color: lightgray;
  border-radius: 20px;
`

const StyledInputBox = styled.input`
  width: 90%;
  height: 30px;
  border-style: none;
  outline: none;
`

const StyledSendButton = styled.button`
  height: 30px;
  border-style: none;
  background-color: white;
  border-radius: 20%;
  color: #A0E4CB;
  border-color: #A0E4CB;
`

const ChatArea = styled.div`
  height: 644px; // 644
  background-color: #E3FCBF;
  overflow-y: scroll;
`



const ChatFeed: React.FC = () => {
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState<string[]>([])
  const bottomRef = React.useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const handleKeyEnter: React.KeyboardEventHandler = (e) => {
    // console.log('key down')
    if (e.key == 'Enter') {
      console.log(`send: ${message}`)
      const newTexts = messages.concat(message)
      setMessages(newTexts)
      setMessage('')
    } 
  }

  const handleMessageChange: React.ChangeEventHandler = (e) => {
    console.log('change')

    const target = e.target as HTMLInputElement;
    // console.log(target.value)
    setMessage(target.value)
  }

  const handleSendMessage: React.MouseEventHandler = (e) => {
    console.log(`send: ${message}`)
    const newMessages = messages.concat(message)
    setMessages(newMessages)
    setMessage('')
  }


  const dialogue = messages.map((text, number) => {
    return <MyMessage key={number} message={text} />
  })

  return (
    <Box>
      <ChatArea >
        {dialogue}
        <div ref={bottomRef}></div>
      </ChatArea>
      <Editor>
        <StyledInputBox
          placeholder='Send a Message ...'
          value={message}
          onKeyDown={handleKeyEnter}
          onChange={handleMessageChange}>
        </StyledInputBox>

        <StyledSendButton
          onClick={handleSendMessage}>
          Send
        </StyledSendButton>
      </Editor>

    </Box>
  )
}

export default ChatFeed