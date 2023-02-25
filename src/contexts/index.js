import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate as PersistGateClient } from 'redux-persist/integration/react'
import { IntlProvider } from 'use-intl'

import getLangMessage from '@/lang'
import { useStore } from '@/store'

import { NotificationProvider } from '@/components/base/Notification/NotificationProvider'
import { ReactQueryProvider } from '@/contexts/ReactQuery'

export const AppProviders = ({ children, locale, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, () => persistor.persist())

  return (
    <IntlProvider
      messages={getLangMessage(locale)}
      timeZone="Asia/Ho_Chi_Minh"
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      }}
    >
      <Provider store={store}>
        <PersistGateClient persistor={persistor}>
          {() => (
            <ReactQueryProvider pageProps={pageProps}>
              <NotificationProvider>{children}</NotificationProvider>
            </ReactQueryProvider>
          )}
        </PersistGateClient>
      </Provider>
    </IntlProvider>
  )
}
