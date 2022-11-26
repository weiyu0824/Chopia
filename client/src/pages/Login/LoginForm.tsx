import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import axios from 'axios'


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
`
const WarningBlock = styled.div`
  margin: 10px 0px;
  padding: 10px;
  color: red;
  border-radius: 5px;
  border-style: none;
  background-color: #FFE1E1;

`
const SignInHeader = styled.h2`
  text-align: left;
`


import create from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))


interface AuthState {
  loggedIn: boolean
  loading: boolean
  username: string
  increase: (username: string, password: string) => void
}

const useAuthStore = create<AuthState>()((set) => ({
  loggedIn: false,
  loading: false,
  username: '',
  increase: async (username: string, password: string) => {
    
    set((state) => ({ loading: true}))

    try {
      const res = await axios.post('http://localhost:axios8088/api/auth/login')
      // TODO: update access token

      

    } catch {

    }
    

    set((state) => ({ loggedIn: false}))
  },
}))






const LoginForm: React.FC = () => {
  const [username, setUsername] = useState()
  const [password, setPassword ] = useState()

  return (
    <FormWrapper>
      <StyledForm>
        <SignInHeader>
          Sign in</SignInHeader>
        <Link to='/singnup'> I don't have an account</Link>
        
        <Input placeholder='Username'/>
        <Input placeholder='Password'/>
        <WarningBlock> 
          <span>Warning: </span>
        </WarningBlock> 
        <SignInButton type='button'>sign in </SignInButton>
      </StyledForm>
    </FormWrapper>
    
  )
}


export default LoginForm