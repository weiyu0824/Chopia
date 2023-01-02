import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { IoIosNotifications } from 'react-icons/io'
import { IoMdPersonAdd } from 'react-icons/io'
import { AiTwotoneSetting } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Color } from '../../utils/color'
import { useAuthStore } from '../../store/AuthStore'
import Contact from './Nav/Contact'
import UserInfo from './Nav/UserInfo'
import SettingPanel from '../Setting/SettingPanal'
import FriendPanal from '../Friend/FriendPanal'
import useOnClickOutside from '../../hook/useOnClickOutside'


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

  #settingPopOutPanal{
    display: ${(props) => (props.popOutName === 'setting')? '': 'none'};
  }
  #friendPopOutPanal {
    display: ${(props) => (props.popOutName === 'friend')? '': 'none'};   
  }

  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${(props) => (props.popOutName !== '')? '': 'none'};
    background-color: black;
    opacity: 0.6;
  }
`

const ContactInfo = styled.div`
  height: 100%;
  width: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .caption {
    color: lightgray;
    font-size: 1rem;
    text-align: left;
    margin: 0.2rem 0rem;
  }

  .contact {
    background-color: orange;
    text-align: left;
    margin: 0.2rem 0rem;
  }
  
`

const DashBoard = styled.div`
  height: 3rem;
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
`
interface IPopOutPanal {
  showPanal: boolean
}
const PopOutPanal = styled.div<IPopOutPanal>`
  display: ${(props) => (props.showPanal)? '': 'none'};
`

const LeftNav: React.FC = () => {
  const [popOutName, setPopOutName] = useState('')
  const friendInfos = useAuthStore((state) => state.friendInfos)
  const settingPanalRef = useRef<null |  HTMLDivElement>(null)
  const friendPanalRef = useRef<null |  HTMLDivElement>(null)
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

  const contacts = friendInfos.map((friendInfo, index) => {
    return <Contact 
              key={index}
              contactId={friendInfo.userId}
              name={friendInfo.name} 
              username={friendInfo.username}
              avatar={friendInfo.avatar}
            />
  })
  // const closePanal = () => {

  // }
  // let popOutPanal = <></>
  

  return (
    <Wrapper popOutName={popOutName}>
      <ContactInfo>
        <div className='caption'>DIRECT MESSAGES </div>
        {contacts}
      </ContactInfo>

      <DashBoard > 
        <UserInfo />

        <button className='controlButton'>
            <IoIosNotifications />
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
        

        <div className='overlay' />
        <div id='settingPopOutPanal' ref={settingPanalRef}>
          <SettingPanel />
        </div>

        <div id='friendPopOutPanal' ref={friendPanalRef}>
          <FriendPanal />
        </div>
        
        {/* <button className='signoutBtn' onClick={handlesignOut}> 
          Sign Out
        </button> */}
      </DashBoard>
    </Wrapper>    
  )
}
export default LeftNav