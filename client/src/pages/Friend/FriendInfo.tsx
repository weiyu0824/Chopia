import React from 'react'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'
import ActionButton from '../../components/ActionButton'
import { useUserInfoStore } from '../../store/UserInfoStore'


const Panal = styled.div`
  flex-direction: column;
  display: flex;
  height: 25rem;
  width: 20rem;
  border-radius: 0.8rem;
  padding: 2rem;
  background-color: lightblue;

  #friendFullName {
    margin: 1.5rem auto;
    font-size: 1.8rem;
  }
  #friendWarning {
    margin-bottom: 1rem;
  }
`

interface IFriendInfo {
  friendId: string,
  name: string,
  avatar: string
  onClickAdd: () => void
  onClickCancel: () => void
}


const FriendInfo: React.FC<IFriendInfo> = (props) => {
  const userId = useUserInfoStore((state) => state.userId)
  const friendInfo = useUserInfoStore((state) => state.friendInfos)

  let allowToAdd = true
  let wierdWarning = ''
  if (userId === props.friendId || friendInfo[userId]){
    allowToAdd = false
    wierdWarning = 'This is you!'
  } else if (friendInfo[props.friendId]) {
    allowToAdd = false
    wierdWarning = 'You are already friends'
  }

  return (
    <Panal>
      <Avatar 
        avatarName={props.avatar}
        size={10}
      />
      <span id='friendFullName'>{props.name}</span>
      <span id='friendWarning'>{wierdWarning}</span>
      <div>
        <ActionButton 
          word='Cancel'
          margin='0.3rem' 
          width='6rem'
          height='2.5rem'
          hoverColor='lightyellow'
          onClick={props.onClickCancel} />
        <ActionButton 
          word='Add'
          margin='0.3rem'
          width='6rem'
          height='2.5rem'
          hoverColor='lightyellow'
          onClick={props.onClickAdd} />
      </div>

    </Panal>
  )
}

export default FriendInfo