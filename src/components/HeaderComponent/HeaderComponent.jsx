import { Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderLogo, WrapperHeaderSSU } from './style'
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <MenuOutlined style={{ fontSize: '1.5rem' , padding:'0px 15px'}} />
                </Col>
                <Col span={12}>
                    <WrapperHeaderLogo>KACHING</WrapperHeaderLogo>
                </Col>
                <Col span={6}>
                    <WrapperHeaderSSU>

                        <SearchOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                        <ShoppingOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                        <UserOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                    </WrapperHeaderSSU>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent