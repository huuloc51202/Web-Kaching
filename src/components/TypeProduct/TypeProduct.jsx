import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({name}) => {
    const navigate = useNavigate()
  
    const handleNavigatetype = (type) =>  {
        navigate(`/product/${type.normalize("NFD").replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
    }
  
    return (
        <div onClick={() => handleNavigatetype(name)} style={{padding:'20px',borderRight:'1px solid #000',borderBottom:'1px solid #000',cursor:'pointer'}}>
            {name}
        </div>
    )
}

export default TypeProduct
