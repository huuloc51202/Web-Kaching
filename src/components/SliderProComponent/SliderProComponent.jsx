import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';


const SliderProComponent = ({arrImages}) => {
  // const {image, name} = props
  
  const settings = {
    
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    arrows: false,
  };
  return (
    <div  style={{ width: '100%', overflow: 'hidden' }}>
      
      <Slider  {...settings}>
        {arrImages.map((image, index) => (
          <div key={index}>
            <Image key={image} src={image} alt={`slider-${index}`} preview={false} width="100%" />
          </div>
        ))}

        {/* <div>
          <Image key={image} src={image} alt={name} preview={false} width="100%" />
        </div> */}
      </Slider>
    </div>
  )
}

export default SliderProComponent
