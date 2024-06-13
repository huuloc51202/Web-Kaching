import React from 'react'
import { ArrangeTitle, CategoryActionsWrap, Contauner, FilterArrange, FilterArrangeA, LefttFilter } from './style'
import {
    DownOutlined,
} from '@ant-design/icons';
import './index.css';


const NavBarComponent = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case 'price':
                
                return options.map((option) => {
                    return (
                        <FilterArrangeA   className='filter-arrange-a' href="?show=new">{option}</FilterArrangeA>
                    )
                }) 
        
            default:
                return {}
        }
    }
  return (
    <CategoryActionsWrap>
        <Contauner >
            <LefttFilter className='leftt-filter'>
                <ArrangeTitle className='arrange-title'>Sắp xếp theo <DownOutlined /></ArrangeTitle>
                
                <FilterArrange className='filter-arrange'>
                    {renderContent('price', ['Mới nhất','Bán chạy','Giá tăng dần','Giá giảm dần','Theo bảng chữ cái A-Z','Theo bảng chữ cái Z-A'])}
                    
                </FilterArrange>
            </LefttFilter>
        </Contauner>
    </CategoryActionsWrap>
  )
}

export default NavBarComponent
