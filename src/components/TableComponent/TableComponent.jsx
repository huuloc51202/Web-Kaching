import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const { selectionType = 'checkbox' ,data:dataSource = [] , columns = [], handleDeleteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const [pagination, setPagination] = useState({
    current: 1, 
    pageSize: 5, 
    total: dataSource.length,
  });
  const newColumnExport = useMemo(() => {
    const arr =  columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  },[columns])
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
    handleDeleteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    
  };

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
      <button onClick={exportExcel}> Export excel </button>
      <Table
        id='table-xls'
        rowSelection={{
        type: selectionType,
        ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination} 
        onChange={handleTableChange} 
        {...props}
        
      />
      
    </>
    
      
  )
}

export default TableComponent
