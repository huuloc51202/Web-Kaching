import { Col } from 'antd'
import React from 'react'

const CartPage = () => {
    return (
        <div className="grid wide" style={{width:'100%', maxWidth:'1200px',margin:'80px auto 30px'}}>
            <Col className="col" span={24}>
                <div className="new-product" > 
                    {/* <!-- header-body  --> */}
                    <div className="l-12">
                        <div className="cart-titlet ">
                            <h1 className="titlet">GIỎ HÀNG</h1>
                            
                        </div>


                    </div>     
                    
                    {/* <!-- body --> */}
                    <div className="product-cart">  
                        <div  className="col l-8" style={{paddingLeft:'0px'}}>
                            <div className="table-cart">
                                <div className="table__product">
                                    <thead>
                                        <div className="table-heading">
                                            <span className="table-share table-product">Sản phẩm</span>
                                            <span className="table-share table-qty">Số lượng</span>
                                            <span className="table-share table-linePrice">Tổng tiền</span>
                                            <span className="table-share table-remove">Xóa</span>
                                        </div>
                                    </thead>

                                    <tbody>
                                        <div id="pro-table">
                                            <div className="table-heading">
                                                <div className="table-share table-product">
                                                    <a href="" style={{textDecoration:'none'}}>
                                                        <div className="thumb-cart">
                                                            <img src=" " alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                                            <div className="thumb-cart__item">
                                                                <h4>  </h4>
                                                                <span className="variant-title" >  </span>
                                                                <span>₫</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="table-share table-qty">
                                                    <div className="qty-number">
                        
                                                        
                                                        <input type="number"   name="quantity" min="1" id="amount" value="" className="item-quantity " aria-label="quantity"></input>
                                                    
                                                    </div>
                                                </div>
                                                <b className="table-share table-linePrice"> ₫</b>
                                                <div className="table-share table-remove" onclick="removePro(this)">
                                                    
                                                    <i className="remove__icon  fa-solid fa-trash"></i>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </tbody>
                                </div>
                                
                                
                                <div className="row" style={{justifyContent:'space-around'}}>

                                    <div className="button-cart">
                                        <a href="/" className="cart-continue ">  
                                            Tiếp tục  mua  sắm
                                        </a>
                                    </div>

                                    <div className="button-cart">
                                        <a className="cart-continue " onclick="del()" style={{cursor : 'pointer'}}>  
                                            Xoá tất cả sản phẩm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col l-4 ">
                            <nav className="category">
                                <div className="cart__total">
                                    <div className="category-total">
                                        Tổng tiền
                                        <b className="total-cate" id="total-cate"></b>
                                    </div>

                                    <div className="button-total">
                                        <a href="" className="pay-total">
                                            Thanh toán
                                        </a>
                                    </div>

                                </div>

                                <div className="cart-note">
                                    <div className="category-note">
                                        <label for="note" className="note-item" >Ghi chú</label>
                                        <textarea name="note" id="note" cols="68" rows="4" placeholder="Bạn muốn miêu tả rõ hơn về đơn hàng..."></textarea>
                                    </div>
                                </div>

                            </nav>
                        </div>
                        
                    </div>

                    
                </div>
            </Col>
        </div>
    )
}

export default CartPage
