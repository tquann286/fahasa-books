import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from '@/constants'

import SideNav from '@/components/Layouts/SideNav'
import Loading from '@/components/shared-components/Loading'
import HeaderNav from '@/components/Layouts/HeaderNav'
import Footer from '@/components/Layouts/Footer'
import { useFlag } from '@/hooks'

const { Content } = Layout

const AppLayout = () => {
  const [navCollapsed, , , onToggle] = useFlag(false)

  const getLayoutGuuter = () => {
    const paddingWidth = navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    return { paddingLeft: paddingWidth }
  }

  const appViews = () => (
    <Suspense fallback={<Loading cover="content" />}>
      <Outlet />
    </Suspense>
  )

  return (
    <Layout>
      <HeaderNav {...{ navCollapsed, onToggle }} />
      <Layout className="app-container">
        <SideNav navCollapsed={navCollapsed} />
        <Layout style={getLayoutGuuter()} className="app-layout">
          <div className="app-content">
            <Content>{appViews()}</Content>
            <Footer />
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout
