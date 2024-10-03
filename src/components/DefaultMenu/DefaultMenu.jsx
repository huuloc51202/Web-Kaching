import { Col} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuHeader } from './style'
import * as ProductService from '../../services/PoductService'
import TypeProduct from '../TypeProduct/TypeProduct'

const DefaultMenu = () => {
    const navigate = useNavigate()
    const handleNavigateAll = () => {
        navigate('/products')
    }

    const [typeProducts,setTypeProducts] = useState([])

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK'){
            setTypeProducts(res?.data)
        }
        
    }

    useEffect(() => {
        fetchAllTypeProduct()
    },[])

    return (
        <div >
            <MenuHeader style={{
                position: 'absolute',
                maxWidth: '100%',
                top: '39px',
                left: '-16.3px' , 
                textAlign:'center', 
                // display:'none', 
                zIndex:'999',
                backgroundColor: '#fff'
                }}>
                <Col  xs={24} sm={24} md={24}>
                    <div onClick={handleNavigateAll} style={{padding:'20px',borderRight:'1px solid #000',borderBottom:'1px solid #000',cursor:'pointer'}}>
                        All
                    </div>
                    
                </Col>
                {typeProducts.map((item) => {
                    return(
                        <Col   xs={24} sm={24} md={24}>
                            <TypeProduct name={item} key={item}/>
                        </Col>
                    )
                })}
                

                {/* <Col  span={6}>
                    <div style={{padding:'20px',borderRight:'1px solid #000',cursor:'pointer'}}>TEES</div>
                    
                </Col>
                <Col  span={6}>
                    <div style={{padding:'20px',borderRight:'1px solid #000',cursor:'pointer'}}>SHORTS</div>
                    
                </Col>
                <Col  span={6}>
                    <div style={{padding:'20px',cursor:'pointer'}}>PANTS</div>
                    
                </Col> */}
            </MenuHeader>

            
        </div>
    )
}

export default DefaultMenu
