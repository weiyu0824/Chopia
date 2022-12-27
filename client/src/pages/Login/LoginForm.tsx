import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../../store/AuthStore'
import { LoginApi } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Color } from '../../utils/color'
import SubmitButton from '../../components/Sign/SubmitButton'
import DataInputBox from '../../components/Sign/DataInputBox'
import FormWrapper from '../../components/Sign/FormWrapper'
import StyledForm from '../../components/Sign/StyledForm'
import WarningBlock from '../../components/Sign/WarningBlock'

const Input = styled.input`
  margin: 10px 0px;
  padding: 5px;
  border-width: 1px;
  border-radius: 5px;
`

const LoginForm: React.FC = () => {
  // Form Data
  const [email, setEmail] = useState('') 
  const [password, setPassword ] = useState('')

  // Server side warning message
  const [warningMessage, setWarningMessage ] = useState('')
  const navigate = useNavigate()
  const loading = useAuthStore((state) => state.loading)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const startAuth = useAuthStore((state) => state.startAuth)
  const endAuth = useAuthStore((state) => state.endAuth)
  const successAuth = useAuthStore((state => state.successAuth))

  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const handleSignIn = async () => {
    if (email && password) {
      startAuth()
      const res = await LoginApi(email, password)
      endAuth()

      if (res.data.success === false) {
        console.log('fail to login')
        setWarningMessage(res.data.message)
      }else {
        console.log('sucess to login')
        successAuth(email) //TODO: username should be in response
        navigate('/')
        setCookies('access_token', res.data.accessToken)
        setCookies('refresh_token', res.data.refreshToken)
      }
      
    }else {
      setWarningMessage('Please input a valid username and password')
      console.log(warningMessage)
    }
  }
  
  const handleEmail = (newData: string) => {
    setEmail(newData)
  }

  const handlePassword = (newData: string)  => {
    setPassword(newData)
  }


  const loadingWarn = loading ? 'loading' : ''
  return (
    <FormWrapper>
      <StyledForm>
        <h2 className='signinHeader'> Sign In</h2>
        <Link className='signinLink' to='/signin'> I don't have an account</Link> 

        <DataInputBox 
          data={email} 
          dataName='Email'
          showWarning={false}
          warning={''}
          isPassword={false}
          handleFocus={() => {}}
          handleChange={(newData: string) => handleEmail(newData)}
        />

        <DataInputBox 
          data={password} 
          dataName='Password'
          showWarning={false}
          warning={''}
          isPassword={true}
          handleFocus={() => {}}
          handleChange={(newData: string) => handlePassword(newData)}
        />
        <WarningBlock isHidden={warningMessage === ''}> 
          <span>{loadingWarn}</span>
          <span>{warningMessage} </span>
        </WarningBlock> 

        <SubmitButton 
          allowToSubmit={true} 
          onClick={handleSignIn} 
          type='button'> sign in 
        </SubmitButton>
      </StyledForm>
    </FormWrapper>
    
  )
}


export default LoginForm