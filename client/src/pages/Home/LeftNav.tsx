import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IoIosNotifications } from 'react-icons/io'
import { IoMdPersonAdd } from 'react-icons/io'
import { AiTwotoneSetting } from 'react-icons/ai'
import { Color } from '../../utils/color'
import Contact from './Nav/Contact'
import UserLabel from './Nav/UserLabel'
import SettingPanel from '../Setting/SettingPanal'
import FriendPanal from '../Friend/FriendPanal'
import useOnClickOutside from '../../hook/useOnClickOutside'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { useNavigate } from 'react-router-dom'
import { useNotifStore } from '../../store/NotifStore'
import { useCookies } from 'react-cookie'
import { getNotifs } from '../../api/notif'


interface IWrapper {
  popOutName: string
}
const Wrapper = styled.div<IWrapper>`
  height: 100vh;
  width: 300px;
  background-color: ${Color.dblue};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${(props) => (props.popOutName !== '')? '': 'none'};
    background-color: black;
    opacity: 0.9;
  }

  #leftNavTopSearchInput {
    margin: 10px 10px;
    border-radius: 2px;
    border: none;
    padding: 5px;
    outline: none;
    background-color: lightgrey;
  }

  .caption {
    margin: 0px 10px;
    color: lightgray;
    font-size: 1rem;
    text-align: left;   
  }
`

const ContactInfo = styled.div`
  /* display: flex;
  flex-direction: column; */
  height: 100%;
  width: auto;
  padding: 10px;
  overflow: scroll;
  
  .contact {
    background-color: orange;
    text-align: left;
    margin: 0.2rem 0rem;
  }
  
`

const DashBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Color.grey};
  /* color: grey; */
  padding: 0.3rem 0.5rem;

  .signoutBtn {
    outline: none;
    border: none;
    background-color: ${Color.white};
    &:hover {
      color: ${Color.ddblue}
    }
  }
  .controlButton {
    color: black;
    font-size: 1.5rem;
    outline: none;
    border: none;
    margin: 0rem 0.2rem;
    border-radius: 0.2rem;

    &:hover {
      background-color: lightblue;
    }
  }
  #notifBtn{
    position: relative;
    #redDot{
      position: absolute;
      top: 5px;
      left: 20px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: red;
    }
  }
`

const LeftNav: React.FC = () => {
  const [popOutName, setPopOutName] = useState('')
  const friendInfos = useUserInfoStore((state) => state.friendInfos)
  const settingPanalRef = useRef<null |  HTMLDivElement>(null)
  const friendPanalRef = useRef<null |  HTMLDivElement>(null)
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const addOldNotification = useNotifStore((state) => state.addOldNotification)

  const fetchNotifs = async () => {
    console.log('fetch notifs')
    const res = await getNotifs(cookies.access_token)
    if (res.data.success) {
      addOldNotification(res.data.notifs)
    }
  }
  useEffect(() => {
    console.log('left nev use effect')
    fetchNotifs()
  }, [])

  useOnClickOutside(settingPanalRef, () => {
    if (popOutName === 'setting') {
      setPopOutName('')
    }
  })
  useOnClickOutside(friendPanalRef, () => {
    if (popOutName === 'friend') {
      setPopOutName('')
    }
  })
  const goToNotification = () => {
    navigate('/notification')
  }

  const contacts = Object.values(friendInfos).map((friendInfo, index) => {
    return (
      <Contact 
        key={index}
        contactId={friendInfo.userId}
        name={friendInfo.name} 
        username={friendInfo.username}
        avatar={friendInfo.avatar}
      />
    )
  })

  let popOutPanal = <></>
  if (popOutName === 'setting') {
    popOutPanal = (
      <div ref={settingPanalRef}>
        <SettingPanel />
      </div>
    )
  } else if (popOutName === 'friend') {
    popOutPanal = (
      <div ref={friendPanalRef}>
        <FriendPanal />
      </div>
    )
  }

  return (
    <Wrapper popOutName={popOutName}>
      <input id='leftNavTopSearchInput' placeholder='Search for friend'/>
      {/* <div className='caption'>DIRECT MESSAGES </div> */}
      <ContactInfo>
       {contacts}
      </ContactInfo>

      <DashBoard > 
        <UserLabel />

        <button 
          id='notifBtn'
          className='controlButton'
          onClick={goToNotification}>
            <div id='redDot'/>
            <IoIosNotifications />
            {/* <VscBellDot />
            <VscBell /> */}
        </button>

        <button 
          className='controlButton'
          onClick={() => {setPopOutName('friend')}}>
            <IoMdPersonAdd />
        </button>

        <button 
          className='controlButton'
          onClick={() => {setPopOutName('setting')}}>
            <AiTwotoneSetting />
        </button>
        
        {/* Popout */}
        <div className='overlay'/>
        {popOutPanal}

      </DashBoard>
    </Wrapper>    
  )
}
export default LeftNav