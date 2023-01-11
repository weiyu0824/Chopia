import React from 'react'
import styled from 'styled-components'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { AiOutlineRobot } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import { useAuthStore } from '../../../store/AuthStore'
import { AvatarImgs } from '../../../utils/avatar'
import { useNavigate } from 'react-router-dom'
import { BsPencilFill } from 'react-icons/bs'
import Icon from '../../../components/Icon'
import Avatar from '../../../components/Avatar'
import { useCookies } from 'react-cookie'
import { useUserInfoStore } from '../../../store/UserInfoStore'
import { useChatStore } from '../../../store/ChatStore'
import { useNotifStore } from '../../../store/NotifStore'

interface IPanal {
  showPanal: boolean
}
const Panal = styled.div<IPanal>`
  position: absolute;
  top: -19rem;
  flex-direction: column;
  display: ${(props) => (props.showPanal)? 'flex': 'none'};
  height: 18rem;
  width: 17rem;
  border-radius: 0.8rem;
  padding: 1rem;
  background-color: orange;
  cursor: default;
  
  /* #userInfoEditButton {
    position: absolute;
    left: 85%;
  } */
  #userInfoFullName {
    font-size: 1.8rem;
  }
`
const ControlPart = styled.div`
  flex-direction: column;
  display: flex;
  border-radius: 0.5rem;
  height: 8rem;
  padding: 0 0.8rem;
  background-color: darkgray;

  .personalInfo {
    border-bottom: solid;
    padding: 0.6rem 0.2rem;
    
    text-align: left;
    color: black;
  }

  .signoutButton{
    flex-grow: 2;
    border-radius: 0.2rem;
    margin: 0.6rem 0rem;
    padding: 0 0.3rem;
    cursor: pointer;
    text-align: left;
    color: black;
    &:hover{
      background-color: lightblue;
    }
  }
`

interface IUserInfoPanal {
  showPanal: boolean
  email: string
  name: string
  username: string
  avatar: string
}

const UserInfoPanal: React.FC<IUserInfoPanal> = (props) => {
  const leaveAuth = useAuthStore((state => state.leaveAuth))
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token'])
  const resetUserInfo = useUserInfoStore((state) => state.resetUserInfo)
  const resetChatroom = useChatStore((state) => state.resetChatroom)
  const resetNotif = useNotifStore((state) => state.resetNotif)
  const navigate = useNavigate()

  const handleSignOut = () => {
    console.log('sign out')
    removeCookie('access_token')
    removeCookie('refresh_token')

    // Make sure to reset all state here!!
    leaveAuth()
    resetUserInfo()
    resetChatroom()
    resetNotif()
    navigate('/')
  }
  return (
    <Panal showPanal={props.showPanal}>
      <Avatar 
        avatarName={props.avatar}
        size={6}/>
      <span id='userInfoFullName'>{props.name}</span>

      <ControlPart> 
        <div className='personalInfo'>
          <div> <AiOutlineRobot/>&nbsp; #{props.username}</div>
          <div> <GoMail/>&nbsp; {props.email}</div>
        </div>
        <div className='signoutButton'
          onClick={handleSignOut}> 
          <FaSignOutAlt /> &nbsp;
          <span>Sign out</span>
        </div>
      </ControlPart>
    </Panal>
  )
      
}
            
export default UserInfoPanal