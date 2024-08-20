import { Table } from 'antd';
import React, { useState } from 'react'

const TableComponent = (props) => {
  const { selectionType = 'checkbox' ,data = [] , columns = [] } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
      
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const handleDeleteAll = () => {

  }

  return (
    <>
      {rowSelectedKeys.length > 0 && (

        <div style={{
          background:'#000', 
          color:'#fff',
          fontWeight:'bold',
          padding:'10px',
          cursor:'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xoá tất cả 
        </div>
      )}
      <Table
        rowSelection={{
        type: selectionType,
        ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </>
   
      
  )
}

export default TableComponent
