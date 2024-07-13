import { Col } from 'antd'
import React, { useState } from 'react'
import { ButtonTotal, CartContinue, CategoryTotal, PayTotal, Qty, QtyInput, TableHeading, TableShare, ThumbCartH4, ThumbCartSpan, Title } from './style'
import {
    DeleteOutlined
} from '@ant-design/icons';
import prod1 from '../../assets/img/product/prod1.jpeg'

const CartPage = () => {
    // Tăng giảm số lượng

    const [quantity, setQuantity] = useState(1)
    const handleIncrease = () => {
        if(quantity < 14){
            setQuantity (quantity +1)
        }
    }

    const handleDecrease = () => {
        if(quantity > 1){
            setQuantity (quantity -1)
        }
    }

    return (
        <div className="grid wide" style={{width:'100%', maxWidth:'1021px',margin:'80px auto 30px'}}>
            <Col className="col" span={24}>
                <div className="new-product" > 
                    {/* <!-- header-body  --> */}
                    <div className="" style={{maxWidth:'100%'}}>
                        <div className="cart-titlet " style={{marginBottom:'15px'}}>
                            <Title className="titlet">GIỎ HÀNG</Title>
                            
                        </div>


                    </div>     
                    
                    {/* <!-- body --> */}
                    <div className="product-cart" style={{display:'flex'}}>  
                        
                        <Col span={18} style={{paddingLeft:'0px'}}>
                            <div className="table-cart" >
                                <div className="table__product" style={{marginBottom: '20px',borderBottom: '1px solid #eee'}}>
                                    <thead>
                                        <TableHeading className="table-heading">
                                            <TableShare  className="table-share table-product" style={{width: '392px'}}>Sản phẩm</TableShare >
                                            <TableShare  className="table-share table-qty" style={{width: '212px'}}>Số lượng</TableShare >
                                            <TableShare  className="table-share table-linePrice" style={{width: '119px'}}>Tổng tiền</TableShare >
                                            <TableShare  className="table-share table-remove" style={{width: '42px'}}>Xóa</TableShare >
                                        </TableHeading>
                                    </thead>

                                    <tbody>
                                        <div id="pro-table">
                                            <TableHeading className="table-heading">
                                                <TableShare className="table-share table-product" style={{width: '392px'}}>
                                                    <a  style={{textDecoration:'none'}}>
                                                        <div className="thumb-cart" style={{display:'flex'}}>
                                                            <img src={prod1} alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                                            <div className="thumb-cart__item" style={{width : '125px' }}>
                                                                <ThumbCartH4 > SUMMER24 JUICY CLUB T-SHIRT </ThumbCartH4 >
                                                                <ThumbCartSpan className="variant-title" > M </ThumbCartSpan>
                                                                <ThumbCartSpan>500.000₫</ThumbCartSpan>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </TableShare>
                                                <TableShare className="table-share table-qty" style={{width: '212px'}}>
                                                    <div className="qty-number">

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
                                                </TableShare>
                                                <b className="table-share table-linePrice"  style={{width: '119px'}}> 500.000₫</b>
                                                <TableShare className="table-share table-remove" onclick="removePro(this)" style={{width: '42px'}}>
                                                    <DeleteOutlined style={{cursor:'pointer'}}/>
                                                    
                                                </TableShare>
                                            </TableHeading>

                                            <TableHeading className="table-heading">
                                                <TableShare className="table-share table-product" style={{width: '392px'}}>
                                                    <a  style={{textDecoration:'none'}}>
                                                        <div className="thumb-cart" style={{display:'flex'}}>
                                                            <img src={prod1} alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                                            <div className="thumb-cart__item" style={{width : '125px' }}>
                                                                <ThumbCartH4 > SUMMER24 JUICY CLUB T-SHIRT </ThumbCartH4 >
                                                                <ThumbCartSpan className="variant-title" > M </ThumbCartSpan>
                                                                <ThumbCartSpan>500.000₫</ThumbCartSpan>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </TableShare>
                                                <TableShare className="table-share table-qty" style={{width: '212px'}}>
                                                    <div className="qty-number">

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
                                                </TableShare>
                                                <b className="table-share table-linePrice"  style={{width: '119px'}}> 500.000₫</b>
                                                <TableShare className="table-share table-remove" onclick="removePro(this)" style={{width: '42px'}}>
                                                    <DeleteOutlined style={{cursor:'pointer'}}/>
                                                    
                                                </TableShare>
                                            </TableHeading>
                                        </div>
                                        
                                    </tbody>
                                </div>
                                
                                
                                <div className="row" style={{justifyContent:'space-around',display:'flex'}}>

                                    <div className="button-cart" style={{padding: '20px 0px'}}>
                                        <CartContinue href="/" className="cart-continue ">  
                                            Tiếp tục  mua  sắm
                                        </CartContinue>
                                    </div>

                                    <div className="button-cart" style={{padding: '20px 0px'}}>
                                        <CartContinue className="cart-continue " onclick="del()" style={{cursor : 'pointer'}}>  
                                            Xoá tất cả sản phẩm
                                        </CartContinue>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6} style={{marginLeft:'30px'}}>
                            <nav className="category">
                                <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                    <CategoryTotal className="category-total">
                                        Tổng tiền
                                        <b className="total-cate" id="total-cate">500.000₫</b>
                                    </CategoryTotal>

                                    <ButtonTotal className="button-total">
                                        <PayTotal  className="pay-total">
                                            Thanh toán
                                        </PayTotal>
                                    </ButtonTotal>

                                </div>

                                

                            </nav>
                        </Col>
                        
                    </div>

                    
                </div>
            </Col>
        </div>
    )
}

export default CartPage
