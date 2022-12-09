import React, { useState } from 'react'
import styled from 'styled-components'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import {color} from '../../utils/color'
const C = new color()


const Dash = styled.div`
  height: 100vh;
  width: 300px;
  background-color: ${C.dblue};
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
  background-color: ${C.white};
`

const LeftNav: React.FC = () => {
  return (
    <Dash>
      <UserInfo > 
        <RiLogoutCircleRLine />
      </UserInfo>

      <ContactInfo>
        <div className='tag'>DIRECT MESSAGES </div>
      </ContactInfo>
    </Dash>    
  )
}
export default LeftNav