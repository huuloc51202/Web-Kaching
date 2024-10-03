import React, {  useState } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import { Pagination, Row} from 'antd'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/PoductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebouce'
import Loading from '../../components/LoadingComponent/Loading'

const ProductsPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct,  500)
    const [limit,setLimit] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)
  
    const fetchProductAll = async (context) =>{
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProduct(search,limit)
      
      return res;
    }
  
    const {isLoading, data: products} = useQuery({
      queryKey: ['products',limit, currentPage,searchDebounce],
      queryFn: fetchProductAll,
      retry: 3,
      retryDelay: 1000,
    })

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  
    
    return (
      <div style={{marginTop:'68px'}}>
        <NavBarComponent />
        <Loading isPending={isLoading}>
  
          <Row style={{display:'flex', flexFlow:'row wrap', minWidth:'0'}}>
            {products?.data?.map((product) => {
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
            
            {/* <CardComponent arrImages={[prod1, juicypink1]} /> */}
          </Row>
        </Loading>
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={products?.total}
          onChange={handlePageChange}
          style={{ textAlign: 'center', padding: '20px 0' }}
        />
      </div>
    )
  }

export default ProductsPage