import { Col } from 'antd'
import React from 'react'
import { WrapperFooter } from './style'

const FooterComponent = () => {
  return (
    <div>
        <WrapperFooter >
            <Col  span={6} style={{padding:'20px',borderRight:'1px solid #fff'}}>
                
                <div class="col-inner" style={{marginBottom:'114px'}}>
                    <h2 class="footer-title" style={{color:'#fff', margin:'0px 0px 8px', fontSize:'1.5rem', fontWeight:'600'}} >ABOUT US</h2>
                    <div class="footer-content">
                        <p class="text-uppercase" ><a href="" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>ABOUT US</a></p>
                    </div>
                </div>
                
            </Col>
            <Col  span={6} style={{padding:'20px',borderRight:'1px solid #fff'}}>
                <div class="col-inner" style={{marginBottom:'114px'}}>
                    <h2 class="footer-title" style={{color:'#fff', margin:'0px 0px 8px', fontSize:'1.5rem', fontWeight:'600'}}>INFORMATION</h2>
                    <div class="footer-content">
                        <p class="text-uppercase" ><a href="" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>CLIENT SERVICE</a></p>
                    </div>
                </div>
                
            </Col>
            <Col  span={6} style={{padding:'20px',borderRight:'1px solid #fff'}}>
                <div class="col-inner"  style={{marginBottom:'23px'}}>
                    <h2 class="footer-title" style={{color:'#fff', margin:'0px 0px 8px', fontSize:'1.5rem', fontWeight:'600'}}>CONNECT</h2>
                    <div class="footer-content">
                        <p class="text-uppercase" style={{color:'#fff',fontSize:'1.5rem'}}>INSTAGRAM</p>
                        <p class="text-uppercase" ><a href="https://www.instagram.com/kaching.worldwide/" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>https://www.instagram.com/kaching.worldwide/</a></p>
                        <p class="text-uppercase" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>FACEBOOK</p>
                        <p class="text-uppercase" ><a href="https://www.facebook.com/kaching.by.chuchoa" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>https://www.facebook.com/kaching.by.chuchoa</a></p>
                    </div>
                    
                </div>
                
            </Col>
            <Col  span={6}>
                <div class="col-inner" style={{padding:'20px'}}>
                    <div class="footer-content"  >
                        <h2 class="footer-title" style={{color:'#fff', margin:'0px 0px 8px', fontSize:'1.5rem', fontWeight:'600'}}>CONTACT US</h2>
                        <p><a href="tel:0942201037" target="_blank" rel="noreferrer noopener" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>+84 942 201 037</a></p>
                        <p style={{color:'#fff',fontSize:'1.5rem'}}>MON-SUN 8:30AM - 9:30PM</p>
                        <p style={{color:'#fff',fontSize:'1.5rem'}}>EMAIL US</p>
                        <p><a href="mailto:stressmamastreetwear@gmail.com" style={{color:'#fff', margin:'0px',fontSize:'1.5rem'}}>kachingstreetwear@gmail.com</a></p>
                    </div>
                </div>

                
                
            </Col>
        </WrapperFooter>
        <div class="copyright" 
        style={{
            backGround: '#fff',
            border: '1px solid #000',
            color: '#000',
            fontWeight: '600',
            padding: '5px',
            textAlign: 'center',
            fontSize:'1.5rem'
        }}>
            Copyright @ 2023 KACHING
        </div>
    </div>
  )
}

export default FooterComponent
