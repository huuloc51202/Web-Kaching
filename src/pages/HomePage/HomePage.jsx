import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slide1 from '../../assets/img/slides/slide1.webp'
import slide2 from '../../assets/img/slides/slide2.webp'

const HomePage = () => {
  
  return (
    <div style={{marginTop:'60px'}}>
      <SliderComponent arrImages={[slide1, slide2]}  />
      
    </div>
  )
}

export default HomePage
