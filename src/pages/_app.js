import '@/styles/globals.css'
import '@/styles/bar-of-progress.css'

import ProgressBar from '@badrap/bar-of-progress'
import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useDidMount } from '@/hooks'
import { AppProviders } from '@/contexts'

const progress = new ProgressBar({
  size: 1,
  color: 'var(--secondary)',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

const Noop = ({ children }) => <>{children}</>

const App = ({ Component, pageProps }) => {
  const [safeHydration, setSafeHydration] = useState(false)

  const Layout = Component.Layout || Noop
  const router = useRouter()
  console.log('router: ', router)

  useDidMount(() => setSafeHydration(true))

  return (
    <AppProviders locale={router?.locale} pageProps={pageProps}>
      {safeHydration && (
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      )}
    </AppProviders>
  )
}

export default App
