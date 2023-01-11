import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import imageToAdd from '../../asset/hamster.png'
import { useCookies } from 'react-cookie'
import { useNotifStore } from '../../store/NotifStore'
import Avatar from '../../components/Avatar'
import { deleteNotif } from '../../api/notif'
import { acceptFriend } from '../../api/user'

interface IReplyButton {
  funcType: string
}
const ReplyButton = styled.button<IReplyButton>`
  margin: auto 0.2rem;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  padding: 0.5rem;
  background-color: ${props => (props.funcType === 'confirm') ? 'lightblue' : 'lightgrey'};
  color: ${props => (props.funcType === 'confirm') ? 'white' : 'black'};
`
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding: 2rem 5rem;
  border-style: none;
  background-color: ${Color.white};
  overflow: scroll;
  .windowTitle{
    text-align: left;
  }
`

const Notification = styled.div`
  flex-direction: row;
  display: flex;
  border-radius: 0.2rem;
  padding: 0.2rem;
  .avatarBox {
    flex-shrink:0;
    margin: auto 1rem;
    width: 2rem;
    height: 2rem;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  
  .notificationMessage {
    margin: auto auto auto 0;
  }

  &:hover{
    background-color: ${Color.lblue};
  }
`

const NotificationPanal = () => {
  const [cookies, _] = useCookies(['access_token', 'refresh_token'])
  const notifications = useNotifStore((state) => state.notificatoins)
  const removeNotif = useNotifStore((state) => state.removeNotif)

  const onAcceptRequest = async (friendId: string, notifId: string) => {
    const res = await acceptFriend(friendId, notifId, cookies.access_token)
    if (res.data.success) {
      removeNotif(notifId)
    }
  }
  const onDeleteNotif = async (notifId: string) => {
    console.log('notifId')
    const res = await deleteNotif(notifId, cookies.access_token)
    if (res.data.success) {
      removeNotif(notifId)
    }
  }


  const notifBars = notifications.map((notif, index) => {
    console.log(notif.receiverId)
    let news = <></>
    if (notif.type === 'friend-request') {
      news = (
        <>
          <span className='notificationMessage'>
            <strong>{notif.initiatorInfo.name}</strong> send you a friend request</span>
          <ReplyButton funcType='confirm'
           onClick={() => onAcceptRequest(notif.initiatorId, notif.notifId)}>Confirm</ReplyButton>
          <ReplyButton funcType='delete' onClick={() => onDeleteNotif(notif.notifId)}>Delete</ReplyButton>
        </>
      )
    } else if (notif.type === 'new-friend') {
      news = (
        <>
          <span className='notificationMessage'>
            <strong>{notif.initiatorInfo.name}</strong> become your new friend !!</span>
        </>
      )
    }
    return (
      <Notification key={index}>
        <Avatar 
          avatarName={notif.initiatorInfo.avatar}
          size={2.5}
        />
        {news}
      </Notification>
    )
  })

  return (
    <Wrapper>
      <h2 className='windowTitle'>Notification</h2>
      {notifBars}
      {/* <span> you dont have any notifications right now</span> */}
    </Wrapper>
  )
}

export default NotificationPanal