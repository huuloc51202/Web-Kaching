import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Btn, ClearFixA, FormSignUp, SignUp, UserWrapper } from './style'
import {
  EyeFilled,
  EyeInvisibleFilled
} from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'


const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  }
  const [isShowConfPassword, setIsShowConfPassword] = useState(false)
  const handleConfPasswordVisibility = () => {
    setIsShowConfPassword(!isShowConfPassword);
  }


  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success();
      handleNavigateLogin();
    } else if (data?.status === 'ERR') {
      message.error();
    }
  }, [isSuccess, isError]);
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfpassword, setConfPassword] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value)
  }

  const handleSignup = () => {
    mutation.mutate({ name, phone, email, password, cfpassword})
  }

  return (
    <SignUp className="signup">
      <UserWrapper  xs={24} sm={24} md={12} className="user-wrapper">
        <div className="user-nav anonymous-awe">
          <p className="active" rel="nofollow" style={{fontSize:'1.6rem',textDecoration:'uppercase',margin:'0 0 15px',fontWeight:'500'}}>Đăng ký</p>

        </div>
        <form  id="formAccount" className="validate" method="post" style={{}}>
          <input type="hidden" value="" name="csrf" id="csrf"/>
          <div className="form-group" style={{marginBottom:'1.3rem'}}>
            {/* <div className="usernameformError parentFormformAccount formError" style={{opacity: '0.87', position: 'absolute', top: '58.5px', left: '973.5px', marginTop: '-43px'}}>
              <div className="formErrorContent">* Trường này bắt buộc</div>
              <div className="formErrorArrow"></div>
            </div> */}
            
            <FormSignUp type="text" name="name" id="name" className="form-signup" placeholder="Họ và tên"  value={name} onChange={handleNameChange}/>
          </div>
          <div className="form-group"  style={{marginBottom:'1.3rem'}}>
            
            <FormSignUp type="text" name="phone" id="phone" className="form-signup" placeholder="Điện thoại" value={phone} onChange={handlePhoneChange}/>
          </div>
          <div className="form-group"  style={{marginBottom:'1.3rem'}}>
            
            <FormSignUp type="email" name="email" id="email" className="form-signup" placeholder="Email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group"  style={{marginBottom:'1.3rem',position:'relative'}}>
            <span style={{position:'absolute',top:'12px',right:'10px' ,fontSize:'1.5rem',cursor:'pointer'}} onClick={handlePasswordVisibility}>
              {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <FormSignUp 
              type={isShowPassword ? 'text' : 'password'} 
              name="password" 
              id="password" 
              className="form-signup" 
              placeholder="Mật khẩu của bạn" 
              value={password} 
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group"  style={{marginBottom:'1.3rem',position:'relative'}}>
            <span style={{position:'absolute',top:'12px',right:'10px' ,fontSize:'1.5rem',cursor:'pointer'}}  onClick={handleConfPasswordVisibility}>
              {isShowConfPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            
            <FormSignUp
              type={isShowConfPassword ? 'text' : 'password'} 
              name="cfpassword" id="cfpassword" 
              className="form-login" placeholder="Xác nhận mật khẩu"
              value={cfpassword} 
              onChange={handleConfPasswordChange}
            />

          </div>
          
          {data?.status === 'ERR' && <span style={{color: 'red',fontSize:'1.5rem'}}>{data?.message}</span>}
          <Loading isPending={mutation.isPending}>

            <div className="text-center">
              <Btn 
                type="button" id="btnsignup" 
                className="btn btn-organ " 
                onClick={handleSignup}
                disabled={!name.length || !phone.length || !email.length || !password.length || !cfpassword.length}
              >Đăng ký</Btn>
            </div>
          </Loading>
          <div className="user-foot d-flex" style={{fontSize:'1.5rem',cursor:'pointer',justifyContent:'center'}}>
            <ClearFixA  className="clearfix" rel="nofollow" onClick={handleNavigateLogin}>Đăng nhập </ClearFixA>
              
          </div>
        </form>
      </UserWrapper>
    </SignUp>
  )
}

export default SignUpPage
