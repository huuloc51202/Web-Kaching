import { Input } from 'antd'
import React, { useState } from 'react'

const InputForms = ([props]) => {
    const [valueInput, setValueInput] = useState('')
     
    return (
        <Input placeholder="Nhap Email" valueInput={valueInput} />
    )
}

export default InputForms
