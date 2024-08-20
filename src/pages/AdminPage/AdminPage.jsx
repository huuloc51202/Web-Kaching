import { Menu } from 'antd'
import React, { useState } from 'react'
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';

const AdminPage = () => {
  const items = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'Người dùng',
      
    },
    {
      key: 'product',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
      
    },
    {
      key: 'order',
      icon: <SettingOutlined />,
      label: 'Đơn hàng',
      
    },
  ];


  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        
        return (
          <AdminUser />
        )
      case 'product':
      
        return (
          <AdminProduct />
        )
      case 'order':
      
        return (
          <AdminOrder />
        )
      
      default:
        return <></>
    }
  }

  const handleOnClick = ({key}) => {
    setKeySelected(key)
  }
  console.log('keySelected', keySelected)
  return (
    <>
      <HeaderComponent isHiddenMenu isHiddenSearch isHiddenCart/>
      <div style={{display:'flex' , marginTop:'60px'}}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            height:'100vh',
            boxShadow:'1px 1px 2px #ccc'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{flex:'1' , padding:'15px'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage
