import { Col} from 'antd'
import React from 'react'
import { MenuHeader } from './style'

const DefaultMenu = () => {
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
                <div style={{padding:'20px',borderRight:'1px solid #000'}}>
                    SHOP
                </div>
                
            </Col>
            <Col  span={6}>
                <div style={{padding:'20px',borderRight:'1px solid #000'}}>COLECTION</div>
                
            </Col>
            <Col  span={6}>
                <div style={{padding:'20px',borderRight:'1px solid #000'}}>STYLING</div>
                
            </Col>
            <Col  span={6}>
                <div style={{padding:'20px'}}>OUTLET</div>
                
            </Col>
        </MenuHeader>

        
    </div>
  )
}

export default DefaultMenu
