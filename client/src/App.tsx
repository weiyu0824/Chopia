import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Demo from './pages/Demo/Demo'
import MyNav from './components/MyNav'
import Sign from './pages/Sign/Sign';
import { useAuthStore } from './store/AuthStore'
import { useChatStore } from './store/ChatStore'
import { useUserInfoStore } from './store/UserInfoStore';
import { useCookies } from 'react-cookie';
import { loginWithToken } from './api/auth';
import './App.css'




function PageNotFound() {
  return (
    <div>
      <h1>404 Page not found</h1>
    </div>
  );
}


const App : React.FC = () => {
  
  const successAuth = useAuthStore((state) => state.successAuth)
  const initUserInfo = useUserInfoStore((state) => state.initUserInfo)
  const [cookies] = useCookies(['access_token', 'refresh_token'])  

  const autoLogin = async (accessToken: string) => {
    const res = await loginWithToken(accessToken)
    if (res.data.success) {
      console.log('App')
      console.log(res.data.friendInfos)
      successAuth()
      initUserInfo(
        res.data.userId,
        res.data.email,
        res.data.name,
        res.data.username,
        res.data.avatar,
        res.data.friendInfos
      )
    }
  }

  useEffect(() => {
    console.log('App use effect')
    const accessToken = cookies.access_token
    if (accessToken) {
      autoLogin(accessToken)
    }
  })



  return (
    <div className="App"> 
      <Routes>
        <Route path='/signin' element={<Sign for='login' />}/>
        <Route path='/signup' element={<Sign for='register' />}/>
        <Route path="/" element={<Home page='default'/>} />
        <Route path="/inbox/:friendId" element={<Home page='inbox'/>}  />
        <Route path="/notification" element={<Home page='notification'/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
