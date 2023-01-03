import React from 'react'
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { Color } from '../utils/color'


const Brand = styled.span`
  color: ${Color.blue};
`
const Name = styled.span`
  color: ${Color.blue};
`
interface isLoggedInButton {
  isLoggedInButton: boolean
}

const SignInButton = styled.div<isLoggedInButton>` 
  display: ${props => (props.isLoggedInButton) ? "none" : "inline"};
`

const MyNav: React.FC = () => {
  return (
    <Navbar color='light'>
      <Brand>brand</Brand>
      <Link to='/signin'><Button style={{ color: Color.blue}} type="link"> Sign In </Button></Link>
    </Navbar>
  )
}

export default MyNav
