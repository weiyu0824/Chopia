import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  margin: 1rem;
  width: auto;
  .info{
    text-align: left;
  }
  #buttonWrapper{
    margin-top: auto;
  }
  #changePasswordButton {
    border: none;
    border-radius: 0.4rem;
    padding: 0.6rem 1rem;
    outline: none;
    background-color: #0197f6;
    &:hover{
      background-color: lightblue;
    }
  }
`

const PasswordSetting: React.FC = (props) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [warning, setWarnining] = useState('')

  const handleChangePassword = () => {
    // TODO in client side: 
    // password align, new password is valid
    // every input is required
    // TODO in server side:
    // match old password
  }

  const handleOldPassword = (password: string) => {
    setOldPassword(password)
  }
  const handleNewPassword = (password: string) => {
    setNewPassword(password)
  }
  const handleConfirmedPassword = (password: string) => {
    setConfirmedPassword(password)
  }
  return (
    <Wrapper>
      <div className='info'>
        <Avatar
          avatarName='fox'
          size={2}
        /> 
        <span>Anderson</span>
      </div>
      
      <DataInputBox 
        id='old-password'
        data={oldPassword}
        dataName='Old password'
        warning=''
        isPassword={true}
        handleChange={(password) => handleOldPassword(password)}
      />
      <DataInputBox 
        id='new-password'
        data={newPassword}
        dataName='New Password'
        warning=''
        isPassword={true}
        handleChange={(password)=>{handleNewPassword(password)}}
      />
      <DataInputBox 
        id='confirm-password'
        data={confirmedPassword}
        dataName='Confirmation'
        warning=''
        isPassword={true}
        handleChange={(password)=>{handleConfirmedPassword(password)}}
      />
     <WarningBlock isHidden={false}>
      test !!!
     </WarningBlock>
     <div id='buttonWrapper'>
      <button id='changePasswordButton'>Change Password</button>
     </div>
      
    </ Wrapper>
  )
}

export default PasswordSetting