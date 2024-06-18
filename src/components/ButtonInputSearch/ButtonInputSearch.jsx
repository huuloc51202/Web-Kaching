
import React from 'react'
import {
    SearchOutlined
} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  
  const { placeholder, textButton , } = props
  return (
    <div style={{
        display:'flex' , 
        border:'1px solid #000', 
        position: 'absolute',
        width: '1680px',
        top: '40.5px',
        right: '-115px' , 
        textAlign:'center', 
        zIndex:'999',
        backgroundColor: '#fff',
        // display:'none'
      }}>
      <ButtonComponent
        textButton = {textButton}
        
        icon={<SearchOutlined/>} 
        style={{ marginLeft:'30px', border:'#fff' }}
      />
      <InputComponent  placeholder={placeholder} style={{border:'none'}}/>
    </div>
  )
}

export default ButtonInputSearch
