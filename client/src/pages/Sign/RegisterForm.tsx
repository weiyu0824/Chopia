import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'
import { RegisterApi } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import DataInputBox from '../../components/DataInputBox'
import WarningBlock from '../../components/WarningBlock'
import FormWrapper from './FormWrapper'
import StyledForm from './StyledForm'
import SubmitButton from './SubmitButton'


const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const InvalidMessage = [
  'Required',
  'Invalid email address',
  'Name should be less than 30 characters',
  'Username should not contain white space',
  'Password should contain at least 8 characters',
  'Username should not contain @ character'
]

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

  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const handleSignUp = async () => {
    console.log('handle sign up')
    if (email && name && username && password) {
      startAuth()
      const res = await RegisterApi(email, name, username, password)
      endAuth()

      if (res.data.success === false) {
        console.log('Fail to register')
        setWarningMessage(res.data.message)
      }else {
        console.log('Registered Sucess')
        // successAuth(username) //TODO: username should be in response
        navigate('/signin')
        setCookies('access_token', res.data.accessToken)
        setCookies('refresh_token', res.data.refreshToken)
      }
      
    }else {
      setWarningMessage('Please input a valid username and password')
      console.log(warningMessage)
    }
  }

  const validateEmail = (newEmail: string) => {
    if (newEmail === '') {
      setEmailWarning(InvalidMessage[0])
    }else if(newEmail.match(emailformat)) {
      setEmailWarning('')
    }else {
      setEmailWarning(InvalidMessage[1])
    }
  }
  
  const validateName = (newName: string) => {
    if (newName === ''){
      setNameWarning(InvalidMessage[0])
    }else if (newName.length > 30){
      setNameWarning(InvalidMessage[2])
    }else {
      setNameWarning('')
    }
  }

  const validateUsername = (newUsername: string) => {
    if (newUsername === ''){
      setUsernameWarning(InvalidMessage[0])
    }else if (/\s/.test(newUsername)) {
      setUsernameWarning(InvalidMessage[3])
    }else if(newUsername.includes('@')) {
      setUsernameWarning(InvalidMessage[5])
    }else {
      setUsernameWarning('')
    }
  }

  const validatePassword = (newPassword: string) => {
    console.log(newPassword.length)
    if (newPassword === ''){
      setPasswordWarning(InvalidMessage[0])
    }else if (newPassword.length < 8){
      setPasswordWarning(InvalidMessage[4])
    }else {
      setPasswordWarning('')
    }
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