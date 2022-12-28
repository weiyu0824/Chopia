import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import imageToAdd from '../../asset/hamster.png'

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
  return (
    <Wrapper>
      <h2 className='windowTitle'>Notification</h2>
      <Notification>
        <div className='avatarBox'>
          <img className='avatar' src={imageToAdd} alt="Image" />
        </div>
        <span className='notificationMessage'><strong>Anderson</strong> send you a friend request</span>
        <ReplyButton funcType='confirm'>Confirm</ReplyButton>
        <ReplyButton funcType='delete'>Delete</ReplyButton>
      </Notification>
    </Wrapper>
  )
}

export default NotificationPanal