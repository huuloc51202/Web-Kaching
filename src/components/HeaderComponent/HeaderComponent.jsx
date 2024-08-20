import { Badge,  Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
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
import { updateUser, resetUser } from '../../redux/slides/userSlide';

const HeaderComponent = ({isHiddenMenu = false, isHiddenSearch = false, isHiddenCart = false}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])
    const handleNavigateLogin = () => {
        navigate('/sign-in')
        const newUser = {
            name: ''
            // other fields as needed
        };
        dispatch(updateUser(newUser)); 
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
          {user?.isAdmin && (

            <WrapperContentPopup onClick={() => {navigate('/system/admin')}}>Quản lí hệ thống</WrapperContentPopup>
          )}
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    )

    
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
            <WrapperHeader style={{justifyContent: isHiddenCart && isHiddenMenu && isHiddenSearch ? 'space-between' : 'unset'}}>
                {!isHiddenMenu && (
                    <Col span={6} style={{ position:'relative' }}  onClick={toggleMenuVisibility}>
                        
                        <MenuOutlined style={{ fontSize: '1.5rem' , padding:'0px 15px',cursor: 'pointer'}}/>
                        {isMenuVisible && (

                            <DefaultMenu />
                        )}
                    
                    </Col>

                )}
                <Col onClick={handleNavigateHome} span={12}>
                    <WrapperHeaderLogo>KACHING</WrapperHeaderLogo>
                </Col>
                <Col span={6}>
                    <WrapperHeaderSSU>
                        {!isHiddenSearch && (
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

                        )}

                        {!isHiddenCart && (

                            <div onClick={handleNavigateCart} style={{ fontSize: '2rem' , padding:'0px 15px',cursor: 'pointer'}}>
                                <Badge count={2} size="small">

                                    <ShoppingOutlined style={{ fontSize: '2rem' }}/>
                                </Badge>
                            </div>
                        )}
                        
                        
                        <>  
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height:'25px',width:'25px', borderRadius:'50%',objectFit:'cover'
                                }}/>
                            ) : (

                                <></>
                            )}
                            {user?.access_token ?(
                                <>
                                    
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer'}}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin}  style={{ cursor: 'pointer'}}>
                                    
                                    <UserOutlined style={{ fontSize: '2rem' , padding:'0px 15px'}}/>
                                </div>

                            )}
                        </>
                        
                        
                    </WrapperHeaderSSU>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent