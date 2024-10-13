import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Image,Select, Space} from 'antd'
import {PlusOutlined,DeleteOutlined,EditOutlined,SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader, WrapperUploadFile } from './style'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/PoductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect,setTypeSelect] = useState('')

    const searchInput = useRef(null);//tìm kiếm
    const inittial = () => ({
        name: '',
        image: [''],
        typeimage: '',
        type: '',
        price: '',
        countInStock: '',
        description: '',
        newType:''
    })

    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState(inittial())

    const [stateProductDetails, setStateProductDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const {
                name,
                image,
                typeimage,
                type,
                price,
                countInStock: countInStock,
                description,
                
                
            } = data
            const res = ProductService.createProduct({
                name,
                image,
                typeimage,
                type,
                price,
                description,
                countInStock,
                
            })
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests
                
            } = data
            const res = ProductService.updateProduct(
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
            const res = ProductService.deleteProduct(
                id,
                token,
                
            )
            return res
        },

    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            console.log('data',data)
            const {
                token,
                ...ids
                
            } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token,
                
            )
            return res
        },

    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if(res?.data){
            setStateProductDetails({
                name: res?.data?.name,
                image: res?.data?.image,
                typeimage: res?.data?.typeimage,
                type: res?.data?.type,
                price: res?.data?.price,
                countInStock: res?.data?.countInStock,
                description: res?.data?.description,
                discount: res?.data?.discount,
            })
        }
        
    }

    useEffect(() =>  {
        if(!isModalOpen){

            form.setFieldsValue(stateProductDetails)
        }else{
            form.setFieldsValue(inittial())
        }
    },[form, stateProductDetails, isModalOpen])

    useEffect(() =>{
        if(rowSelected && isOpenDrawer){
            fetchGetDetailsProduct(rowSelected)
        }
    },[rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ids: ids, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        } )
    }


    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
        
    }


    const {data, isSuccess, isError} = mutation
    const {data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const {data: dataDelete, isSuccess: isSuccessDelete, isError: isErrorDelete} = mutationDeleted
    const {data: dataDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany} = mutationDeletedMany
    const queryProduct = useQuery({queryKey: ['products'],queryFn:getAllProducts })
    const typeProduct = useQuery({queryKey: ['type-product'],queryFn:fetchAllTypeProduct })
    const {isLoading,data : products} = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{fontSize:'25px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{fontSize:'25px', cursor:'pointer'}} onClick={handleDetailsProduct}/>
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
            title: 'Price',
            dataIndex: 'price',
            sorter: (a,b) => a.price - b.price,
            filters: [
                { text: 'Giá lớn hơn hoặc bằng 250000', value: '>=' },
                { text: 'Giá nhỏ hơn hoặc bằng 250000', value: '<=' },
            ],
            onFilter: (value, record) => {
                if(value === '>='){
                    return record.price >= 250000
                }
                return record.price <= 250000
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a,b) => a.type - b.type,
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Count Instock',
            dataIndex: 'countInStock',
            sorter: (a,b) => a.countInStock - b.countInStock,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
      return {...product, key: product._id}
      
    })
    

    useEffect(() => {
        if(isSuccess &&  data?.status === 'OK'){
            message.success()
            handleCancel()
        }else if(isError){
            message.error()
        }
    }, [isSuccess,isError]) 

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
        setStateProductDetails({
            name: '',
            image: '',
            typeimage: '',
            type: '',
            price: '',
            countInStock: '',
            description: '',
            discount:'',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({id: rowSelected, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        } )
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            image: '',
            typeimage: '',
            type: '',
            price: '',
            countInStock: '',
            description: '',
            
        })
        form.resetFields()
    }


    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            image: stateProduct.image,
            typeimage: stateProduct.typeimage,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            price: stateProduct.price,
            countInStock: stateProduct.countInStock,
            description: stateProduct.description,
        }
        console.log('Param', params);
        mutation.mutate(params,{
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const onUpdateProduct = () =>{
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token,  ...stateProductDetails},{
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
        
    };

    const handleSelectChangeDetails = (value) => {
        setStateProductDetails({
            ...stateProductDetails,
            type: value
        });
    };


    

    // Hàm xử lý khi thay đổi hình ảnh
    const handleAvatarChange = async ({ fileList }) => {
        if (!fileList.length) {
            return; // Không có file nào được tải lên
        }

        // Duyệt qua tất cả các tệp trong fileList và tạo preview
        const previews = await Promise.all(
            fileList.map(async (file) => {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                return file.preview; // Trả về base64 của từng ảnh
            })
        );

        // Cập nhật state để chứa tất cả các hình ảnh
        setStateProduct({
            ...stateProduct,
            image: previews, // Lưu tất cả các ảnh base64 vào state
        });
    };

    

    

    const handleTypeProdChange = async ({ fileList }) => {
        if (!fileList.length) {
            return; // No file to process
        }
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            typeimage: file.preview
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
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
        
        
    }

    const handleTypeProdChangeDetails = async ({ fileList }) => {
        if (!fileList.length) {
            return; // No file to process
        }
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            typeimage: file.preview
        })
        
        
    }

    return (
        <div>
            <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', border: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                ><PlusOutlined /></Button>

            </div>
            <div style={{ marginTop: '20px', paddingLeft: '15px' }}>
                <Loading isPending={isLoading}>

                    <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id)
                                }
                            };
                        }}
                    />
                </Loading>
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ style: { display: 'none' } }} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>

                    {/* <Form.Item 
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type!' }]}
                    >
                        <Select value={stateProduct.type} onChange={handleSelectChange} name="type">
                            <Select.Option value="Tees" >Tees</Select.Option>
                            <Select.Option value="Shorts" >Shorts</Select.Option>
                            <Select.Option value="Pants" >Pants</Select.Option>
                        </Select>
                    </Form.Item> */}


                    <Form.Item 
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type!' }]}
                    >
                        
                        <Select
                            placeholder="Select a person"
                            onChange={handleSelectChange}
                            name="type"
                            value={stateProduct.type}
                            options={renderOptions(typeProduct?.data?.data)}
                        />
                        
                    </Form.Item>
                    {stateProduct.type === 'add_type' && (

                        <Form.Item 
                            label="Thêm loại sản phẩm"
                            name="newType"
                            rules={[{ required: true, message: 'Please input product type!' }]}
                        >
                            
                            <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                           
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Giá sản phẩm"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh loại sản phẩm"
                        name="typeimage"
                        rules={[{ required: true, message: 'Please input your type product image !' }]}
                    >
                        <WrapperUploadFile 
                            onChange={handleTypeProdChange} 
                            maxCount={1} 
                            listType="picture-card" 
                            
                        >
                            <Button>Upload</Button>
                            
                            {stateProduct?.typeimage && (
                                <Image src={stateProduct?.typeimage} 
                                    wrapperStyle={{ display: 'none' }}
                                    
                                    
                                />
                            )}
                            
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng sản phẩm"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count instock!' }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <WrapperUploadFile 
                            onChange={handleAvatarChange} 
                            maxCount={3} 
                            listType="picture-card" 
                            
                        >
                            <Button>Upload</Button>
                            
                            {stateProduct?.image && (
                                <Image src={stateProduct?.image} 
                                    wrapperStyle={{ display: 'none' }}
                                    
                                    
                                />
                            )}
                            
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onCancel={handleCloseDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
                <Form
                    name="basic1"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item 
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type!' }]}
                    >
                        <Select
                            placeholder="Select a person"
                            onChange={handleSelectChangeDetails}
                            name="type"
                            value={stateProductDetails.type}
                            options={renderOptions(typeProduct?.data?.data)}
                        />
                    </Form.Item>
                    {stateProductDetails.type === 'add_type' && (

                        <Form.Item 
                            label="Thêm loại sản phẩm"
                            name="newType"
                            rules={[{ required: true, message: 'Please input product type!' }]}
                        >
                            
                            <InputComponent value={stateProductDetails.newType} onChange={handleOnChangeDetails} name="newType" />
                        
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Giá sản phẩm"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh loại sản phẩm"
                        name="typeimage"
                        rules={[{ required: true, message: 'Please input your  type product image!' }]}
                    >
                        <WrapperUploadFile 
                            onChange={handleTypeProdChangeDetails} 
                            maxCount={1} 
                            listType="picture-card" 
                            
                        >
                            <Button>Upload</Button>
                            
                            {stateProductDetails?.typeimage && (
                                <Image src={stateProductDetails?.typeimage} 
                                    wrapperStyle={{ display: 'none' }}
                                    
                                    
                                />
                            )}
                            
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng sản phẩm"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count instock!' }]}
                    >
                        <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label=" Giảm giá sản phẩm"
                        name="discount"
                        rules={[{  message: 'Please input your discount  of product!' }]}
                    >
                        <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <WrapperUploadFile 
                            onChange={handleAvatarChangeDetails} 
                            maxCount={3} 
                            listType="picture-card" 
                            
                        >
                            <Button>Upload</Button>
                            
                            {stateProductDetails?.image && (
                                <Image src={stateProductDetails?.image} 
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
            <ModalComponent  title="Xoá sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}  >
                <div>Bạn có chắc xoá sản phẩm này không?</div>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct
