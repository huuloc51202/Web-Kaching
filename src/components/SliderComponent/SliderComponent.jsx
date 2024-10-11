import { Image } from 'antd';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import SliderProComponent from '../SliderProComponent/SliderProComponent';
import prod1 from '../../assets/img/product/prod1.jpeg'
import juicypink1 from '../../assets/img/product/juicypink1.jpeg'
import text1 from '../../assets/img/product/text1.jpeg'
import heart1 from '../../assets/img/product/heart1.jpeg'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/PoductService'
import { SliderImage } from './style';


const SliderComponent = ({ arrImages }) => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    arrows: false,
    draggable: false,
  };

  const handleScroll = (event) => {
    if (sliderRef.current) {
      const delta = Math.sign(event.deltaY);
      if (delta > 0) {
        sliderRef.current.slickNext(); // Cuộn xuống
      } else {
        sliderRef.current.slickPrev(); // Cuộn lên
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  const fetchProductAll = async () =>{
    const res = await ProductService.getAllProduct()
    return res
  }


  const {isLoading, data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden'  }}>
      
      <Slider ref={sliderRef} {...settings} >
        {arrImages.map((image, index) => (
          <div key={index} >
            <SliderImage key={image} src={image} alt={`slider-${index}`} preview={false} />
          </div>
        ))}
        {/* {products?.data?.map((product) => {
          return (

            <SliderProComponent arrImages={[prod1, juicypink1, text1, heart1]} 
              key={product._id} 
              countInStock={product.countInStock} 
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              type={product.type}
            />
          )
        })}  */}
        {/* <SliderProComponent arrImages={[prod1, juicypink1, text1, heart1]} /> */}
      </Slider>
    </div>
  );
};

export default SliderComponent;