import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../../store/AuthStore'
import { useUserInfoStore} from '../../store/UserInfoStore'
import { LoginApi } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'
import FormWrapper from './FormWrapper'
import StyledForm from './StyledForm'
import SubmitButton from './SubmitButton'

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

  const startAuth = useAuthStore((state) => state.startAuth)
  const endAuth = useAuthStore((state) => state.endAuth)
  const successAuth = useAuthStore((state => state.successAuth))
  const initUserInfo = useUserInfoStore((state) => state.initUserInfo)

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
        console.log(res.data)
        successAuth() 
        initUserInfo(
          res.data.userId,
          res.data.email,
          res.data.name,
          res.data.username,
          res.data.avatar,
          res.data.friendInfos
        )
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
        <Link className='signinLink' to='/signup'> I don't have an account</Link> 

        <DataInputBox 
          id='loginFormEmail'
          data={email} 
          dataName='Email'
          handleChange={(newData: string) => handleEmail(newData)}
        />

        <DataInputBox 
          id='loginFormPassword'
          data={password} 
          dataName='Password'
          isPassword={true}
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