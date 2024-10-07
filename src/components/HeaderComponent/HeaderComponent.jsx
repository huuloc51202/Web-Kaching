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
import { searchProduct } from '../../redux/slides/productSlide';
import 'bootstrap/dist/css/bootstrap.min.css';


const HeaderComponent = ({isHiddenMenu = false, isHiddenSearch = false, isHiddenCart = false}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    console.log('user',user)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup,setIsOpenPopup] = useState(false)
    const order = useSelector((state) => state.order)

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
        <div >
          <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin cá nhân</WrapperContentPopup>
          {user?.isAdmin && (
            <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
          )}
          <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
          <WrapperContentPopup onClick={() => handleClickNavigate('logout')}>Đăng xuất</WrapperContentPopup>
        </div>
    )
      
    const handleClickNavigate = (type)  => {
    if(type === 'profile'){
        navigate('/profile-user');
    } else if(type === 'admin'){
        navigate('/system/admin');
    } else if(type === 'my-order'){
        navigate('/my-order',{ state: {
            id: user?.id,
            token: user?.access_token
        }});
            
        
    } else {
        handleLogout();
    }
    setIsOpenPopup(false);
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


    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
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
                                        onChange={onSearch}
                                    />
                                )}    
                            </div>

                        )}

                        {!isHiddenCart && (

                            <div onClick={() => navigate('/cart')} style={{ fontSize: '2rem' , padding:'0px 15px',cursor: 'pointer'}}>
                                <Badge count={order?.orderItems?.length} size="small">

                                    <ShoppingOutlined style={{ fontSize: '2rem' }}/>
                                </Badge>
                            </div>
                        )}
                        
                        
                        <>  

                            
                            
                            
                            {user?.access_token ?(
                                <>
                                    
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        {userAvatar ? (
                                            <img src={userAvatar} alt="avatar"  onClick={() => setIsOpenPopup((prev) => !prev)} style={{
                                                height:'25px',width:'25px', borderRadius:'50%',objectFit:'cover',cursor: 'pointer'
                                            }}/>
                                        ) : (

                                            <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>
                                                {userName?.length ? userName : user?.email}
                                            </div>
                                        )}
                                        
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin}  style={{ cursor: 'pointer'}}>
                                    
                                    <UserOutlined style={{ fontSize: '2rem' , padding:'0px '}}/>
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