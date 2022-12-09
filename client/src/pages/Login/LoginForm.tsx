import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../../store/AuthStore'
import { LoginApi } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import {color} from '../../utils/color'
const C = new color()
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
  padding: 40px 25px;
  box-shadow: 0px 2px 6px -2px rgba(0,0,0,0.3);   
  background-color: ${C.white};
  border-radius: 10px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${C.white};
`
const Input = styled.input`
  margin: 10px 0px;
  padding: 5px;
  border-width: 1px;
  border-radius: 5px;
`
const SignInButton = styled.button`
  margin: 10px 0px;
  padding: 10px;
  color: white;
  border-radius: 5px;
  border-style: none;
  background-color: ${C.dblue};
  &:hover {
    opacity: 0.8;
    background-color: ${C.dblue};
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
  color: ${C.dblue};
`

const LoginForm: React.FC = () => {
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

  const handleSignIn = async () => {
    if (username && password) {
      startAuth()
      const res = await LoginApi(username, password)
      endAuth()

      if (res.data.success === false) {
        console.log('fail to login')
        setWarningMessage(res.data.message)
      }else {
        console.log('sucess to login')
        successAuth(username) //TODO: username should be in response
        navigate('/')
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
          Sign in
        </SignInHeader>
        <Link to='/signup' style={{color: C.dblue}}> I don't have an account</Link> 
        <Input value={username} onChange={handleUsername} placeholder='Username'/>
        <Input type="password" value={password} onChange={handlePassword} placeholder='Password'/>
        <WarningBlock isHidden={warningMessage === ''}> 
          <span>{loadingWarn}</span>
          <span>{warningMessage} </span>
        </WarningBlock> 
        <SignInButton onClick={handleSignIn} type='button'>sign in </SignInButton>
      </StyledForm>
    </FormWrapper>
    
  )
}


export default LoginForm