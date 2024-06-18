import React from 'react'
import { Btn, ClearFixA, FormLogin, SignIn, UserWrapper } from './style'

const SignInPage = () => {
  return (
    
    <SignIn className="main-site main-childs signin container">
      <UserWrapper className="user-wrapper">
        <div className="user-nav anonymous-awe">
          <p className="active" rel="nofollow" style={{fontSize:'1.6rem',textDecoration:'uppercase',margin:'0 0 15px',fontWeight:'500'}}>Đăng nhập</p>

        </div>
        <form  id="formAccount" className="validate" method="post" style={{}}>
          <input type="hidden" value="28b51f46f597600fa521bfabd6c77ac4-87478a61de5736401076bb688a0a21b9" name="csrf" id="csrf"/>
          <div className="form-group" style={{marginBottom:'1.3rem'}}>
            {/* <div className="usernameformError parentFormformAccount formError" style={{opacity: '0.87', position: 'absolute', top: '58.5px', left: '973.5px', marginTop: '-43px'}}>
              <div className="formErrorContent">* Trường này bắt buộc</div>
              <div className="formErrorArrow"></div>
            </div> */}
            
            <FormLogin type="text" name="username" id="username" className="form-login" placeholder="Nhập email" />
          </div>
          <div className="form-group"  style={{marginBottom:'1.3rem'}}>
            
            <FormLogin type="password" name="password" id="password" className="form-login" placeholder="Mật khẩu"/>
          </div>

          <div className="text-center">
              <Btn type="button" id="btnsignin" className="btn btn-organ ">Đăng nhập</Btn>
          </div>
          <div className="user-foot d-flex" style={{fontSize:'1.5rem'}}>
            <ClearFixA href="/user/signup" className="clearfix" rel="nofollow">Đăng ký </ClearFixA>
            <span>•</span>
            <ClearFixA className="clearfix" href="/user/getpassword" rel="nofollow">Quên mật khẩu</ClearFixA>
              
          </div>
        </form>
      </UserWrapper>
    </SignIn>
  )
}

export default SignInPage
