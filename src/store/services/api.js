import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_ROOT = import.meta.env.VITE_APP_API_URI
const TIMEOUT = import.meta.env.TIMEOUT || 10000

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState?.()?.auth || {}
      if (token) {
        headers.set('timeout', TIMEOUT)
      }
      return headers
    },
  }),
  keepUnusedDataFor: 60,
  reducerPath: 'apiReducer',
  tagTypes: ['Auth'],

  endpoints: () => ({}),
})
