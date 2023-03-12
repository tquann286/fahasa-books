import Head from 'next/head'

import { Layout } from 'antd'
import { SIDE_NAV_WIDTH } from '@/constants'
import AppFooter from './Components/AppFooter'
import AppHeader from './Components/AppHeader'
import AppSideBar from './Components/AppSideBar'

const { Content } = Layout
const AppsLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Fahasa</title>
        <meta name="description" content="Fahasa" />
      </Head>

      <div className="m-0 min-h-screen bg-white p-0">
        <AppHeader />
        <div className="mx-auto flex">
          <AppSideBar />
          <Layout style={{ paddingLeft: SIDE_NAV_WIDTH }} className="app-layout">
            <div className="app-content">
              <Content>{children}</Content>
              <AppFooter />
            </div>
          </Layout>
        </div>
      </div>
    </>
  )
}

export default AppsLayout
