import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Btn, ClearFixA, FormLogin, SignIn, UserWrapper } from './style'
import {
  EyeFilled,
  EyeInvisibleFilled
} from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from "jwt-decode"
import { useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  }

  const navigate = useNavigate()
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  
  const dispatch = useDispatch()
  const {data, isSuccess} = mutation
  useEffect(() =>{
    if(isSuccess){
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        console.log('decode', decoded)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  
  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignin = () => {
    mutation.mutate({
      email,
      password
    })
  }

  return (
    
    <SignIn className="signin">
      <UserWrapper className="user-wrapper">
        <div className="user-nav">
          <p className="active" rel="nofollow" style={{fontSize:'1.6rem',textDecoration:'uppercase',margin:'0 0 15px',fontWeight:'500'}}>Đăng nhập</p>

        </div>
        <form  id="formAccount" className="validate" method="post" style={{}}>
          <input type="hidden" value="" name="csrf" id="csrf"/>
          <div className="form-group" style={{marginBottom:'1.3rem'}}>
            {/* <div className="usernameformError parentFormformAccount formError" style={{opacity: '0.87', position: 'absolute', top: '58.5px', left: '973.5px', marginTop: '-43px'}}>
              <div className="formErrorContent">* Trường này bắt buộc</div>
              <div className="formErrorArrow"></div>
            </div> */}
            
            <FormLogin type="text" name="email" id="email" className="form-login" placeholder="Nhập email" value={email} onChange={handleEmailChange}/>
          </div>
          <div className="form-group"  style={{marginBottom:'1.3rem',position:'relative'}}>
            <span style={{position:'absolute',top:'12px',right:'10px' ,fontSize:'1.5rem',cursor:'pointer'}}  onClick={togglePasswordVisibility}>
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            
            <FormLogin 
              type={isShowPassword ? 'text' : 'password'} 
              name="password" id="password" 
              className="form-login" placeholder="Mật khẩu"
              value={password} 
              onChange={handlePasswordChange}
            />
          </div>
          

          
          {data?.status === 'ERR' && <span style={{color: 'red',fontSize:'1.5rem'}}>{data?.message}</span>}
          <Loading isPending={mutation.isPending}>

            <div className="text-center">
              
              <Btn 
                type="button" id="btnsignin" 
                className="btn btn-organ "
                onClick={handleSignin}
                disabled={!email.length || !password.length}
              >Đăng nhập</Btn>
            </div>
          </Loading>
          <div className="user-foot d-flex" style={{fontSize:'1.5rem',cursor:'pointer'}}>
            <ClearFixA  className="clearfix" rel="nofollow" onClick={handleNavigateSignUp}>Đăng ký </ClearFixA>
            <span>•</span>
            <ClearFixA className="clearfix"  rel="nofollow">Quên mật khẩu</ClearFixA>
              
          </div>

          
        </form>
      </UserWrapper>
    </SignIn>
  )
}

export default SignInPage
