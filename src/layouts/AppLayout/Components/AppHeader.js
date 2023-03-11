import { SIDE_NAV_WIDTH } from '@/constants'
import { Layout } from 'antd'
import { useRouter } from 'next/router'

import Logo from '../Logo'
import NavProfile from '../NavProfile'

const AppHeader = () => {
  const router = useRouter()

  const onSignOut = () => router.push('/logout')

  return (
    <Layout.Header className="app-header">
      <div className="app-header-wrapper ">
        <Logo navWidth={SIDE_NAV_WIDTH} />
        <div className="nav" style={{ width: `calc(100% - ${SIDE_NAV_WIDTH}px)` }}>
          <div className="nav-right relative my-auto">
            <NavProfile signOut={onSignOut} />
          </div>
        </div>
      </div>
    </Layout.Header>
  )
}

export default AppHeader
