import LoginForm from './LoginForm'
import MyNav from '../../components/MyNav'
import styled from 'styled-components'
import { Color } from '../../utils/color'

const LoginContainer = styled.div`
  background-color: ${Color.dblue};
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