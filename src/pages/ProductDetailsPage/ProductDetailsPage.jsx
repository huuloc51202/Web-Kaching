import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/PoductDetailsComponent/PoductDetailsComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  return (
    <div style={{marginTop:'60px'}}>
      <ProductDetailsComponent idProduct={id}/>
    </div>
  )
}

export default ProductDetailsPage
