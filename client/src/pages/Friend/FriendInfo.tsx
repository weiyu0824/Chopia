import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'
import ActionButton from '../../components/ActionButton'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { useCookies } from 'react-cookie'
import { addFriend } from '../../api/user'

const Panal = styled.div`
  flex-direction: column;
  display: flex;
  height: 25rem;
  width: 20rem;
  border-radius: 0.8rem;
  padding: 2rem;
  background-color: lightblue;
  align-items: center;

  #friendFullName {
    margin: 1rem auto;
    font-size: 1.8rem;
  }
  #findFriendActionBtns {
    margin-top: auto;
  }
`

interface IFriendInfo {
  friendId: string,
  name: string,
  avatar: string,
  onClickCancel: () => void
}
const FriendInfo: React.FC<IFriendInfo> = (props) => {
  const userId = useUserInfoStore((state) => state.userId)
  const friendInfo = useUserInfoStore((state) => state.friendInfos)
  const [cookies] = useCookies(['access_token', 'refresh_token'])
  const [warning, setWarning] = useState('')

  const sendFriendRequest = async () => {
    console.log('send in iinfoooo')
    const res = await addFriend(props.friendId, cookies.access_token)
    
    console.log('Friend request has been sent')
    setWarning(res.data.message)
  }

  let allowToAdd = true
  let wierdWarning = <></>
  if (userId === props.friendId || friendInfo[userId]){
    allowToAdd = false
    wierdWarning = <span>This is you!</span> 
  } else if (friendInfo[props.friendId]) {
    allowToAdd = false
    wierdWarning = <span>You are already friends</span> 
  }  else if (warning !== ''){
    allowToAdd = false
    wierdWarning =  <span>{warning}</span>
  }

  return (
    <Panal>
      <Avatar 
        avatarName={props.avatar}
        size={10}
      />
      <span id='friendFullName'>{props.name}</span>
      {wierdWarning}
      
      <div id='findFriendActionBtns'>
        <ActionButton 
          word='Cancel'
          margin='0.3rem' 
          width='6rem'
          height='2.5rem'
          hoverColor='red'
          onClick={props.onClickCancel} />
        <ActionButton 
          word='Add'
          margin='0.3rem'
          width='6rem'
          height='2.5rem'
          hoverColor='red'
          allowToAct={allowToAdd}
          onClick={sendFriendRequest} />
      </div>

    </Panal>
  )
}

export default FriendInfo