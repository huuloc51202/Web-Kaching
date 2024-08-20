import React from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader } from './style'

const AdminOrder = () => {
    return (
        <div>
            <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
            
            <div style={{marginTop:'20px',paddingLeft:'15px'}}>
                
                <TableComponent />
            </div>
        </div>
    )
}

export default AdminOrder
