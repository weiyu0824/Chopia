import React from 'react'
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import {color} from '../utils/color'
const C = new color()

const Brand = styled.span`
  color: ${C.blue};
`
const Name = styled.span`
  color: ${C.blue};
`
interface isLoggedInButton {
  isLoggedInButton: boolean
}

const SignInButton = styled.div<isLoggedInButton>` 
  display: ${props => (props.isLoggedInButton) ? "none" : "inline"};
`

const MyNav: React.FC = () => {
  const username = useAuthStore((state) => state.username)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const leaveAuth = useAuthStore((state => state.leaveAuth))
  const navigate = useNavigate()
  const handleSignOut = async () => {
    leaveAuth() //TODO: username should be in response
    navigate('/signin')
  }
  return (
    <Navbar color='light'>
      <Brand>brand</Brand>
      {/* {isLoggedIn ? 
       <div>
        <Name> {username} </Name>
        <Button style={{ color: C.blue}} type="link" onClick={handleSignOut}> Sign Out </Button>
        </div> :  */}
      <Link to='/signin'><Button style={{ color: C.blue}} type="link"> Sign In </Button></Link>
      
    </Navbar>
  )
}

export default MyNav
