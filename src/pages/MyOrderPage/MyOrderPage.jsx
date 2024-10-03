import {  Col, Modal } from 'antd'
import React, { useEffect } from 'react'
import {  ButtonTotal, CategoryTotal, Fieldset,PayTotal,SectionContent,TableHeading,TableShare,ThumbCartH4,ThumbCartSpan } from './style'
import * as OrderService from '../../services/OrderService'
import { Mutation, useQuery } from '@tanstack/react-query'
import Loading from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'

const MyOrderPage = () => {
    const location  = useLocation()
    const {state} = location
    const navigate = useNavigate()
    const { confirm } = Modal;
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderbyUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder =useQuery({
        queryKey: ['users'],
        queryFn: fetchMyOrder, 
        enabled: !!state?.id && !!state?.token,
    });
    const {isLoading, data} = queryOrder
    console.log('data',data)

    const handleDetailsOrder = (id) => {
        navigate(`/detailsOrder/${id}`,{
            state:{
                token: state?.token
            }
        })
    }

    const mutation = useMutationHooks(
        async (data) => {
            const { id, token, orderItems} = data
            const res = await OrderService.cancelOrder(id, token, orderItems)
            return res
        }
    )

    const showConfirm = (order) => {
        confirm({
            title: 'Bạn có chắc chắn muốn hủy đơn hàng?',
            content: 'Hành động này không thể hoàn tác sau khi thực hiện.',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk() {
                mutation.mutate({id: order._id, token: state?.token , orderItems: order?.orderItems}, {
                    onSuccess: () => {
                        queryOrder.refetch();
                    }
                });
            },
            onCancel() {
                console.log('Huỷ thao tác');
            },
        });
    };
    
    const handleCancelOrder = (order) => {
        showConfirm(order);
    };

    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation

    useEffect(() => {
        if(isSuccessCancel && dataCancel?.status === 'OK'){
            message.success('Huỷ đơn hàng thành công')
        }else if(isErrorCancel){
            message.error('Huỷ đơn hàng thất bại')
        }
    },[isSuccessCancel,isErrorCancel])
    

    const renderProduct = (data) => {
        
        return data?.map((order) => {
            return <TableHeading className="table-heading" key={order._id}>
                        <TableShare className="table-share table-product" style={{width: '392px'}}>
                            <a  style={{textDecoration:'none'}}>
                                <div className="thumb-cart" style={{display:'flex'}}>
                                    <img src={order.image} alt="" style={{width : '150px' ,marginRight: '15px'}}/>
                                    <div className="thumb-cart__item" style={{width : '125px' }}>
                                        <ThumbCartH4 > {order.name} </ThumbCartH4 >
                                        <ThumbCartSpan className="variant-title" >{order.size} </ThumbCartSpan>
                                        <ThumbCartSpan>{convertPrice(order.price)}₫</ThumbCartSpan><br></br>
                                        {order?.discount > 0 && <ThumbCartSpan>-{order?.discount}%</ThumbCartSpan>}
                                    </div>
                                </div>
                            </a>
                        </TableShare>
                        <TableShare className="table-share table-qty" style={{width: '212px'}}>
                            <div className="qty-number">
                                Số lượng: {order.amount}
                                
                    
                            
                            </div>
                        </TableShare>
                    </TableHeading>
        })
    }

    

    return (
        <Loading isPending={isLoading}>

            <div className="grid wide" style={{width:'100%', maxWidth:'1021px',margin:'80px auto 30px'}}>
                
                <Col className="col" span={24}>
                    <div className="new-product" > 
                        
                        
                        {/* <!-- body --> */}
                        <div className="product-cart" style={{display:'flex'}}>  
                            
                            <Col span={24} style={{paddingLeft:'0px'}}>
                                <div className="table-cart" >
                                    <div className="table__product" style={{marginBottom: '20px'}}>
                                        <div className="step-sections ">
                                            
                                                
                                            
                                            <div className="section" style={{marginLeft:'35px'}}>
                                                <div className="section-header">
                                                    <h2 className="section-title" style={{paddingBottom:'10px',borderBottom:'1px solid #000',margin:'0',textAlign:'center'}}>Đơn hàng của tôi</h2>
                                                </div>

                                                <div className="section-content " >
                                                    
                                                    {data && data.length > 0 ? (
                                                        <Fieldset >
                                                            <p  style={{margin:'0 0 5px',textAlign:'center'}}>Cảm ơn các tình yêu đã mua hàng tại website , thấy tốt thì các tình yêu quay lại mua nhé :3 </p>
                                                            

                                                            <tbody style={{display:'flex',justifyContent:'center'}}>
                                                                <div id="pro-table" >
                                                                    {data?.map((order) => {
                                                                        
                                                                        return (
                                                                            <div style={{border: '1px solid #000',marginBottom:'15px'}}>
                                                                                {renderProduct(order?.orderItems)}
                                                                                
                                                                                <SectionContent className="section-content-column" >
                                                                                    <div>
                                                                                        
                                                                                        <p>Thanh toán : {orderContant.payment[order?.paymentMethod]}</p>
                                                                                        <p>Giao hàng : {`${order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</p>
                                                                                        <p>Tổng tiền: {convertPrice(order?.totalPrice)}₫</p> 
                                                                                    </div>   
                                                                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                                                                                        <PayTotal  className="pay-total"  onClick={() => handleCancelOrder(order)} style={{cursor:'pointer'}}>
                                                                                            Huỷ đơn hàng
                                                                                        </PayTotal>
                                                                                        <PayTotal  className="pay-total" onClick={() => handleDetailsOrder(order?._id)}  style={{cursor:'pointer'}}>
                                                                                            Chi tiết
                                                                                        </PayTotal>

                                                                                    </div>
                                                                                                        
                                                                                </SectionContent>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                
                                                            </tbody>
                                                            
                                                            {/* <div className="section-content-column">
                                                                
                                                                <p>Họ và tên : {data.shippingAddress.fullName}</p>
                                                                <p>Địa chỉ : {`${data.shippingAddress.address} ${data.shippingAddress.city}`}</p>
                                                                <p>Điện thoại: {data.shippingAddress.phone}</p>  
                                                            </div> */}
                                                            
                                                        </Fieldset>
                                                    ) : (
                                                        <div>Không có đơn hàng nào hết.</div>
                                                        
                                                    )}
                                                    
                                                    
                                                </div>

                                                

                                            
                                            </div>
                                                            
                                            
                                            
                                        </div>
                                    </div>
                                    
                                    
                                
                                </div>
                            </Col>
                        </div>

                        
                    </div>
                </Col>    
            </div>
        </Loading>
    )
}

export default MyOrderPage
