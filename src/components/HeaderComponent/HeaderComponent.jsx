import { Badge,  Col, Popover } from 'antd'
import React, { useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderLogo, WrapperHeaderSSU } from './style'
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import DefaultMenu from '../DefaultMenu/DefaultMenu';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide';

const HeaderComponent = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const handleLogout = async () => {
        await UserService.logoutUser()
        localStorage.removeItem('access_token')
        dispatch(resetUser())
        navigate('/sign-in')
    }

    const content = (
        <div>
          <WrapperContentPopup onClick={() => {navigate('/profile-user')}}>Thông tin cá nhân</WrapperContentPopup>
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    )

    console.log('user', user)
    const handleNavigateCart = () => {
        navigate('/cart')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }


    //Ẩn hiện menu
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    // Ẩn hiện search
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearchVisibility = () => {
        setIsSearchVisible(prevState => !prevState);
    };

    const handleWrapperClick = (e) => {
       
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
            return;
        }
        toggleSearchVisibility();
    };

    const handleSearchClick = (e) => {
       
        e.stopPropagation();
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
                <Col onClick={handleNavigateHome} span={12}>
                    <WrapperHeaderLogo>KACHING</WrapperHeaderLogo>
                </Col>
                <Col span={6}>
                    <WrapperHeaderSSU>
                        <div style={{ position:'relative',cursor: 'pointer'}} onClick={handleWrapperClick} >
                            <SearchOutlined style={{ fontSize: '2rem' , padding:'0px 15px' }}/>
                            {isSearchVisible && (
                                <ButtonInputSearch 
                                    placeholder="Tìm kiếm...."
                                    onClick={handleSearchClick}
                                    onFocus={handleSearchClick}
                                />
                            )}    
                        </div>

                        <div onClick={handleNavigateCart} style={{ fontSize: '2rem' , padding:'0px 15px',cursor: 'pointer'}}>
                            <Badge count={2} size="small">

                                <ShoppingOutlined style={{ fontSize: '2rem' }}/>
                            </Badge>
                        </div>
                        
                        

                        {user?.access_token ?(
                            <>
                                
                                <Popover content={content} trigger="click">
                                    <div style={{ cursor: 'pointer'}}>{user?.name?.length ? user?.name : user?.email}</div>
                                </Popover>
                            </>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer'}}>
                                
                                <UserOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                            </div>

                        )}
                        
                        
                    </WrapperHeaderSSU>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent