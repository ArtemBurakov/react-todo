import { createSlice } from '@reduxjs/toolkit'
import { SEARCH_PARAM } from '../../app/constants'

const initialState = {
  searchQuery: '',
  searchParam: SEARCH_PARAM,
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

export const { setSearchQuery, removeSearchQuery } = searchSlice.actions

export default searchSlice.reducer
