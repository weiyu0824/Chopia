import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { changePassword } from '../../api/user'
import Avatar from '../../components/Avatar'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'
import { validate } from '../../utils/validate'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { Spin } from 'antd';


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
  const name = useUserInfoStore((state) => state.name)
  const avatar = useUserInfoStore((state) => state.avatar)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const startValidation = useRef(false)
  const [oldPasswordWarning, setOldPasswordWarning] = useState('')
  const [newPasswordWarning, setNewPasswordWarning] = useState('')
  const [confirmedPasswordWarning, setConfirmedPasswordWarning] = useState('')
  const [cookies, _] = useCookies(['access_token', 'refresh_token'])
  const [warningMessage, setWarningMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassoword = async () => {
    validateOldPassword(oldPassword)
    validateNewPassword(newPassword)
    validateConfirmPassword(confirmedPassword)
    startValidation.current = true
    console.log('Able to submit')
    if (confirmedPasswordWarning === ''
      && newPasswordWarning === ''
      && oldPasswordWarning === '') {
        setLoading(true)
        const res = await changePassword(oldPassword, newPassword, cookies.access_token)
        if (res.data.success) {
          console.log('update password !')
          setWarningMessage(res.data.message)
        }else {
          setWarningMessage(res.data.message)
        }
        setLoading(false)
      }
  }
  
  // TODO in server side:
  const validateOldPassword = (password: string) => {
    const warning = validate(password, {})
    setOldPasswordWarning(warning)
  }

  const validateNewPassword = (password: string) => {
    const warning = validate(password, {type: 'password'})
    setNewPasswordWarning(warning)
  }
  const validateConfirmPassword = (password: string) => {
    const warning = (password === newPassword) ? '': 'Please make both passwords matched'
    setConfirmedPasswordWarning(warning)
  }

  const handleOldPassword = (password: string) => {
    setOldPassword(password)
    if (startValidation.current) {
      validateOldPassword(password)
    }
  }
  const handleNewPassword = (password: string) => {
    setNewPassword(password)
    if (startValidation.current) {
      validateNewPassword(password)
    }
  }
  const handleConfirmedPassword = (password: string) => {
    setConfirmedPassword(password)
    if (startValidation.current) {
      validateConfirmPassword(password)
    }
  }

  if (loading) {
    return (
      <Wrapper>
      <div className='info'>
        <Avatar
          avatarName={avatar}
          size={2}
        /> 
        <span>{name}</span>
      </div>
      <Spin />
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <div className='info'>
          <Avatar
            avatarName={avatar}
            size={2}
          /> 
          <span>{name}</span>
        </div>
        
        <DataInputBox 
          id='old-password'
          data={oldPassword}
          dataName='Old password'
          warning={oldPasswordWarning}
          isPassword={true}
          handleChange={(password) => handleOldPassword(password)}
        />
        <DataInputBox 
          id='new-password'
          data={newPassword}
          dataName='New Password'
          warning={newPasswordWarning}
          isPassword={true}
          handleChange={(password)=>{handleNewPassword(password)}}
        />
        <DataInputBox 
          id='confirm-password'
          data={confirmedPassword}
          dataName='Confirmation'
          warning={confirmedPasswordWarning}
          isPassword={true}
          handleChange={(password)=>{handleConfirmedPassword(password)}}
        />
       <WarningBlock isHidden={warningMessage === ''}>
        {warningMessage}
       </WarningBlock>
       <div id='buttonWrapper'>
        <button 
          id='changePasswordButton'
          onClick={handleChangePassoword}>
          Change Password
        </button>
       </div>
        
      </ Wrapper>
    )
  }

}

export default PasswordSetting