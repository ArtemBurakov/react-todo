import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  searchParam: ['name'],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, props) => {
      state.searchQuery = props.payload
    },
    removeSearchQuery: (state) => {
      state.searchQuery = ''
    },
  },
})

export const getSearchParam = (state) => state.search.searchParam
export const getSearchQuery = (state) => state.search.searchQuery

// Action creators are generated for each case reducer function
export const { setSearchQuery, removeSearchQuery } = searchSlice.actions

export default searchSlice.reducer
