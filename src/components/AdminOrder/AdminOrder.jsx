import React, { useRef} from 'react'
import { Button, Space } from 'antd'
import { WrapperHeader } from './style'
import {SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import * as OrderService from '../../services/OrderService'
import Loading from '../LoadingComponent/Loading'
import PiechartComponeent from './Piechart'

const AdminOrder = () => {
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

 

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({queryKey: ['orders'],queryFn:getAllOrder })
    const {isLoading, data : orders} = queryOrder
    
    // Tìm kiếm

    const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex,
    ) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys , confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            
            
            
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        // ) : (
        //     text
        // ),
    });
    //  hết  tìm kiếm

    const columns = [
        {
            title: 'Name',
            dataIndex: 'userName',
            sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a,b) => a.phone - b.phone,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a,b) => a.address - b.address,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'City',
            dataIndex: 'city',
            sorter: (a,b) => a.city - b.city,
            ...getColumnSearchProps('city'),
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            sorter: (a,b) => a.productName - b.productName,
            ...getColumnSearchProps('productName'),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Paymenthod',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Order Date',
            dataIndex: 'createdAt',
        },
        
    ];

    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        return {...order, 
            key: order._id, 
            totalPrice: order.totalPrice, 
            createdAt: order.createdAt, 
            paymentMethod: order?.paymentMethod,
            userName: order?.shippingAddress?.fullName, 
            phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address,
            city: order?.shippingAddress?.city,
            productName: order?.orderItems?.map(item => `${item.name} (Size: ${item.size}, Số lượng: ${item.amount})`).join(', '),
            isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',

        }
        
    })
    
    
    return (
        <div>
            <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
            <div style={{width:'200px', height:'200px'}}>
                <PiechartComponeent data={orders?.data}/>

            </div>
            <div style={{ marginTop: '20px', paddingLeft: '15px' }}>
                <Loading isPending={isLoading}>

                    <TableComponent  columns={columns} data={dataTable} />
                </Loading>
            </div>
            
        </div>
    )
}

export default AdminOrder
