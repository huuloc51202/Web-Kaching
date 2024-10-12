import React, { useEffect, useState } from 'react';
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
        ProductActionCol, 
        ProductDescription, 
        ProductDetailName,
        Qty, QtyInput, SizeSpan, SizeSpanA, SliderPro, SliderProCol, SliderProImg, SliderProItem } from './style';
import './index.css';
import prod1 from '../../assets/img/product/prod1.jpeg';
import prod2 from '../../assets/img/product/prod2.jpeg';
import prod3 from '../../assets/img/product/prod3.jpeg';
import prod4 from '../../assets/img/product/prod4.jpeg';
import * as ProductService from '../../services/PoductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice, getCartFromLocalStorage, saveCartToLocalStorage } from '../../utils';
import * as message from '../Message/Message'

const ProductDetailsComponent = ({idProduct}) => {
    const user = useSelector((state) => state.user)
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()


    

    // Select size

    const [selectedSize, setSelectedSize] = useState('S');
  
    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };    

    // Tăng giảm số lượng

    const [quantity, setQuantity] = useState(1)
    const handleIncrease = () => {
        if(quantity <  productDetails?.countInStock ) {
            setQuantity (quantity + 1);
        }else {
            alert(`Chỉ còn ${productDetails?.countInStock} sản phẩm trong kho.`);
        }
    }

    const handleDecrease = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    // Hiện thị sản phẩm chi tiết 

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id){

            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const {isLoading, data: productDetails} = useQuery({
        queryKey: ['product-details',idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled : !!idProduct,
    })

    useEffect(() => {
        if (user?.id) {
            // Khi user thay đổi, lấy giỏ hàng từ localStorage
            const cart = getCartFromLocalStorage(user.id);
            setCartData(cart);
        }
    }, [user]);

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            message.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            navigate('/sign-in', { state: location?.pathname });
        } else if (productDetails?.soldOut) {
            // Nếu sản phẩm đã hết hàng hoặc chưa chọn kích thước, không thực hiện thêm sản phẩm
            return; // Có thể hiển thị thông báo hoặc xử lý lỗi ở đây nếu cần
        } else {
            // Kiểm tra nếu sản phẩm có nhiều ảnh, chỉ lấy ảnh đại diện (ví dụ: ảnh đầu tiên)
            const productImage = Array.isArray(productDetails?.image) 
                ? productDetails?.image[0] // Lấy ảnh đầu tiên trong mảng nếu có nhiều ảnh
                : productDetails?.image;    // Lấy ảnh duy nhất nếu chỉ có một ảnh
    
            // Tạo đối tượng sản phẩm mới
            const newProduct = {
                name: productDetails?.name,
                size: selectedSize,
                amount: quantity,
                image: productImage, // Sử dụng ảnh đã xử lý ở trên
                price: productDetails?.price,
                discount: productDetails?.discount,
                product: productDetails?._id,
            };
    
            // Cập nhật giỏ hàng
            const updatedCart = cartData.map(item => {
                if (item.product === newProduct.product && item.size === newProduct.size) {
                    // Cập nhật số lượng cho sản phẩm đã tồn tại
                    return { ...item, amount: item.amount + newProduct.amount };
                }
                return item;
            });
    
            // Nếu sản phẩm không có trong giỏ hàng, thêm mới vào giỏ hàng
            if (!updatedCart.some(item => item.product === newProduct.product && item.size === newProduct.size)) {
                updatedCart.push(newProduct);
            }
    
            setCartData(updatedCart);
    
            // Lưu giỏ hàng vào localStorage
            saveCartToLocalStorage(user.id, updatedCart);
    
            // Gửi sản phẩm vào Redux store nếu cần
            dispatch(addOrderProduct({ orderItem: newProduct }));
    
            message.success("Sản phẩm đã được thêm vào giỏ hàng.");
        }
    };    
    
    // slide chuyển ảnh
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = productDetails?.image || [];

    const updateImageByIndex = (index) => {
        setCurrentIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    
    return (
        <div>
            <Loading isPending={isLoading}>
                <Row>
                    <SliderProCol xs={24} sm={12} md={12} >
                        <SliderPro className="slider-pro" >
                            <SliderProItem className="slider-pro__item">
                                <a href="#" className="slider-pro__link">
                                    {/* src={images[currentIndex]} */}
                                    {/* src={productDetails?.image} */}
                                    {images.length > 0 && (
                                        <SliderProImg src={images[currentIndex]} alt={`Product Image ${currentIndex}`} className="slider-pro__img" />
                                    )}
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
                        </SliderPro>
                    </SliderProCol>
                    <Col xs={24} sm={12} md={12}>
                        <ProductActionCol >
                            <ProductAction className="product-action">
                                <ProductDetailName className="product-detail-name tp_product_detail_name">{productDetails?.name}</ProductDetailName>
                                <div className="product-detail-price" style={{marginTop:'25px'}}>
                                    <CurrentPrice className="current-price tp_product_detail_price">{convertPrice(productDetails?.price)}₫</CurrentPrice>                        
                                </div>
                                <div className="select-swatch clearfix attr">
                                    {/* <div className="colorPicker clearfix" style={{margin:'40px 0 30px'}}>

                                        <p className="color req row row-cols-auto justify-content-center" data-column="i1">
                                            <span className="itemColor" style={{alignItems:'center',margin:'0 3px',display: 'flex',justifyContent: 'center'}}>
                                                <a rel="nofollow" href="" className="active"  style={{border:'1px solid #000',width:'76px'}}>
                                                    <ItemColorImg src={productDetails?.image} alt=""/> 
                                                </a>
                                            </span>                                            
                                        </p>
                                    </div> */}
                                    <div className="sizePicker clearfix" style={{margin:'40px 0 30px'}}>
                                        <p className=" justify-content-center" style={{margin: '0 0 16px'}}>
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
                                    <div className="qty-wrapper ">
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
                                    <AddCartButton 
                                        id="add-to-cart" 
                                        className="btnAddToCart btnAtc btn-outline tp_button" 
                                        onClick={productDetails?.countInStock > 0 ? handleAddOrderProduct : null}  // Ngăn sự kiện khi hết hàng
                                        style={{
                                            backgroundColor: productDetails?.countInStock === 0 ? '#ccc' : '#000', 
                                            cursor: productDetails?.countInStock === 0 ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        <span style={{ fontSize: '14px', textTransform: 'uppercase', color: '#fff' }}>
                                            {productDetails?.countInStock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                                        </span>
                                    </AddCartButton>
                                                
                                </div>
                            </ProductAction>

                            <ProductDescription className="product-description">
                                <PrdDesTitle className="prd-des-title">
                                    product
                                </PrdDesTitle>
                                <PrdDesContent className="prd-des-content">
                                    <figure className="image">
                                        <img src={productDetails?.typeimage}  style={{ maxWidth:'100%'}}/>
                                    </figure>
                                    
                                    <PrdDesContentP style={{textAlign:'center'}}>
                                        {productDetails?.description}
                                        
                                    </PrdDesContentP>
                                    {/* <LikeButtonComponent dataHref="https://www.facebook.com/kaching.by.chuchoa" /> */}
                                </PrdDesContent>
                            </ProductDescription>
                            
                        </ProductActionCol>
                    </Col>
                </Row>

                              
            </Loading>
        </div>
    );
};

export default ProductDetailsComponent;
