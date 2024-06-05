import { Input } from 'antd'
import React from 'react'

const InputComponent = ({placeholder, ...rests}) => {
  return (
    <Input  
        placeholder={placeholder}
        {...rests}
    />
  )
}

export default InputComponent
