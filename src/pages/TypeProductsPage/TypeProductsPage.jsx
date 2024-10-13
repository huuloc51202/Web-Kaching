import { Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import { useDebounce } from '../../hooks/useDebouce'
import * as ProductService from '../../services/PoductService'


const TypeProductsPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct,  500)
  const {state} = useLocation()
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const [paginate, setPaginate] = useState({
    page:0,
    limit:10,
    total:1,
  })
  const fetchProductType = async (type, page, limit) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const res = await ProductService.getProductType(type, page, limit);
      if (res?.status === 'OK') {
        setProducts(res?.data); // Lấy dữ liệu sản phẩm
        setPaginate({ ...paginate, total: res?.totalPage }); // Cập nhật số trang
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error); // Log lỗi
    } finally {
      setLoading(false); // Kết thúc loading, dù thành công hay gặp lỗi
    }
  };


  useEffect(() => {
    if(state){
      fetchProductType(state,paginate.page, paginate.limit)
    }
    
  },[state])

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    fetchProductType(state, current - 1, pageSize); // Gọi lại API để lấy dữ liệu sản phẩm mới theo trang
  };

  
  return (
    <div style={{marginTop:'68px'}}  >
      <NavBarComponent />
      <Loading isPending={loading}>

        <Row style={{display:'flex', flexFlow:'row wrap', minWidth:'0'}}>
          {products?.filter((pro) => {
            if(searchDebounce === ''){
              return pro
            }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
              return pro
            }
          })?.map((product) => {
            return (
              <CardComponent 
                key={product._id} 
                countInStock={product.countInStock} 
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id} 
              />
            )
          })}
          
        </Row>
        <Pagination 
          defaultCurrent={paginate?.page + 1} 
          total={paginate?.total * paginate?.limit} // Tổng số sản phẩm để hiển thị đúng số trang
          onChange={onChange} 
          style={{textAlign:'center', padding:'20px 0'}} 
        />

      </Loading>
    </div>
  )
}

export default TypeProductsPage
