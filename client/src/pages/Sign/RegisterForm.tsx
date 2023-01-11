import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'
import { register } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'
import FormWrapper from './FormWrapper'
import StyledForm from './StyledForm'
import SubmitButton from './SubmitButton'
import { validate } from '../../utils/validate'

const RegisterForm: React.FC = () => {
  // Form Data
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Form Data Validation
  const prevFocus = useRef('')
  const [showEmailWarning, setShowEmailWarning] = useState(false)
  const [showNameWarning, setShowNameWarning] = useState(false)
  const [showUsernameWarning, setShowUsernameWarning] = useState(false)
  const [showPasswordWarning, setShowPasswordWarning] = useState(false)

  const [emailWarning, setEmailWarning] = useState('')
  const [nameWarning, setNameWarning] = useState('')
  const [usernameWarning, setUsernameWarning] = useState('')
  const [passwordWarning, setPasswordWarning] = useState('')

  // Server Side Warning Message
  const [warningMessage, setWarningMessage ] = useState('')

  // Other
  const navigate = useNavigate()
  const loading = useAuthStore((state) => state.loading)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const startAuth = useAuthStore((state) => state.startAuth)
  const endAuth = useAuthStore((state) => state.endAuth)
  const successAuth = useAuthStore((state => state.successAuth))

  // const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const handleSignUp = async () => {
    if (email && name && username && password) {
      startAuth()
      const res = await register(email, name, username, password)
      endAuth()

      if (res.data.success === false) {
        console.log('Fail to register')
        setWarningMessage(res.data.message)
      }else {
        console.log('Registered Sucess')
        console.log(res.data)
        navigate({
          pathname: '/goverify',
          search: `?id=${res.data.userId}&email=${email}`,
        });
        // setCookies('access_token', res.data.accessToken)
        // setCookies('refresh_token', res.data.refreshToken)
      }
      
    }else {
      setWarningMessage('Please input a valid username and password')
      console.log(warningMessage)
    }
  }

  const validateEmail = (newEmail: string) => {
    const warning = validate(newEmail, {type: 'email'})
    setEmailWarning(warning)
  }
  
  const validateName = (newName: string) => {
    const warning = validate(newName, {allowWhiteSpace: true, type: 'name'})
    setNameWarning(warning)
  }

  const validateUsername = (newUsername: string) => {
    const warning = validate(newUsername, {type: 'username'})
    setUsernameWarning(warning)
  }

  const validatePassword = (newPassword: string) => {
    const warning = validate(newPassword, {type: 'password'})
    setPasswordWarning(warning)
  }

  const handleEmail = (newData: string) => {
    setEmail(newData)
    validateEmail(newData)
  }

  const handleName = (newData: string) => {
    setName(newData)
    validateName(newData)
  }

  const handleUsername = (newData: string) => {
    setUsername(newData)
    validateUsername(newData)
  }

  const handlePassword = (newData: string) => {
    setPassword(newData)
    validatePassword(newData)
  }

  const updateCheck = (currFocus: string) => {
    // start check?
    if (currFocus !== prevFocus.current) {
      if (prevFocus.current === 'email') {
        setShowEmailWarning(true)
      } else if (prevFocus.current === 'name') {
        setShowNameWarning(true)
      } else if (prevFocus.current === 'username') {
        setShowUsernameWarning(true)
      } else if (prevFocus.current === 'password') {
        setShowPasswordWarning(true)
      }

      validateEmail(email)
      validateName(name)
      validateUsername(username)
      validatePassword(password)

      prevFocus.current = currFocus
    }
    
  }
  const loadingWarn = loading ? 'loading' : ''
  const allowToSubmit = (email.length > 0 && name.length > 0 && username.length > 0 && password.length > 0
                         && emailWarning === '' && nameWarning === '' && usernameWarning === '' && passwordWarning === '')
                         ? true : false
  return (
    <FormWrapper>
      <StyledForm>
        <h2 className='signinHeader'> Sign up </h2>
        <Link className='signinLink' to='/signin'> Already have an account</Link> 

        <DataInputBox 
          id='registerFormEmail'
          data={email} 
          dataName='Email'
          warning={(showEmailWarning)? emailWarning: ''}
          handleFocus={() => updateCheck('email')}
          handleChange={(newData: string) => handleEmail(newData)}
        />

        <DataInputBox 
          id='registerFormName'
          data={name} 
          dataName='Full Name'
          warning={(showNameWarning)? nameWarning: ''}
          handleFocus={() => updateCheck('name')}
          handleChange={(newData: string) => handleName(newData)}
        />

        <DataInputBox 
          id='registerFormUsername'
          data={username} 
          dataName='Username'
          warning={(showUsernameWarning)? usernameWarning: ''}
          handleFocus={() => updateCheck('username')}
          handleChange={(newData: string) => handleUsername(newData)}
        />

        <DataInputBox 
          id='registerFormPassword'
          data={password} 
          dataName='Password'
          warning={(showPasswordWarning)? passwordWarning: ''}
          isPassword={true}
          handleFocus={() => updateCheck('password')}
          handleChange={(newData: string) => handlePassword(newData)}
        />

        <WarningBlock isHidden={warningMessage === ''}> 
          <span>{loadingWarn}</span>
          <span>{warningMessage} </span>
        </WarningBlock> 
        
        <SubmitButton 
          allowToSubmit={allowToSubmit} 
          onClick={handleSignUp} 
          type='button'> sign up 
        </SubmitButton>
      </StyledForm>
    </FormWrapper>
  )
}


export default RegisterForm