import React, { useEffect } from 'react'
import styled from 'styled-components'
import MyMessage from './MyMessage'
import { GetChatApi, SendMessageAPI } from '../../api/chat'
import { useCookies } from 'react-cookie'
import { useAuthStore } from '../../store/AuthStore'
import { Message } from '../../utils/Message'


const Box = styled.div`
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
const DefaultChatArea = styled.div`
  height: 700px;
  background-color: white;
`
const LoadMessageButton = styled.button`
  margin-top: 300px;
  background-color: #FCFFB2;
  color: grey;
  border-color: grey;
  padding: 10px;
  border-radius: 20px;
  &:hover{
    border-style: solid;
    border-color: black;
  }
`

const ChatFeed: React.FC = () => {
  const [messageText, setMessageText] = React.useState('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoadedMessage, setIsLoadedMessage] = React.useState(false)
  const bottomRef = React.useRef<null | HTMLDivElement>(null)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const username = useAuthStore((state) => state.username)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const sendMessage = () => {
    console.log(`send: ${messageText}`)
    const newMessage = {
      messageText: messageText, 
      senderUsername: username
    }
    const newMessages = messages.concat(newMessage)
    setMessages(newMessages)
    setMessageText('')
    SendMessageAPI(username, newMessage, cookies.access_token)
    

  }

  const handleKeyEnter: React.KeyboardEventHandler = (e) => {
    if (e.key == 'Enter') {
      sendMessage()
    } 
  }

  const handleClickMessageButton: React.MouseEventHandler = (e) => {
    sendMessage()
  }

  const handleMessageChange: React.ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    setMessageText(target.value)
  }

  const handleLoadMessage = async() => {
    const friendUsername = username
    const res = await GetChatApi(friendUsername, cookies.access_token)
    if (res.data !== undefined) {
      const loadedMessages = res.data.messages
      setMessages(messages.concat(loadedMessages))
      setIsLoadedMessage(true)
    }
    console.log()
  }

  const dialogue = messages.map((message, number) => {
    return <MyMessage key={number} message={message.messageText} />
  })

  if (isLoadedMessage === false){
    return (
      <Box>
        <DefaultChatArea>
          <LoadMessageButton onClick={handleLoadMessage}> 
            Load Message 
          </LoadMessageButton> 
        </DefaultChatArea>
      </Box>
    )
  } else {
    return (
      <Box>
        <ChatArea >
          {dialogue}
          <div ref={bottomRef}></div>
        </ChatArea>
        <Editor>
          <StyledInputBox
            placeholder='Send a Message ...'
            value={messageText}
            onKeyDown={handleKeyEnter}
            onChange={handleMessageChange}>
          </StyledInputBox>

          <StyledSendButton
            onClick={handleClickMessageButton}>
            Send
          </StyledSendButton>
        </Editor>
      </Box>
    )
  }
}

export default ChatFeed