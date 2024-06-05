import { Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderLogo, WrapperHeaderSSU } from './style'
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import DefaultMenu from '../DefaultMenu/DefaultMenu';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6} style={{ position:'relative' }}>
                    <MenuOutlined style={{ fontSize: '1.5rem' , padding:'0px 15px'}} />
                    <DefaultMenu  />
                </Col>
                <Col span={12}>
                    <WrapperHeaderLogo>KACHING</WrapperHeaderLogo>
                </Col>
                <Col span={6}>
                    <WrapperHeaderSSU>
                        <div style={{ position:'relative'}}>
                            <SearchOutlined style={{ fontSize: '2rem' , padding:'0px 15px' }}/>
                            <ButtonInputSearch placeholder="Tìm kiếm...." />
                        </div>

                        <div >

                            <ShoppingOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                        </div>

                        <div >

                            <UserOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                        </div>
                        
                        
                    </WrapperHeaderSSU>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent