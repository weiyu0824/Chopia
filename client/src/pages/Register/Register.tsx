import RegisterForm from './RegisterForm'
import { Color } from '../../utils/color'
import styled from 'styled-components'
import MyNav from '../../components/MyNav'

const RegisterContainer = styled.div`
  background-color: ${Color.dblue};
  height: 100vh;
`

const Login: React.FC = () => {
  return (
    <RegisterContainer>
      <MyNav />
      <RegisterForm />
    </RegisterContainer>
  )
}
export default Login