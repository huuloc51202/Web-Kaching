import React from 'react'
import Slider from 'react-slick';
import { ItemSoldOut, PrdPriceBox, ProContent, WrapperCard } from './style'
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import { Col } from 'antd';

// Tạo các thành phần mũi tên tùy chỉnh
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <RightOutlined style={{ color: 'black', fontSize: '20px', opacity:'.75' }} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <LeftOutlined style={{ color: 'black', fontSize: '20px', opacity:'.75' }} />
    </div>
  );
};


const CardComponent = (props) => {
  const { key, countInStock, description, image, name, price, types,id,discount,selled} = props
  // Chuyển đổi `image` thành mảng nếu nó không phải là mảng
  const imageArray = Array.isArray(image) ? image : [image];

  // Nếu chỉ có một ảnh, nhân đôi ảnh để đảm bảo có ít nhất 2 ảnh
  const extendedImages = imageArray.length === 1 ? [imageArray[0], imageArray[0]] : imageArray;
  
  // Giới hạn chỉ lấy 2 ảnh
  const limitedImages = extendedImages.slice(0, 2);
  
  const settings = {
      
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,  
    dots: false, // Tắt điểm chỉ số
    arrows: true, // Bật nút điều hướng
    nextArrow: <NextArrow />, // Sử dụng mũi tên tiếp theo tùy chỉnh
    prevArrow: <PrevArrow />, // Sử dụng mũi tên trước đó tùy chỉnh
  };

  const navigate = useNavigate()
  const handleDetailProduct = (id) => {
    navigate(`/product-details/${id}`)
  }

  return (
    <Col xs={12} sm={12} md={8} lg={6} >
      <WrapperCard
        
        style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
       
      >
        
        <Slider  {...settings} > 
          
          {limitedImages.map((image, index) => (
            <div key={index} onClick={() => handleDetailProduct(id)}>
              <img  src={image} alt={`slider-${index}`}  style={{cursor:'pointer'}}/>
            </div>
          ))}
          
        </Slider>
        
        <ProContent>
          
          <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '43px',
              textTransform: 'uppercase',
              WebkitBoxOrient: 'vertical',

            }}
            onClick={() => handleDetailProduct(id)}
          >{name}</a>
          <PrdPriceBox className="prd-price-box"  >
            <span className="prd-price">{convertPrice(price)}đ</span>
            {discount > 0 && (
              <div style={{backgroundColor:'red',borderRadius:'70% 30% 30% 70% / 60% 40% 60% 40%'}}>
                <span className="discount" style={{color:'#fff'}}>-{discount}%</span>

              </div>

            )}
          </PrdPriceBox>
        </ProContent>
        {countInStock === 0 && (
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px',
              width: '100%',
              padding: '10px 20px',
            }}>
              Hết hàng
            </span>
          </ItemSoldOut>
        )}

      </WrapperCard>

    </Col>
        
  )
}

export default CardComponent
