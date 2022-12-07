import React from 'react'
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'

const Brand = styled.span`
  color: white;
`
const Name = styled.span`
  color: white;
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
    <Navbar color="white">
      <Brand>brand</Brand>
      {isLoggedIn ? 
       <div>
        <Name> {username} </Name>
        <Button style={{ color: "red"}} type="link" onClick={handleSignOut}> Sign Out </Button>
        </div> : 
       <Link to='/signin'><Button style={{ color: "red"}} type="link"> Sign In </Button></Link>}

    </Navbar>
  )
}

export default MyNav
