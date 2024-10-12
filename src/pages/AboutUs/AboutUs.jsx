import React from 'react'
import { Section } from './style'

const AboutUs = () => {
    return (
        <div>
            <div class="body-news" style={{marginTop:'60px'}}>
                <Section class="news-page "style={{}}>
                    <div class="product-list news-detail">
                        <div class="news-ctn" style={{paddingTop:'20px'}}>
                            <p class="news-item__title" style={{fontSize:'20px',fontWeight:'700',margin:'0 0 10px'}}>ABOUT US</p>
                            <div class="news-text">
                                <p style={{margin:'0'}}>
                                    <img src="https://img.upanh.tv/2023/09/09/ABOUT-US.jpg" alt="ABOUT-US.jpg" border="0" style={{maxWidth:'100%'}}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    )
}

export default AboutUs
