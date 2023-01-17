import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import MessageEditor from './Chat/MessageEditor'
import { getChat } from '../../api/chat'
import { useCookies } from 'react-cookie'
import { useChatStore } from '../../store/ChatStore'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { getCurrentTimeString } from '../../utils/time'
import { Color } from '../../utils/color'
import TextareaAutosize from 'react-textarea-autosize'
import { calculateChatRoomId } from '../../utils/chatroom'
import { Spin } from 'antd';

const Wrapper = styled.div`
  flex-grow: 1;
  border-style: none;
  flex-direction: column;
  display: flex;
  height: 100vh;

  .loadingSpin{
    margin: auto
  }
`
const FriendBar = styled.div`
  border-bottom: solid ${Color.fagrey};
  padding: 10px 15px;
  /* background-color: ${Color.white}; */
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;

`
const ChatArea = styled.div`
  flex-grow: 1;
  /* background-color: ${Color.white};; */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: ${Color.sogrey};
  }

  ::-webkit-scrollbar-thumb {
      background: #${Color.fagrey};
      /* -webkit-border-radius: 1ex;
      -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
  }

  ::-webkit-scrollbar-corner {
  }
`

const Editor = styled.div`
  flex-direction: row;
  display: flex;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${Color.lagrey};
  
  #editorSendButton{
    border: none;
    background-color: inherit;
    outline: none;
    color: ${Color.migrey};
    &:hover {
      color: ${Color.yellow};
    }
  }
  textarea {
    flex-grow: 1;
    background-color: inherit;
    border: none;
    overflow-y: hidden;
    color: white;
    ::placeholder{
      color: white;
    }
  }
`

interface IChatFeed {
  friendId: string,
  sendMessage: (messageText: string, friendId: string) => void
}
const ChatFeed: React.FC<IChatFeed> = (props) => {
  const [currText, setCurrText] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const name = useUserInfoStore((state) => state.name)
  const userId = useUserInfoStore((state) => state.userId)
  const avatar = useUserInfoStore((state) => state.avatar)
  const friendInfos= useUserInfoStore((state) => state.friendInfos)
  const chatHistory = useChatStore((state) => state.chatHistory)
  const addNewMessage = useChatStore((state) => state.addNewMessage)
  const initChatroom = useChatStore((state) => state.initChatroom)

  const fetchChatHistory = async () => {
    console.log('fetch history')
    setLoading(true)
    const res = await getChat(props.friendId, cookies.access_token)
    console.log('fetch hist good??')
    if (res.data.success) {
      const chatRoomId = calculateChatRoomId(userId, props.friendId)
      console.log('chat room id', chatRoomId)
      initChatroom(chatRoomId, res.data.chatMessages)
    }
    setLoading(false)
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'auto'})
  }, [chatHistory])

  useEffect(() => {
    console.log('use effect in chatfeed when friendId change')
    fetchChatHistory()
  }, [props.friendId])

  const sendMessage = () => {
    if (currText.replace(/\s+/g, '') !== ''){
      const messsage = {
        messageText: currText, 
        senderId: userId,
        timestamp: getCurrentTimeString(),
      }
      const chatRoomId = calculateChatRoomId(userId, props.friendId)
      addNewMessage(chatRoomId, messsage)
      props.sendMessage(currText, props.friendId)
    }
    setCurrText('')
  }

  const onKeyEnter: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      setCurrText(currText + '\n')
    } else if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const onClickSendButton: React.MouseEventHandler = (e) => {
    sendMessage()
  }

  const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const text = e.target.value
    if (text.slice(-1) !== '\n'){
      setCurrText(text)
    }
  }

  const dialogue = chatHistory.map((message, idx, history) => {
    // (idx === 0 || (history[idx].timestamp !== history[idx - 1].timestamp)) ? false : true
    let noAvatar = true;
    if ((idx === 0)
      || (history[idx].senderId !== history[idx - 1].senderId)
      || (history[idx].timestamp !== history[idx - 1].timestamp)){
      noAvatar = false
    }
    let senderName = ''
    let senderAvatar = 'standard'
    if (message.senderId === userId){
      senderName = name
      senderAvatar = avatar
    } else {
      senderName = friendInfos[message.senderId].name
      senderAvatar = friendInfos[message.senderId].avatar
    }
    return (
      <MessageEditor 
        key={idx} 
        messageText={message.messageText}
        senderName={senderName}
        timestamp={message.timestamp}
        avatar={senderAvatar}
        noAvatar={noAvatar} 
      />
    )
  })

  const chatHistArea = (loading)? (
    <Spin className='loadingSpin'/>
  ) : (
    <ChatArea>
      {dialogue}
      <div ref={bottomRef}></div>
    </ChatArea>
  )


    return (
      <Wrapper>
        <FriendBar>
          <span>{friendInfos[props.friendId].name}</span>
        </FriendBar>
        {chatHistArea}
        <div style={{margin: '0 15px 25px 15px'}}>
          <Editor>
              <TextareaAutosize 
                minRows={1}
                maxRows={5}
                value={currText}
                placeholder='Message ...'
                onChange={onTextChange}
                onKeyDown={onKeyEnter}
                style={{
                  'outline': 'none',
                  'resize': 'none',
                }}
              />
              <button 
                id='editorSendButton'
                onClick={onClickSendButton}>
                Send
              </button>
          </Editor>
        </div>
        
      </Wrapper>
    )
}

export default ChatFeed
