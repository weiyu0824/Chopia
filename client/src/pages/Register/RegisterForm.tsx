import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../../store/AuthStore'
import { LoginApi, RegisterApi } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

interface Props{
  isHidden: boolean
}

const FormWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  
  width: 400px;
  border-style: solid;
  border-color: lightgray;
  padding: 20px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
`
const Input = styled.input`
  margin: 10px 0px;
  padding: 5px;
`
const SignInButton = styled.button`
  margin: 10px 0px;
  padding: 10px;
  color: white;
  border-radius: 5px;
  border-style: none;
  background-color: #B8F1B0;

  /* TODO: Why hover not working */
  &:hover {
    opacity: 0.5;
    background-color: black;
  }
`
const WarningBlock = styled.div<Props>`
  margin: 10px 0px;
  padding: 10px;
  color: red;
  border-radius: 5px;
  border-style: none;
  background-color: #FFE1E1;
  display: ${props => props.isHidden? 'none': 'block'};
`
const SignInHeader = styled.h2`
  text-align: left;
`

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword ] = useState('')
  const [warningMessage, setWarningMessage ] = useState('')
  const navigate = useNavigate()
  const loading = useAuthStore((state) => state.loading)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const startAuth = useAuthStore((state) => state.startAuth)
  const endAuth = useAuthStore((state) => state.endAuth)
  const successAuth = useAuthStore((state => state.successAuth))

  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const handleSignUp = async () => {
    if (username && password) {
      startAuth()
      const res = await RegisterApi(username, password)
      endAuth()

      if (res.data.success === false) {
        console.log('Fail to register')
        setWarningMessage(res.data.message)
      }else {
        console.log('Registered Sucess')
        successAuth(username) //TODO: username should be in response
        navigate('/signin')
        setCookies('access_token', res.data.accessToken)
        setCookies('refresh_token', res.data.refreshToken)
      }
      
    }else {
      setWarningMessage('Please input a valid username and password')
      console.log(warningMessage)
    }
  }

  const handleUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target
    const value = target.value
    setUsername(value)
  }

  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target
    const value = target.value
    setPassword(value)
  }


  const loadingWarn = loading ? 'loading' : ''
  return (
    <FormWrapper>
      <StyledForm>
        <SignInHeader>
          Sign up
        </SignInHeader>
        <Input value={username} onChange={handleUsername} placeholder='Username'/>
        <Input value={password} onChange={handlePassword} placeholder='Password'/>
        <WarningBlock isHidden={warningMessage === ''}> 
          <span>{loadingWarn}</span>
          <span>{warningMessage} </span>
        </WarningBlock> 
        <SignInButton onClick={handleSignUp} type='button'>Register </SignInButton>
      </StyledForm>
    </FormWrapper>
    
  )
}


export default RegisterForm