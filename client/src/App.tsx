import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Demo from './pages/Demo/Demo'
import MyNav from './components/MyNav'
import Sign from './pages/Sign/Sign';
import { useAuthStore } from './store/AuthStore'
import './App.css'

const Page: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  return (
    <div>
      {isLoggedIn?<Home />:<div><MyNav /><Demo /></div>}
      {/* <Home /> */}
    </div>
  )
}
const App : React.FC = () => {
  
  return (
    <div className="App"> 
      <Routes>
        {/* <Route path='/edit' element={<EditPanal />} /> */}
        <Route path='/signin' element={<Sign for='login' />}/>
        <Route path='/signup' element={<Sign for='register' />}/>
        <Route path="/" element={<Page />} />
      </Routes>
    </div>
  );
};

export default App;