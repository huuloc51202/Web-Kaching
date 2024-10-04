import React, { Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DeafaultComponent';
import {routes} from './routes';
import { isJsonString} from './utils'
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService'
import { useDispatch, useSelector} from 'react-redux';
import { resetUser, updateUser } from './redux/slides/userSlide';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

    useEffect(() => {
      
      const {storageData, decoded} = handleDecoded()
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id, storageData )
      }
        
    },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
      
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken =localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwtDecode(refreshToken)
    if(decoded?.exp < currentTime.getTime() / 1000){
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000){

        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) =>{
    return Promise.reject(err);
  });

  const handleGetDetailsUser = async (id, token) =>{
    let storageRefreshToken =localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token,refreshToken}))
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const ischeckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App