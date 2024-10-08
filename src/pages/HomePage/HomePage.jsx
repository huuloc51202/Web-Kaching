import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slide1 from '../../assets/img/slides/slide1.webp'
import slide2 from '../../assets/img/slides/slide2.webp'
import slide3 from '../../assets/img/slides/slide3.jpeg'

const HomePage = () => {
  
  return (
    <div style={{marginTop:'60px'}}>
      <SliderComponent arrImages={[slide1, slide2 ,slide3]}  />
      
    </div>
  )
}

export default HomePage
