import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist'

import reducers from '@/store/reducers'
import { api } from './services/api'

function _configureStore(rootReducer, persistConfig) {
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
    devTools: !import.meta.env.PROD,
  })

  const persistor = persistStore(store)

  return { store, persistor }
}

function generatePersistConfig({ whitelist = [], version = 1 }) {
  const migrations = {
    [version]: ({ _persist }) => {
      return { _persist }
    },
  }

  return {
    key: 'root',
    version,
    storage,
    whitelist: [...whitelist, '_persist'],
    migrate: createMigrate(migrations),
  }
}

const store = _configureStore(
  reducers,
  generatePersistConfig({
    version: 21050601,
    whitelist: ['auth', 'user', 'setting'],
  })
)

export default store
