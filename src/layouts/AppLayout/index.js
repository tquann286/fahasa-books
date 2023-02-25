import cn from 'classnames'
import Head from 'next/head'

import ErrorBoundary from '@/components/base/ErrorBoundary'

import AppFooter from './Components/AppFooter'
import AppHeader from './Components/AppHeader'
import AppSideBar from './Components/AppSideBar'

const AppsLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Fahasa</title>
        <meta name="description" content="Fahasa" />
      </Head>

      <div className="m-0 min-h-screen bg-white p-0">
        <AppHeader />
        <div
          style={{ paddingTop: 'var(--h-header)' }}
          className="mx-auto flex max-w-screen-xl gap-[var(--space-x-screen)]"
        >
          <AppSideBar />
          <main
            className={cn(
              'max-w-[calc(var(--w-screen)-var(--w-sidebar)-var(--space-x-screen))]',
              'min-h-[calc(100vh-70px-240px)] w-full flex-1 pt-7'
            )}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default AppsLayout
