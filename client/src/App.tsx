import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Button, DatePicker, Space, version } from 'antd';
import styled from 'styled-components'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import { Route, Routes, Link } from 'react-router-dom';


const Brand = styled.span`
  color: white;
`

const App = () => {
  return (
    <div className="App">
      
      <Navbar color="black">
        <Brand>brand</Brand>
        <Link to='/signin'>
          <Button>log in </Button>
        </Link>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;