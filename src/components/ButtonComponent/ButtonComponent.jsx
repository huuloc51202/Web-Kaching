import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({styleTextButton,textButton, ...rests}) => {
  return (
    <Button  
        // icon={<SearchOutlined />}
        
        
        {...rests}
    ><span style={styleTextButton}>{textButton}</span></Button>
  )
}

export default ButtonComponent
