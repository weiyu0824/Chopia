import React, { useState } from 'react'
import styled from 'styled-components'
import { RxAvatar } from 'react-icons/rx'
import { IconContext } from 'react-icons'
import { Color } from '../../utils/color'
import { useAuthStore } from '../../store/AuthStore'

const Dash = styled.div`
  height: 100vh;
  width: 300px;
  background-color: ${Color.dblue};
  flex-shrink: 0;
  display: flex;
  flex-direction: column-reverse;
`
const ContactInfo = styled.div`
  height: 100%;
  width: auto;
  padding: 10px;
  .tag {
    color: lightgray;
    font-size: 15px;
    float: left;
  }
`
const UserInfo = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Color.white};
  color: grey;

  .signoutBtn {
    outline: none;
    border: none;
    background-color: ${Color.white};
    &:hover {
      color: ${Color.ddblue}
    }
  }
  .avatar {
    margin: auto 0px;
  }
`

const LeftNav: React.FC = () => {
  const leaveAuth = useAuthStore((state => state.leaveAuth))
  const handlesignOut = () => {
    leaveAuth()
  }

  return (
    <Dash>
      <UserInfo > 
        <div className='avatar'>
          <IconContext.Provider value={{size: '2rem'}}>
            <RxAvatar />
          </IconContext.Provider>
        </div>
        
        <button className='signoutBtn' onClick={handlesignOut}> 
          Sign Out
        </button>
      </UserInfo>

      <ContactInfo>
        <div className='tag'>DIRECT MESSAGES </div>
      </ContactInfo>
    </Dash>    
  )
}
export default LeftNav