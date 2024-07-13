import { Col} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuHeader } from './style'

const DefaultMenu = () => {
    const navigate = useNavigate()
    const handleNavigateAll = () => {
        navigate('/type')
    }

    return (
        <div >
            <MenuHeader style={{
                position: 'absolute',
                width: '1665px',
                top: '39px',
                left: '-15px' , 
                textAlign:'center', 
                // display:'none', 
                zIndex:'999',
                backgroundColor: '#fff'
                }}>
                <Col  span={6}>
                    <div onClick={handleNavigateAll} style={{padding:'20px',borderRight:'1px solid #000',cursor:'pointer'}}>
                        ALL
                    </div>
                    
                </Col>
                <Col  span={6}>
                    <div style={{padding:'20px',borderRight:'1px solid #000',cursor:'pointer'}}>TEES</div>
                    
                </Col>
                <Col  span={6}>
                    <div style={{padding:'20px',borderRight:'1px solid #000',cursor:'pointer'}}>SHORTS</div>
                    
                </Col>
                <Col  span={6}>
                    <div style={{padding:'20px',cursor:'pointer'}}>PANTS</div>
                    
                </Col>
            </MenuHeader>

            
        </div>
    )
}

export default DefaultMenu
