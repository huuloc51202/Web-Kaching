import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import prod1 from '../../assets/img/product/prod1.jpeg'
import prod2 from '../../assets/img/product/prod2.jpeg'
import { Pagination } from 'antd'


const TypeProductsPage = () => {
  return (
    <div style={{marginTop:'68px'}}>
      <NavBarComponent />
      <CardComponent arrImages={[prod1, prod2]}/>
      <Pagination defaultCurrent={1} total={50} style={{textAlign:'center',padding:'20px 0'}}/>
    </div>
  )
}

export default TypeProductsPage
