import { Input } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

const NavSearch = () => {
  return (
    <div className="nav-search-input w-full max-w-xl">
      <Input placeholder="Search..." prefix={<SearchOutlined className="mr-0" />} />
    </div>
  )
}

export default NavSearch
