import React from 'react'
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components'
import { Color } from '../utils/color'
import Avatar from './Avatar'


const Brand = styled.span`
  color: ${Color.blue};
`

const MyNav: React.FC = () => {
  return (
    <Navbar color='light'>
      <Avatar 
        avatarName='logo'
        size={2}
      />
      {/* <Brand>brand</Brand> */}
      <Link to='/signin'><Button style={{ color: Color.blue}} type="link"> Sign In </Button></Link>
    </Navbar>
  )
}

export default MyNav
