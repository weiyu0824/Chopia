import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Demo from './pages/Demo/Demo'
import MyNav from './components/MyNav'
import Sign from './pages/Sign/Sign';
import { useAuthStore } from './store/AuthStore'
import { useUserInfoStore } from './store/UserInfoStore';
import { useCookies } from 'react-cookie';
import './App.css'
import { loginWithToken } from './api/auth';

const Page: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const successAuth = useAuthStore((state) => state.successAuth)
  const initUserInfo = useUserInfoStore((state) => state.initUserInfo)
  const [cookies] = useCookies(['access_token', 'refresh_token'])

  if (isLoggedIn === false) {
    const accessToken = cookies.access_token
    if (accessToken) {
      console.log(accessToken)
      loginWithToken(accessToken).then((res) => {
        if (res.data.success) {
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
      }).catch((err) => {
        console.log(err)
      })
    }
  }
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