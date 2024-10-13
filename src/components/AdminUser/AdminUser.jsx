import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Image, Space } from 'antd'
import { WrapperHeader, WrapperUploadFile } from './style'
import {DeleteOutlined,EditOutlined,SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { getBase64 } from '../../utils'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import * as message from '../Message/Message'
import * as UserService from '../../services/UserService'
import Loading from '../LoadingComponent/Loading'

const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const searchInput = useRef(null);//tìm kiếm

    const user = useSelector((state) => state?.user)


    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        address: '',
        avatar: '',
    })

    const [form] = Form.useForm();

    

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log('data',data)
            const {
                id,
                token,
                ...rests
                
            } = data
            const res = UserService.updateUser(
                id,
                {...rests},
                token,
            )
            return res
        },

    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            console.log('data',data)
            const {
                id,
                token,
                
            } = data
            const res = UserService.deleteUser(
                id,
                token,
                
            )
            return res
        },

    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const {
                token,
                ids
                
            } = data
            const res = UserService.deleteManyUser(
                ids,
                token,
                
            )
            return res
        },

    )

    const handleDeleteManyUsers = (ids) => {
        mutationDeletedMany.mutate({ids: ids, token: user?.access_token}, {
            onSettled: () => {
                queryUser.refetch()
            }
        } )
    }

    const getAllUsers = async () => {
        const res = await UserService.getAllUser(user?.access_token)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if(res?.data){
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                address: res?.data?.address,
                isAdmin: res?.data?.isAdmin,
                avatar: res?.data?.avatar,
            })
        }
        
    }

    useEffect(() =>  {
        form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    useEffect(() =>{
        if(rowSelected && isOpenDrawer){
            fetchGetDetailsUser(rowSelected)
        }
    },[rowSelected,isOpenDrawer])

    const handleDetailsUser = () => {
        
        setIsOpenDrawer(true)
    }

    

    
    const {data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const {data: dataDelete, isSuccess: isSuccessDelete, isError: isErrorDelete} = mutationDeleted
    const {data: dataDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany} = mutationDeletedMany
    const queryUser = useQuery({queryKey: ['users'],queryFn:getAllUsers })
    const {isLoading,data : users} = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{fontSize:'25px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{fontSize:'25px', cursor:'pointer'}} onClick={handleDetailsUser}/>
            </div>
        )
    }

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
            dataIndex: 'name',
            sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a,b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                { text: 'True', value: true },
                { text: 'False', value: false },
            ],
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
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
      return {...user, key: user._id, isAdmin: user?.isAdmin ? 'TRUE' : 'FALSE'}
      
    })
    

    

    useEffect(() => {
        if(isSuccessUpdated &&  dataUpdated?.status === 'OK'){
            message.success()
            handleCloseDrawer()
        }else if(isErrorUpdated){
            message.error()
        }
    }, [isSuccessUpdated,isErrorUpdated]) 

    useEffect(() => {
        if(isSuccessDelete &&  dataDelete?.status === 'OK'){
            message.success()
            handleCancelDelete()
        }else if(isErrorDelete){
            message.error()
        }
    }, [isSuccessDelete,isErrorDelete]) 

    useEffect(() => {
        if(isSuccessDeleteMany &&  dataDeleteMany?.status === 'OK'){
            message.success()
        }else if(isErrorDeleteMany){
            message.error()
        }
    }, [isSuccessDeleteMany,isErrorDeleteMany]) 

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            address: '',
            
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteUser = () => {
        mutationDeleted.mutate({id: rowSelected, token: user?.access_token}, {
            onSettled: () => {
                queryUser.refetch()
            }
        } )
    }

    


    const onUpdateUser = () =>{
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token,  ...stateUserDetails},{
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }


    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatarChangeDetails = async ({ fileList }) => {
        if (!fileList.length) {
            return; // No file to process
        }
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })
        
        
    }

    
    return (
        <div>
            <WrapperHeader>Quản lí người dùng</WrapperHeader>
            
            <div style={{ marginTop: '20px', paddingLeft: '15px' }}>
                <Loading isPending={isLoading}>

                    <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id)
                                }
                            };
                        }}
                    />
                </Loading>
            </div>
            
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onCancel={handleCloseDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
                <Form
                    name="basic1"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Please input user name!' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email người dùng"
                        name="email"
                        rules={[{ required: true, message: 'Please input user email!' }]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <WrapperUploadFile 
                            onChange={handleAvatarChangeDetails} 
                            maxCount={3} 
                            listType="picture-card" 
                            
                        >
                            <Button>Upload</Button>
                            
                            {stateUserDetails?.avatar && (
                                <Image src={stateUserDetails?.avatar} 
                                    wrapperStyle={{ display: 'none' }}
                                    
                                    
                                />
                            )}
                            
                        </WrapperUploadFile>
                    </Form.Item>
                    

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>

                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent forceRender title="Xoá người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}  >
                <div>Bạn có chắc xoá người dùng này không?</div>
            </ModalComponent>
        </div>
    )
}

export default AdminUser
