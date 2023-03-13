import React from 'react'
import { ConfigProvider } from 'antd'
import redux from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RouterComponent from '@/router'

import './index.css'
import './styles/theme.css'
import './styles/antd-vars-theme.css'

//
function App() {
  return (
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <ConfigProvider>
          <RouterComponent />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
