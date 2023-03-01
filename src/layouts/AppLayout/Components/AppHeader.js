import { SIDE_NAV_WIDTH } from '@/constants'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useRouter } from 'next/router'

import Logo from '../Logo'
import NavProfile from '../NavProfile'

const AppHeader = ({ navCollapsed, onToggle }) => {
  const router = useRouter()

  const onSignOut = () => router.push('/logout')

  return (
    <Layout.Header className="app-header">
      <div className="app-header-wrapper ">
        <Logo navWidth={SIDE_NAV_WIDTH} />
        <div className="nav" style={{ width: `calc(100% - ${SIDE_NAV_WIDTH}px)` }}>
          <div className="nav-left">
            <div className="ant-menu ant-menu-root ant-menu-horizontal">
              <div
                tabIndex={0}
                onKeyDown={() => {}}
                role="button"
                className="ant-menu-item ant-menu-item-only-child"
                onClick={() => {
                  onToggle?.()
                }}
              >
                {navCollapsed ? (
                  <MenuUnfoldOutlined className="nav-icon" />
                ) : (
                  <MenuFoldOutlined className="nav-icon" />
                )}
              </div>
            </div>
          </div>
          <div className="nav-right relative my-auto">
            <NavProfile signOut={onSignOut} />
          </div>
        </div>
      </div>
    </Layout.Header>
  )
}

export default AppHeader
