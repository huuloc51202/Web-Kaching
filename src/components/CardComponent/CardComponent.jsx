import React from 'react'
import Slider from 'react-slick';
import { ItemSoldOut, ProContent, WrapperCard } from './style'
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

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

const CardComponent = ({arrImages}) => {
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
  return (
    <Row>

      <Col span={6}>
        <WrapperCard
          style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
        
        >
          
          <Slider  {...settings}>
            
            {arrImages.map((image, index) => (
              <div key={index} >
                <img key={image} src={image} alt={`slider-${index}`} preview={false} />
              </div>
            ))}
            
          </Slider>
          
          <ProContent>
            
            <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '55px',
              textTransform: 'uppercase',
              
              }}
            >SSMA THE EMBROIDERY SHORTS - YELLOW</a>
            <div className="prd-price-box">

              <span className="prd-price">550,000đ</span>
            </div>
          </ProContent>
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px !important',
              width: '100%',
              padding: '10px 20px',
              display:'none'
              
            }}>SOLD OUT</span>
          </ItemSoldOut>
        </WrapperCard>

      </Col>

      <Col span={6}>
        <WrapperCard
          style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
        
        >
          
          <Slider  {...settings}>
            
            {arrImages.map((image, index) => (
              <div key={index} >
                <img key={image} src={image} alt={`slider-${index}`} preview={false} />
              </div>
            ))}
            
          </Slider>
          
          <ProContent>
            
            <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '55px',
              textTransform: 'uppercase',
              
              }}
            >SSMA THE EMBROIDERY SHORTS - YELLOW</a>
            <div className="prd-price-box">

              <span className="prd-price">550,000đ</span>
            </div>
          </ProContent>
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px !important',
              width: '100%',
              padding: '10px 20px',
              display:'none'
              
            }}>SOLD OUT</span>
          </ItemSoldOut>
        </WrapperCard>

      </Col>

      <Col span={6}>
        <WrapperCard
          style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
        
        >
          
          <Slider  {...settings}>
            
            {arrImages.map((image, index) => (
              <div key={index} >
                <img key={image} src={image} alt={`slider-${index}`} preview={false} />
              </div>
            ))}
            
          </Slider>
          
          <ProContent>
            
            <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '55px',
              textTransform: 'uppercase',
              
              }}
            >SSMA THE EMBROIDERY SHORTS - YELLOW</a>
            <div className="prd-price-box">

              <span className="prd-price">550,000đ</span>
            </div>
          </ProContent>
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px !important',
              width: '100%',
              padding: '10px 20px',
              display:'none'
              
            }}>SOLD OUT</span>
          </ItemSoldOut>
        </WrapperCard>

      </Col>

      <Col span={6}>
        <WrapperCard
          style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
        
        >
          
          <Slider  {...settings}>
            
            {arrImages.map((image, index) => (
              <div key={index} >
                <img key={image}  src={image} alt={`slider-${index}`} preview={false} />
              </div>
            ))}
            
          </Slider>
          
          <ProContent>
            
            <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '55px',
              textTransform: 'uppercase',
              
              }}
            >SSMA THE EMBROIDERY SHORTS - YELLOW</a>
            <div className="prd-price-box">

              <span className="prd-price">550,000đ</span>
            </div>
          </ProContent>
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px !important',
              width: '100%',
              padding: '10px 20px',
              // display:'none'
              
            }}>SOLD OUT</span>
          </ItemSoldOut>
        </WrapperCard>

      </Col>

      <Col span={6}>
        <WrapperCard
          style={{ padding:'6px ' , borderRight:'1px solid #000' , borderBottom:'1px solid #000' }}
        
        >
          
          <Slider  {...settings}>
            
            {arrImages.map((image, index) => (
              <div key={index} >
                <img key={image} src={image} alt={`slider-${index}`} preview={false} />
              </div>
            ))}
            
          </Slider>
          
          <ProContent>
            
            <a  style={{
              color:'#000',
              verflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              height: '55px',
              textTransform: 'uppercase',
              
              }}
            >SSMA THE EMBROIDERY SHORTS - YELLOW</a>
            <div className="prd-price-box">

              <span className="prd-price">550,000đ</span>
            </div>
          </ProContent>
          <ItemSoldOut>
            <span style={{
              background: '#000',
              color: '#fffef9',
              textTransform: 'uppercase',
              fontSize: '13px !important',
              width: '100%',
              padding: '10px 20px',
              // display:'none'
              
            }}>SOLD OUT</span>
          </ItemSoldOut>
        </WrapperCard>

      </Col>
      
    </Row>
    

        
  )
}

export default CardComponent
