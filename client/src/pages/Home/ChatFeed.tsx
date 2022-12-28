import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import MessageEditor from './Chat/MessageEditor'
import { GetChatApi, SendMessageAPI } from '../../api/chat'
import { useCookies } from 'react-cookie'
import { useAuthStore } from '../../store/AuthStore'
import { Message } from '../../utils/Message'
import { getCurrentTimeString } from '../../utils/time'
import { Color } from '../../utils/color'
import { AiOutlineMessage } from 'react-icons/ai'
import { IconContext } from "react-icons"

const Box = styled.div`
  width: 100%;
  height: 1vh;
  /* height: 700px; */
  border-style: none;
`
const Editor = styled.div`
  height: 40px;
  border-style: solid;
  margin: 10px 50px;
  padding: 0px 10px;
  border-color: lightgray;
  background-color: white;
  border-radius: 20px;
`
const StyledInputBox = styled.input`
  width: 90%;
  height: 90%;
  border-style: none;
  outline: none;
`
const StyledSendButton = styled.button`
  height: 30px;
  border-style: none;
  background-color: white;
  border-radius: 20%;
  color: ${Color.blue};
  border-color: #A0E4CB;
`
const ChatArea = styled.div`
  padding-top: 20px;
  height: calc(100vh - 60px); // 644
  background-color: ${Color.white};
  overflow-y: scroll;
`
const DefaultChatArea = styled.div`
  height: 100vh;
  background-color: black;

  .loadMsgBtn{
    margin-top: 300px;
    background-color: ${Color.white};
    color: grey;
    border: none;
    padding: 10px;
  &:hover{
    color: ${Color.dblue}
  }
  }
`
const LoadMessageButton = styled.button`
  
`

const ChatFeed: React.FC = () => {
  const [messageText, setMessageText] = React.useState('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoadedMessage, setIsLoadedMessage] = React.useState(false)
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const username = useAuthStore((state) => state.username)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const sendMessage = () => {
    console.log(`send: ${messageText}`)
    const newMessage = {
      messageText: messageText, 
      senderUsername: username,
      time: getCurrentTimeString()
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
      console.log(res.data.messages)
      setMessages(messages.concat(loadedMessages))
      setIsLoadedMessage(true)
      
    }
    
  }

  const dialogue = messages.map((message, index, messages) => {
    const showOnlyMessage = (index === 0 || (messages[index].time !== messages[index - 1].time) ) ? false : true
    return <MessageEditor key={index} showOnlyMessage={showOnlyMessage} message={message} />
  })

  if (isLoadedMessage === false){
    return (
      <Box>
        <DefaultChatArea>
          <button className='loadMsgBtn' onClick={handleLoadMessage}>
            <IconContext.Provider value={{size: '5rem'}}>
              <AiOutlineMessage />
            </IconContext.Provider >
          </button>
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