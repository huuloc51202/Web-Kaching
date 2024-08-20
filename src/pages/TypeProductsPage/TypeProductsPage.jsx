import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import prod1 from '../../assets/img/product/prod1.jpeg'
import prod2 from '../../assets/img/product/prod2.jpeg'
import { Pagination} from 'antd'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/PoductService'


const TypeProductsPage = () => {
  const fetchProductAll = async () =>{
    const res = await ProductService.getAllProduct()
    console.log('res', res)
    return res;
  }
  const {isLoading, data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })
  console.log('data', products)
  return (
    <div style={{marginTop:'68px'}}>
      <NavBarComponent />
      <div style={{display:'flex', flexFlow:'row wrap', minWidth:'0'}}>
        {products?.data?.map((product) => {
          return (
            <CardComponent arrImages={[prod1, prod2]}
              key={product._id} 
              countInStock={product.countInStock} 
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              type={product.type}
              soldOut={product.soldOut}
            />
          )
        })}
        
        {/* <CardComponent arrImages={[prod1, prod2]} /> */}
      </div>
      <Pagination defaultCurrent={1} total={50} style={{textAlign:'center',padding:'20px 0'}}/>
    </div>
  )
}

export default TypeProductsPage
