import {  Col, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { ButtonTotal, CartContinue, CategoryTotal, ColTable, PayTotal, ProductCart, Qty, QtyInput, TableHeading, TableShare, ThumbCartH4, ThumbCartSpan, Title } from './style'
import {
    DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice, getCartFromLocalStorage, saveCartToLocalStorage } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slides/userSlide';
import {  useNavigate } from 'react-router-dom';
import emptyCart from '../../assets/img/slides/emptycart.webp'
import { updateOrder } from '../../redux/slides/orderSlide';

const CartPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city:'',
    })
    const [form] = Form.useForm();
    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log('data',data)
            const {
                id,
                token,
                ...rests
                
            } = data
            const res = UserService.updateUser(
                id,
                {...rests},
                token,
            )
            return res
        },

    )

    const { data} = mutationUpdate
    const dispatch = useDispatch()

    useEffect(() =>  {
        form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    useEffect(() => {
        if(isOpenModalUpdateInfo){
            setStateUserDetails({
                
                city: user?.city,
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
            })
        }
    },[isOpenModalUpdateInfo])

    useEffect(() => {
        if (user?.id) {
            const storedCart = getCartFromLocalStorage(user?.id);
            dispatch(updateOrder(storedCart)); // Cập nhật giỏ hàng từ localStorage
        }
    }, [user?.id]);

    useEffect(() => {
        if (order?.orderItems) {
            saveCartToLocalStorage(user?.id, order.orderItems);
        }
    }, [order?.orderItems]);


    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            const discount = cur?.discount || 0;
            const priceAfterDiscount = cur.price * cur.amount * (1 - discount / 100);
            return total + priceAfterDiscount;
        }, 0);
        return result;
    }, [order]);

    // Phí Ship
    const diliveryPriceMemo = useMemo(() => {
        if(priceMemo >= 280000){
            return 0
        }else if(priceMemo === 0){
            return  0
        }else{
            return 19000
        }
    },[priceMemo])

    const totalPriceMemo = useMemo(() => {
       return Number(priceMemo) + Number(diliveryPriceMemo)
     },[priceMemo,diliveryPriceMemo])
    //

    const handleChangeCount = (type,idProduct,size,limited) => {
        if(type === 'increase'){
            if(!limited){

                dispatch(increaseAmount({idProduct,size}))
            }
        }else{
            if(!limited){

                dispatch(decreaseAmount({idProduct,size}))
            }
        }

        saveCartToLocalStorage(user?.id, order?.orderItems);
    }

    const handlDeleteOrder = (idProduct, size) => {
        dispatch(removeOrderProduct({ idProduct, size }));
        const updatedOrderItems = order?.orderItems?.filter(
            (item) => !(item.product === idProduct && item.size === size)
        );
        saveCartToLocalStorage(user?.id, updatedOrderItems);
    };
    

    const handleClearCart = () => {
        dispatch(clearOrder())
        saveCartToLocalStorage(user?.id, []);
    }

   
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleAddCard = () => {
        if(!user?.phone || !user?.address || !user?.name || !user?.city){
            setIsOpenModalUpdateInfo(true)
        }else{
            navigate('/cart/payment')
        }
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleCancelUpdate =  () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            address: '',
            
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    const handleUpdateInforUser = () => {
        const {name, phone, address, city} = stateUserDetails;
        if(name && phone && address && city){
            mutationUpdate.mutate({id: user?.id, token: user?.access_token,  ...stateUserDetails},{
                onSuccess: (response) => {
                    // Cập nhật lại thông tin từ response của server
                    dispatch(updateUser({ ...response.data, access_token: user?.access_token }));
                    setIsOpenModalUpdateInfo(false);
                }
            });
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
                    <ProductCart className="product-cart" style={{}}>
                        {order?.orderItems?.length === 0 ? (
                            <Col xs={24} sm={24} md={24} style={{textAlign:'center'}}>
                                <div className="table__no-cart" > 
                                    <img src={emptyCart} alt="" class="no-cart__img"style={{width:'400px'}}/>
                                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                                </div>
                                <div className="button-cart" style={{padding: '20px 0px'}}>
                                    <CartContinue onClick={handleHome} className="cart-continue ">  
                                        Tiếp tục  mua  sắm
                                    </CartContinue>
                                </div>
                                
                            </Col>  
                        
                        ) : (
                            <>
                                <ColTable xs={24} sm={24} md={24}  >
                                    <div className="table-cart" >
                                        <div className="table__product" style={{marginBottom: '20px',borderBottom: '1px solid #eee'}}>
                                            {/* <thead>
                                                <TableHeading className="table-heading">
                                                    <TableShare  className="table-share table-product" style={{width: '392px'}}>Sản phẩm</TableShare >
                                                    <TableShare  className="table-share table-qty" style={{width: '212px'}}>Số lượng</TableShare >
                                                    <TableShare  className="table-share table-linePrice" style={{width: '119px'}}>Thành tiền</TableShare >
                                                    <TableShare  className="table-share table-remove" style={{width: '42px'}}>Xóa</TableShare >
                                                </TableHeading>
                                            </thead> */}

                                            <tbody>
                                                <div id="pro-table">
                                                    {order?.orderItems?.map((order) => {
                                                        const price = order?.price || 0;
                                                        const amount = order?.amount || 0;
                                                        const discount = order?.discount || 0;
                                                        return (

                                                            <TableHeading className="table-heading">
                                                                <TableShare  className="table-share table-product" >
                                                                    <a  style={{textDecoration:'none'}}>
                                                                        <div className="thumb-cart" style={{display:'flex'}}>
                                                                            <img src={order?.image} alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                                                            <div className="thumb-cart__item" style={{width : '125px' }}>
                                                                                <ThumbCartH4 > {order?.name} </ThumbCartH4 >
                                                                                <ThumbCartSpan className="variant-title" > {order?.size} </ThumbCartSpan>
                                                                                <ThumbCartSpan>{order?.price?.toLocaleString()}₫</ThumbCartSpan><br></br>
                                                                                {discount > 0 && <ThumbCartSpan>-{discount}%</ThumbCartSpan>}
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </TableShare>
                                                                <TableShare   className="table-share table-qty" style={{marginRight:'5px'}} >
                                                                    <div className="qty-number">

                                                                        <Qty className="qty-down" onClick={() => handleChangeCount('decrease',order?.product,order?.size, order?.amount === 1)}  >-</Qty>
                                                    
                                                                        <QtyInput
                                                                            defaultValue={order?.amount}
                                                                            type="number"
                                                                            id="pquantity"
                                                                            className="qty-input"
                                                                            value={order?.amount}
                                                                            min={1} 
                                                                            max={order?.countInStock}
                                                                            readOnly
                                                                        />
                                                                        <Qty className="qty-up" onClick={() => handleChangeCount('increase',order?.product,order?.size, order?.amount === order.countInStock)}  >+</Qty>
                                                                        
                                                                        
                                                                    
                                                                    </div>
                                                                </TableShare>
                                                                <b  className="table-share table-linePrice" style={{marginRight:'5px'}}> 
                                                                    {convertPrice(
                                                                        (price * amount) - 
                                                                        ((price * amount) * (discount / 100))
                                                                    )}₫
                                                                </b>
                                                                <TableShare  className="table-share table-remove">
                                                                    <DeleteOutlined style={{cursor:'pointer'}}  onClick={() => handlDeleteOrder(order?.product, order?.size)} />
                                                                    
                                                                </TableShare>
                                                            </TableHeading>
                                                        )

                                                    })}

                                                </div>
                                                
                                            </tbody>
                                        </div>
                                        
                                        
                                        <div className="" >

                                            <div className="button-cart" style={{padding: '20px 0px'}}>
                                                <CartContinue onClick={handleHome} className="cart-continue ">  
                                                    Tiếp tục  mua  sắm
                                                </CartContinue>
                                            </div>

                                            <div className="button-cart" style={{padding: '20px 0px'}}>
                                                <CartContinue className="cart-continue " onClick={handleClearCart} style={{cursor : 'pointer'}}>  
                                                    Xoá tất cả sản phẩm
                                                </CartContinue>
                                            </div>
                                        </div>
                                    </div>
                                </ColTable>
                                <Col  xs={24} sm={24} md={24} style={{marginLeft:'30px'}}>
                                    <nav className="category">
                                        <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                            <CategoryTotal className="category-total">
                                                Địa chỉ:
                                                <b className="total-cate" id="total-cate" style={{fontSize:'12px'}}>{`${user?.address} ${user?.city}`}</b>
                                            </CategoryTotal>
                                            <ButtonTotal className="button-total">
                                                <PayTotal  className="pay-total"  onClick={handleChangeAddress} style={{cursor:'pointer'}}>
                                                    Thay đổi
                                                </PayTotal>
                                            </ButtonTotal>
                                        </div>  
                                        <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                            <CategoryTotal className="category-total">
                                                Tạm tính
                                                <b className="total-cate" id="total-cate">{convertPrice(priceMemo)}₫</b>
                                            </CategoryTotal>
                                            <CategoryTotal className="category-total">
                                                
                                                <span >Mua hàng trên 280.000₫ được FreeShip :3</span>
                                            </CategoryTotal>
                                            <CategoryTotal className="category-total">
                                                Phí vận chuyển
                                                <b className="total-cate" id="total-cate">{convertPrice(diliveryPriceMemo)}₫</b>
                                            
                                            </CategoryTotal>
                                            
                                            <CategoryTotal className="category-total">
                                                Tổng tiền
                                                <b className="total-cate" id="total-cate">{convertPrice(totalPriceMemo)}₫</b>
                                            </CategoryTotal>

                                            <ButtonTotal className="button-total" >
                                                <PayTotal  className="pay-total" onClick={() => handleAddCard()}  style={{cursor:'pointer'}}>
                                                    Thanh toán
                                                </PayTotal>
                                            </ButtonTotal>

                                        </div>

                                        

                                    </nav>
                                </Col>
                                
                            </>
                        )}
                        
                    </ProductCart>

                    
                </div>
            </Col>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}  >
                <Form
                    name="basic1"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 20 }}
                    // onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Please input user name!' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                    </Form.Item>
                    
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
                    </Form.Item>
                

                    
                </Form>
            </ModalComponent>        
        </div>
    )
}

export default CartPage
