import { QuestionCircleFilled } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import flatMap from 'lodash/flatMap'
import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useLocation, useNavigate } from 'react-router-dom'

import pathToRegexp from 'path-to-regexp'

import { navigationTree } from '@/router/Routers'

const { Sider } = Layout

const IconMap = {}

export const SIDE_NAV_WIDTH = 250

const SideNav = ({ navCollapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const rootKeys = [location.pathname]
  const [openKeys, setOpenKeys] = useState(rootKeys)
  const menus = flatMap(navigationTree, (item) => (item.name ? item : []))

  const onOpenChange = (items) => {
    setOpenKeys(items)
  }

  const renderIcon = (item) => {
    if (item?.icon && typeof item?.icon === 'string' && IconMap?.[item.icon]) {
      return IconMap?.[item.icon]
    }
    if (item?.icon && typeof item?.icon !== 'string') {
      return item.icon
    }
    return <QuestionCircleFilled />
  }

  const menuMap = menus.reduce((_, item, __, arr) => {
    if (item?.children) {
      return item.children?.map((e) => arr.push(e))
    }
    return [...arr, item]
  }, [])

  const onClickMenuItem = ({ key } = {}) => {
    const path = menuMap.find((item) => item?.key === key)?.path
    if (path) {
      navigate(path)
    }
  }

  const getItems = (menuList = []) => {
    return menuList.map((item) => {
      return {
        key: item.key,
        label: item.name,
        icon: (
          <div className="relative flex flex-row items-center justify-start">
            <div>{renderIcon(item)}</div>
          </div>
        ),
        children: item?.children ? getItems(item?.children) : undefined,
      }
    })
  }

  return (
    <Sider className="side-nav" width={SIDE_NAV_WIDTH} collapsed={navCollapsed}>
      <Scrollbars autoHide>
        <Menu
          style={{ height: '100%', borderRight: 0 }}
          selectedKeys={openKeys}
          multiple={false}
          mode="inline"
          openKeys={openKeys}
          defaultOpenKeys={rootKeys}
          onOpenChange={onOpenChange}
          onSelect={({ selectedKeys }) => {
            const openItems =
              openKeys?.filter((path) =>
                selectedKeys?.some((key) => pathToRegexp(`${path}(.*)`, [], {}).test(key))
              ) || []
            setOpenKeys(openItems.concat(selectedKeys))
          }}
          onDeselect={({ selectedKeys }) => {
            const openItems = openKeys?.filter((path) => !selectedKeys.includes(path)) || []
            setOpenKeys(openItems)
          }}
          onClick={onClickMenuItem}
          items={getItems(menus.filter((e) => !e?.isChildren))}
        />
      </Scrollbars>
    </Sider>
  )
}

export default SideNav
