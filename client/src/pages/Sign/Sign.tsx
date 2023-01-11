import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import MyNav from '../../components/MyNav'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const Wrapper = styled.div`
  background-color: ${Color.dblue};
  height: 100vh;
`

interface ISign {
  for: 'login' | 'register'
}
const Sign: React.FC<ISign> = (props) => {
  const form = (props.for === 'login') ? <LoginForm /> : <RegisterForm />
  return (
    <Wrapper>
      <MyNav />
      {form}
    </Wrapper>
  )
}
export default Sign