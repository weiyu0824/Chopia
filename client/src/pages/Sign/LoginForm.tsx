import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'
import { useUserInfoStore} from '../../store/UserInfoStore'
import { login } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'
import FormWrapper from './FormWrapper'
import StyledForm from './StyledForm'
import SubmitButton from './SubmitButton'
import { Spin } from 'antd'

const LoginForm: React.FC = () => {

  // Form Data
  const [email, setEmail] = useState('') 
  const [password, setPassword ] = useState('')
  const [loading, setLoading] = useState(false)

  // Server side warning message
  const [warningMessage, setWarningMessage ] = useState('')
  const navigate = useNavigate()

  const setLogin = useAuthStore((state) => state.setLogin)
  const initUserInfo = useUserInfoStore((state) => state.initUserInfo)

  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const handleSignIn = async () => {
    if (!(email && password)) {
      setWarningMessage('Please input a valid username and password')
      return 
    }

    try {
      setLoading(true)
      const res = await login(email, password)
      setLoading(false)
    

      if (res.data.success === false) {
        setWarningMessage(res.data.message)
      } else {
        setLogin()
        initUserInfo(
          res.data.userId,
          res.data.email,
          res.data.name,
          res.data.username,
          res.data.avatar,
          res.data.friendInfos
        )

        if (res.data.verify) {
          navigate('/')
          setCookies('access_token', res.data.accessToken, {path: '/'})
          setCookies('refresh_token', res.data.refreshToken, {path: '/'})
        } else {
          navigate({
            pathname: '/goverify',
            search: `?id=${res.data.userId}&email=${email}`,
          });
        }
      }
    } catch (err) {
      navigate('/error')
    }
  }
  
  const handleEmail = (newData: string) => {
    setEmail(newData)
  }

  const handlePassword = (newData: string)  => {
    setPassword(newData)
  }


  const btnText = loading ? <Spin />: 'sign in'
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
          <span>{warningMessage} </span>
        </WarningBlock> 

        <SubmitButton 
          allowToSubmit={loading === false} 
          onClick={handleSignIn} 
          type='button'> 
          {btnText}
        </SubmitButton>
      </StyledForm>
    </FormWrapper>
    
  )
}


export default LoginForm