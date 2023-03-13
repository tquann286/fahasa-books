import { combineReducers } from '@reduxjs/toolkit'

import { api } from '@/store/services/api'

export default combineReducers({
  [api?.reducerPath]: api?.reducer,
})
