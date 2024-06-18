import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { 
    AddCartButton,
     Control,
      CurrentPrice,
       ItemColorImg,
        ListImageSm,
        PrdDesContent,
        PrdDesContentP,
        PrdDesTitle,
        ProductAction, 
        ProductDescription, 
        ProductDetailName,
        Qty, QtyInput, SizeSpan, SizeSpanA, SliderProImg, SliderProItem } from './style';
import './index.css';
import prod1 from '../../assets/img/product/prod1.jpeg';
import prod2 from '../../assets/img/product/prod2.jpeg';
import prod3 from '../../assets/img/product/prod3.jpeg';
import prod4 from '../../assets/img/product/prod4.jpeg';
import sizetee from '../../assets/img/product/sizetee.jpeg';

const ProductDetailsComponent = () => {
    // slide chuyển ảnh
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [prod1, prod2, prod3, prod4];

    const updateImageByIndex = (index) => {
        setCurrentIndex(index);
    };

    const handlePrevClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
        } else {
        setCurrentIndex(currentIndex + 1);
        }
    };

    // Select size

    const [selectedSize, setSelectedSize] = useState('S');
  
    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };    

    // Tăng giảm số lượng

    const [quantity, setQuantity] = useState(1)
    const handleIncrease = () => {
        if(quantity <  14 ) {
            setQuantity (quantity + 1);
        }
    }

    const handleDecrease = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }


    return (
        <div>
            <Row>
                <Col span={12} style={{ padding: '40px 15px', borderRight: '1px solid #000' }}>
                    <div className="slider-pro" style={{ padding: '0 175px' }}>
                        <SliderProItem className="slider-pro__item">
                            <a href="#" className="slider-pro__link">
                                <SliderProImg src={images[currentIndex]} alt="" className="slider-pro__img" />
                            </a>

                            <Control className="control prev" style={{ left: '-59px' }} onClick={handlePrevClick}>
                                <LeftOutlined />
                            </Control>
                            <Control className="control next" style={{ right: '-59px' }} onClick={handleNextClick}>
                                <RightOutlined />
                            </Control>
                        </SliderProItem>

                        <Row>
                            {images.map((image, index) => (
                                <Col span={6} key={index}>
                                    <ListImageSm
                                        src={image}
                                        alt=""
                                        className={`list-image_sm ${index === currentIndex ? 'image-sm_border' : ''}`}
                                        onClick={() => updateImageByIndex(index)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{maxHeight:'850px', overflowY:'auto'}}>
                        <ProductAction className="product-action">
                            <ProductDetailName className="product-detail-name tp_product_detail_name">SUMMER24 JUICY CLUB T-SHIRT - BLUE</ProductDetailName>
                            <div className="product-detail-price" style={{marginTop:'25px'}}>
                                <CurrentPrice className="current-price tp_product_detail_price">650,000 ₫</CurrentPrice>                        
                            </div>
                            <div className="select-swatch clearfix attr">
                                <div className="colorPicker clearfix" style={{margin:'40px 0 30px'}}>

                                    <p className="color req row row-cols-auto justify-content-center" data-column="i1">
                                        <span className="itemColor" style={{alignItems:'center',margin:'0 3px',display: 'flex',justifyContent: 'center'}}>
                                            <a rel="nofollow" href="javascript:" className="active"  title="BLUE" style={{border:'1px solid #000',width:'76px'}}>
                                                <ItemColorImg src={prod1} alt=""/> 
                                            </a>
                                        </span>                                            
                                    </p>
                                </div>
                                <div className="sizePicker clearfix">
                                    <p className="size req row row-cols-6 justify-content-center" style={{margin: '0 0 16px'}}>
                                        {['S', 'M', 'L', 'XL'].map((size) => (
                                        <SizeSpan key={size}>
                                            <SizeSpanA
                                            data-name={size}
                                            className={selectedSize === size ? 'active' : ''}
                                            onClick={() => handleSizeClick(size)}
                                            >
                                            {size}
                                            </SizeSpanA>
                                        </SizeSpan>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="product-detail-action" style={{margin:'25px'}}>
                                <div className="qty-wrapper d-flex justify-content-center">
                                    <Qty className="qty-down" onClick={handleDecrease}>-</Qty>
                                    
                                    <QtyInput
                                        type="number"
                                        id="pquantity"
                                        className="qty-input"
                                        value={quantity}
                                        min="1"
                                        max="14"
                                        readOnly
                                    />
                                    <Qty className="qty-up" onClick={handleIncrease}>+</Qty>
                                </div>
                                <AddCartButton id="add-to-cart" className="btnAddToCart btnAtc btn-outline tp_button" data-ck="1">
                                    <span style={{fontSize: '14px', textTransform: 'uppercase',color: '#fff'}}>Thêm vào giỏ hàng</span>
                                </AddCartButton>
                                            
                            </div>
                        </ProductAction>

                        <ProductDescription className="product-description">
                            <PrdDesTitle className="prd-des-title">
                                product
                            </PrdDesTitle>
                            <PrdDesContent className="prd-des-content">
                                <figure className="image">
                                    <img src={sizetee}  style={{ maxWidth:'500px'}}/>
                                </figure>
                                
                                <PrdDesContentP style={{textAlign:'center'}}>
                                    - MESH 100% POLYESTER<br></br>
                                    
                                    - OVERSIZE<br></br>
                                    
                                    - CREW NECK<br></br>
                                    
                                    - THERMAL TRANSFER PRINTING<br></br>
                                    
                                    - CUT LINE CHEST AND BACK<br></br>
                                    
                                    - MADE IN VIET NAM
                                    
                                </PrdDesContentP>
                                                  
                            </PrdDesContent>
                        </ProductDescription>
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetailsComponent;
