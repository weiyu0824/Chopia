import React, { useState } from 'react'
import styled from 'styled-components'
import { RxAvatar } from 'react-icons/rx'
import { IoIosNotifications } from 'react-icons/io'
import { IoMdPersonAdd } from 'react-icons/io'
import { AiTwotoneSetting } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Color } from '../../utils/color'
import { useAuthStore } from '../../store/AuthStore'
import Contact from './Nav/Contact'
import imageToAdd from '../../asset/gorilla.png'
import UserInfo from './Nav/UserInfo'

const NavWrapper = styled.div`
  height: 100vh;
  width: 300px;
  background-color: ${Color.dblue};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
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
  color: grey;
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


const LeftNav: React.FC = () => {
  const leaveAuth = useAuthStore((state => state.leaveAuth))
  const handlesignOut = () => {
    leaveAuth()
  }

  return (
    <NavWrapper>
      <ContactInfo>
        <div className='caption'>DIRECT MESSAGES </div>
        <Contact />
        <Contact />
      </ContactInfo>

      <DashBoard > 
        <UserInfo />

        <button className='controlButton'>
            <IoMdPersonAdd />
        </button>

        <button className='controlButton'>
            <IoIosNotifications />
        </button>

        <button className='controlButton'>
            <AiTwotoneSetting />
        </button>
        
        {/* <button className='signoutBtn' onClick={handlesignOut}> 
          Sign Out
        </button> */}
      </DashBoard>
    </NavWrapper>    
  )
}
export default LeftNav