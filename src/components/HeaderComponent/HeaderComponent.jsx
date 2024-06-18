import { Badge, Col } from 'antd'
import React, { useState } from 'react'
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
    //Ẩn hiện menu
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    // Ẩn hiện search
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };


    // 
    return (
        <div>
            <WrapperHeader>
                <Col span={6} style={{ position:'relative' }}  onClick={toggleMenuVisibility}>
                    
                    <MenuOutlined style={{ fontSize: '1.5rem' , padding:'0px 15px',cursor: 'pointer'}}/>
                    {isMenuVisible && (

                        <DefaultMenu />
                    )}
                   
                </Col>
                <Col span={12}>
                    <WrapperHeaderLogo>KACHING</WrapperHeaderLogo>
                </Col>
                <Col span={6}>
                    <WrapperHeaderSSU>
                        <div style={{ position:'relative',cursor: 'pointer'}} onClick={toggleSearchVisibility}>
                            <SearchOutlined style={{ fontSize: '2rem' , padding:'0px 15px' }}/>
                            {isSearchVisible && (
                                <ButtonInputSearch placeholder="Tìm kiếm...." />
                            )}    
                        </div>

                        <div style={{ fontSize: '2rem' , padding:'0px 15px',cursor: 'pointer'}}>
                            <Badge count={2} size="small">

                                <ShoppingOutlined style={{ fontSize: '2rem' }}/>
                            </Badge>
                        </div>

                        <div style={{ cursor: 'pointer'}}>

                            <UserOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                        </div>
                        
                        
                    </WrapperHeaderSSU>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent