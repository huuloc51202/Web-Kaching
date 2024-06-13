import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import prod1 from '../../assets/img/product/prod1.jpeg'
import prod2 from '../../assets/img/product/prod2.jpeg'

const ProductsPage = () => {
    return (
        <div style={{marginTop:'60px'}}>
            <NavBarComponent />
            <CardComponent arrImages={[prod1, prod2]}/>
        </div>
    )
}

export default ProductsPage