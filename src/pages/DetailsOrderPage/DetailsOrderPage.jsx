import {  Col } from 'antd'
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {  CategoryTotal, Fieldset,ProductCart,TableHeading,TableShare,ThumbCartH4,ThumbCartSpan } from './style'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { convertPrice } from '../../utils'
import { orderContant } from '../../contant'
import Loading from '../../components/LoadingComponent/Loading'

const DetailsOrderPage = () => {
    const params = useParams()
    const location  = useLocation()
    const {state} = location
    const {id} = params
    const fetchDetailsMyOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token)
        return res.data
    }
    const queryOrder =useQuery({
        queryKey: ['order-details'],
        queryFn: fetchDetailsMyOrder, 
        enabled: !!id,
    });
    const {isLoading, data} = queryOrder
    console.log('data',data)


    return (
        <Loading  isPending={isLoading}>

            <div className="grid wide" style={{width:'100%', maxWidth:'1021px',margin:'80px auto 30px'}}>
                
                <Col className="col" span={24}>
                    <div className="new-product" > 
                        
                        
                        {/* <!-- body --> */}
                        <ProductCart className="product-cart" >  
                            
                            <Col xs={24}  md={18} style={{paddingLeft:'0px'}}>
                                <div className="table-cart" >
                                    <div className="table__product" style={{marginBottom: '20px'}}>
                                        <div className="step-sections ">
                                            
                                                
                                            
                                            <div className="section" style={{marginLeft:'35px'}}>
                                                <div className="section-header">
                                                    <h2 className="section-title" style={{paddingBottom:'10px',borderBottom:'1px solid #000',margin:'0',textAlign:'center'}}>Đặt hàng thành công</h2>
                                                </div>
                                                <div className="section-content ">
                                                    
                                                    
                                                    
                                                    <Fieldset >
                                                        <p  style={{margin:'0 0 5px'}}>Cảm ơn các tình yêu đã mua hàng tại website , thấy tốt thì các tình yêu quay lại mua nhé :3 </p>
                                                        {/* <div style={{display:'flex',flexDirection:'column'}}>
                                                            <span>Mã đơn hàng</span><br></br>
                                                            <b style={{backgroundColor: '#0a0a0a',color: '#fff',letterSpacing: '0.6px',padding:'1.5rem 2.5rem 1.5rem 1rem',width:'10%'}}></b>

                                                        </div> */}


                                                        <tbody>
                                                            <div id="pro-table">
                                                                {data?.orderItems?.map((order) => {
                                                                    const price = order?.price || 0;
                                                                    const amount = order?.amount || 0;
                                                                    const discount = order?.discount || 0;
                                                                    return (
                                                                        <TableHeading className="table-heading">
                                                                            <TableShare className="table-share table-product" >
                                                                                <a  style={{textDecoration:'none'}}>
                                                                                    <div className="thumb-cart" style={{display:'flex'}}>
                                                                                        <img src={order.image} alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                                                                        <div className="thumb-cart__item" style={{width : '125px' }}>
                                                                                            <ThumbCartH4 > {order.name} </ThumbCartH4 >
                                                                                            <ThumbCartSpan className="variant-title" >{order.size} </ThumbCartSpan>
                                                                                            <ThumbCartSpan>{convertPrice(order.price)}₫</ThumbCartSpan><br></br>
                                                                                            {discount > 0 && <ThumbCartSpan>-{discount}%</ThumbCartSpan>}
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </TableShare>
                                                                            <TableShare className="table-share table-qty" >
                                                                                <div className="qty-number">
                                                                                    Số lượng: {order.amount}
                                                                                    
                                                                        
                                                                                
                                                                                </div>
                                                                            </TableShare>
                                                                            
                                                                        </TableHeading>

                                                                    )
                                                                })}

                                                            </div>
                                                            
                                                        </tbody>
                                                        
                                                    </Fieldset>
                                                </div>

                                                <div className="section-header" style={{marginTop:'10px'}}>
                                                    <h2 className="section-title" style={{paddingBottom:'10px',borderBottom:'1px solid #000',margin:'0',textAlign:'center'}}>Thông tin đơn hàng</h2>
                                                </div>
                                                <div className="section-content ">
                                                    
                                                    
                                                    
                                                    <Fieldset >
                                                        
                                                        <div class="section-content-column">
                                                            <p>Họ và tên : {data?.shippingAddress?.fullName}</p>
                                                            <p>Địa chỉ : {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</p>
                                                            <p>Điện thoại: {data?.shippingAddress?.phone}</p>
                                                            <p>Phương thức thanh toán : {orderContant.payment[data?.paymentMethod]}</p>
                                                            <p>Thanh toán : {orderContant.payment[data?.paymentMethod]}</p>
                                                                                    
                                                        </div>
                                                        
                                                    </Fieldset>
                                                </div>

                                            
                                            </div>
                                                            
                                            
                                            
                                        </div>
                                    </div>
                                    
                                    
                                
                                </div>
                            </Col>
                            <Col xs={24}  md={6} style={{marginLeft:'0px'}}>
                                <nav className="category">
                                    
                                    <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                        <CategoryTotal className="category-total">
                                            Tạm tính
                                            <b className="total-cate" id="total-cate">{convertPrice(data?.itemsPrice)}₫</b>
                                        </CategoryTotal>

                                        {data && data?.shippingPrice > 0.2 ? (
                                            <CategoryTotal className="category-total">
                                                Phí vận chuyển
                                                <b className="total-cate" id="total-cate">{convertPrice(data?.shippingPrice)}₫</b>
                                            </CategoryTotal>
                                        ) : (
                                            
                                            <CategoryTotal className="category-total">
                                                Phí vận chuyển
                                                <b className="total-cate" id="total-cate">0₫</b>
                                            </CategoryTotal>

                                            
                                        ) }

                                        <CategoryTotal className="category-total">
                                            Tổng tiền
                                            <b className="total-cate" id="total-cate">{convertPrice(data?.totalPrice)}₫</b>
                                        </CategoryTotal>

                                    </div>

                                    

                                </nav>
                            </Col>
                            
                        </ProductCart>

                        
                    </div>
                </Col>    
            </div>
        </Loading>
    )
}

export default DetailsOrderPage
