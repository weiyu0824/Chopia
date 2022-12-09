import LoginForm from './LoginForm'
import MyNav from '../../components/MyNav'
import styled from 'styled-components'
import {color} from '../../utils/color'
const C = new color()
const LoginContainer = styled.div`
  background-color: ${C.dblue};
  height: 100vh;
`
const Login: React.FC = () => {
  return (
    <LoginContainer>
      <MyNav />
      <LoginForm />
    </LoginContainer>
  )
}
export default Login