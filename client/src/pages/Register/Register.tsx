import RegisterForm from './RegisterForm'
import {color} from '../../utils/color'
import styled from 'styled-components'
import MyNav from '../../components/MyNav'
const C = new color()
const RegisterContainer = styled.div`
  background-color: ${C.dblue};
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