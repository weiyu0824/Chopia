import React from 'react';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Demo from './pages/Demo/Demo'
import Register from './pages/Register/Register'
import { Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'
import { useAuthStore } from './store/AuthStore'
import './App.css'

const Page: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  return (
    <div>
      {isLoggedIn?<Home />:<div><MyNav /><Demo /></div>}
    </div>
  )
}
const App : React.FC = () => {
  

  return (
    <div className="App">
      
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path="/" element={<Page />} />
      </Routes>
    </div>
  );
};

export default App;