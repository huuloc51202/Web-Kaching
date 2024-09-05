import {  Col, Form, message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { ButtonTotal, CategoryTotal, FieldInput, FieldInputWrapper, Fieldset, PayTotal,RadioContentInput,RadioWrapper,Title } from './style'
import {
    DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slides/userSlide';
import Loading from '../../components/LoadingComponent/Loading';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [payment, setPayment] = useState("COD");
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city:'',
    })
    

    
    const handlePaymentChange = (event) => {
        setPayment(event.target.value); 
    };

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
        if(priceMemo > 280000){
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


   
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleAddOrder = () => {
        let shippingPrice = diliveryPriceMemo === 0 ? 1 : diliveryPriceMemo;
        if(user?.access_token && order?.orderItems &&  user?.name && user?.address && user?.city && user?.phone && payment  && priceMemo  ){
            mutationAddOrder.mutate(
                { 
                    id: user?.id, 
                    token: user?.access_token,
                    orderItems: order?.orderItems, 
                    fullName: user?.name, 
                    address: user?.address, 
                    city: user?.city, 
                    phone: user?.phone,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: shippingPrice,
                    totalPrice: totalPriceMemo,
                    user:user?.id,
                },{
                    onSuccess: () => {
                        message.success('Đặt hàng thành công')
                    }
                }
            )

        }
    }

    console.log('order',order,user)

    const mutationAddOrder = useMutationHooks(
        (data) => {
            console.log('data',data)
            const {
                token,
                ...rests
                
            } = data
            const res = OrderService.createOrder(
                {...rests},
                token,
            )
            return res
        },

    )
    
    const {isLoading} = mutationAddOrder


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
                            <Title className="titlet">CHECKOUT</Title>
                            
                        </div>


                    </div>     
                    
                    {/* <!-- body --> */}
                    <div className="product-cart" style={{display:'flex'}}>  
                        
                        <Col span={18} style={{paddingLeft:'0px'}}>
                            <div className="table-cart" >
                                <div className="table__product" style={{marginBottom: '20px'}}>
                                    <div className="step-sections ">
                                        
                                            
                                        
                                        <div className="section" style={{marginLeft:'35px'}}>
                                            <div className="section-header">
                                                <h2 className="section-title" style={{paddingBottom:'10px',borderBottom:'1px solid #000',margin:'0'}}>Thông tin giao hàng</h2>
                                            </div>
                                            <div className="section-content ">
                                                
                                                
                                                
                                                <Fieldset >
                                                    <span>Lưu ý : Muốn thay đổi thông tin , khách hàng hãy ấn nút thay đổi bên tay phải màn hình nhé :3 </span>
                                                    <div className="field field-required">
                                                        <FieldInputWrapper >
                                                            <FieldInput placeholder="Họ và tên"  size="30" type="text" id="billing_address_full_name" name="name" value={user?.name} />
                                                        </FieldInputWrapper>
                                                        
                                                    </div>
                                                
                                                
                                                    
                                                    <div className="field field-required field-two-thirds  ">
                                                        <FieldInputWrapper >
                                                                
                                                            <FieldInput  placeholder="Email"  size="30" type="email" id="checkout_user_email" name="email" value={user?.email}/>
                                                        </FieldInputWrapper>
                                                            
                                                    </div>
                                                    
                                                
                                                
                                                    <div className="field field-required field-third  ">
                                                        <FieldInputWrapper >
                                                            
                                                            <FieldInput  placeholder="Số điện thoại"  size="30" maxlength="15" type="tel" id="billing_address_phone" name="phone" value={user?.phone}/>
                                                        </FieldInputWrapper>
                                                        
                                                    </div>

                                                    <div className="field field-required field-third  ">
                                                        <FieldInputWrapper >
                                                            
                                                            <FieldInput  placeholder="Địa chỉ"  size="30" maxlength="15" type="address"  name="address" value={`${user?.address} ${user?.city}`}/>
                                                        </FieldInputWrapper>
                                                        
                                                    </div>
                                                    
                                                </Fieldset>
                                            </div>

                                            
                                                
                                            <div id="change_pick_location_or_shipping">
                            
                                                    
                                                <div id="section-payment-method" className="section">
                                                    {/* <div className="order-checkout__loading--box">
                                                        <div className="order-checkout__loading--circle"></div>  
                                                    </div> */}
                                                    <div className="section-header">
                                                        <h2 className="section-title">Phương thức thanh toán</h2>
                                                    </div>

                                                    <div className="section-content" style={{display: 'flex', justifyContent: 'center'}}>
                                                        <div className="contentbox" style={{border: '1px solid'}}>
                                                            
                                                            {/* Thanh toán sau khi nhận hàng */}
                                                            <RadioWrapper>
                                                                <div className="radio-input payment-method-checkbox">
                                                                    <input 
                                                                        id="cod" 
                                                                        className="input-radio" 
                                                                        name="payment" 
                                                                        type="radio" 
                                                                        value="COD" 
                                                                        checked={payment === "COD"} // Kiểm tra nếu payment là "1"
                                                                        onChange={handlePaymentChange} // Thêm sự kiện onChange
                                                                    />
                                                                </div>
                                                                <RadioContentInput>
                                                                    <img className="main-img" src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6" style={{minWidth: '10%', marginRight: '9px'}}/>
                                                                    <div>
                                                                        <span className="radio-label-primary">Thanh toán sau khi nhận được hàng</span>
                                                                    </div>
                                                                </RadioContentInput>
                                                            </RadioWrapper>

                                                            {/* Ví MoMo */}
                                                            <RadioWrapper>
                                                                <div className="radio-input payment-method-checkbox">
                                                                    <input 
                                                                        id="momo" 
                                                                        className="input-radio" 
                                                                        name="payment" 
                                                                        type="radio" 
                                                                        value="MOMO" 
                                                                        checked={payment === "MOMO"} // Kiểm tra nếu payment là "2"
                                                                        onChange={handlePaymentChange} // Thêm sự kiện onChange
                                                                    />
                                                                </div>
                                                                <RadioContentInput>
                                                                    <img className="main-img" src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6" style={{minWidth: '33px', marginRight: '9px'}}/>
                                                                    <div>
                                                                        <span className="radio-label-primary">Ví MoMo</span>
                                                                    </div>
                                                                </RadioContentInput>
                                                            </RadioWrapper>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                            </div>
                                        </div>
                                                        
                                        
                                        
                                    </div>
                                </div>
                                
                                
                            
                            </div>
                        </Col>
                        <Col span={6} style={{marginLeft:'30px'}}>
                            <nav className="category">
                                <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                    
                                    <ButtonTotal className="button-total">
                                        <PayTotal  className="pay-total"  onClick={() => handleChangeAddress()} style={{cursor:'pointer'}}>
                                            Thay đổi
                                        </PayTotal>
                                    </ButtonTotal>
                                </div>
                                <div className="cart__total" style={{border:'1px solid #eee',margin:'20px 0'}}>
                                    
                                    <CategoryTotal className="category-total">
                                        Tổng tiền
                                        <b className="total-cate" id="total-cate">{convertPrice(totalPriceMemo)}₫</b>
                                    </CategoryTotal>

                                    <ButtonTotal className="button-total" >
                                        <PayTotal  className="pay-total" onClick={() => handleAddOrder()}  style={{cursor:'pointer'}}>
                                            Đặt hàng
                                        </PayTotal>
                                    </ButtonTotal>

                                </div>

                                

                            </nav>
                        </Col>
                        
                    </div>

                    
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

export default PaymentPage
