import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  coreSetting: [],
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    getCoreSetting: (state, action) => {
      return { ...state, coreSetting: action.payload }
    },
  },
})

export const { getCoreSetting } = configSlice.actions

export default configSlice.reducer
