import { Spin } from 'antd'
import React from 'react'

const Loading = ({children, isPending, delay = 200 }) => {
    return (
        <div>
            <Spin spinning={isPending} delay={500}>
                {children}
            </Spin>
        </div>
    )
}

export default Loading
