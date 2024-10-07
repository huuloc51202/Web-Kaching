import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
import * as message from '../../components/Message/Message'

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
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
  const {data, isSuccess ,isError} = mutation
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
        message.success('Đăng nhập thành công');
        if (location?.state) {
            navigate(location?.state);
        } else {
            navigate('/');
        }
        
        // Lưu token vào localStorage
        localStorage.setItem('access_token', JSON.stringify(data?.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
        
        // Giải mã access token và lấy ID người dùng
        if (data?.access_token) {
            const decoded = jwtDecode(data?.access_token);
            if (decoded?.id) {
                handleGetDetailsUser(decoded?.id, data?.access_token); // Gọi hàm để lấy chi tiết người dùng
            }
        }
    } else if (isError && data?.status === 'ERR') {
        message.error('Đăng nhập thất bại');
    }
  }, [isSuccess, isError]);


  
  const handleGetDetailsUser = async (id, token) => {
    try {
      const storage = localStorage.getItem('refresh_token');
      const refreshToken = JSON.parse(storage);
      const res = await UserService.getDetailsUser(id, token);
      console.log('User details response:', res); // Ghi log phản hồi

      // Dispatch action updateUser với dữ liệu nhận được
      dispatch(updateUser({
          ...res?.data,
          access_token: token,
          refreshToken
      }));
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
  };




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
      <UserWrapper xs={24} sm={24} md={12} className="user-wrapper">
        <div className="user-nav">
          <p className="active" rel="nofollow" style={{fontSize:'1.6rem',textDecoration:'uppercase',margin:'0 0 15px',fontWeight:'500'}}>Đăng nhập</p>

        </div>
        <form  id="formAccount" className="validate" method="post" >
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
          <div className="user-foot d-flex" style={{fontSize:'1.5rem',cursor:'pointer',justifyContent:'center'}}>
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
