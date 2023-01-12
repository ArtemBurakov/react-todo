import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, { handleResponseError } from '../../app/axiosClient'

const DEFAULT_ACTIVE_FILTER_STATUS = 30
const DEFAULT_ACTIVE_FILTER_LIST_ITEM = { name: 'All notes', status: 30 }

const initialState = {
  notes: [],
  selectedNote: null,
  noteSortBy: 'recent',
  noteSearchQuery: '',
  noteSearchParam: ['name', 'text'],
  filterList: {
    filters: [
      DEFAULT_ACTIVE_FILTER_LIST_ITEM,
      { name: 'Active', status: 10 },
      { name: 'Done', status: 20 },
      { name: 'Deleted', status: 0 },
    ],
    activeFilter: DEFAULT_ACTIVE_FILTER_LIST_ITEM,
    activeFilterStatus: DEFAULT_ACTIVE_FILTER_STATUS,
  },
  error: null,
  addNoteLoading: 'idle',
  updateNoteLoading: 'idle',
  fetchNotesLoading: 'idle',
}

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (access_token, thunkAPI) => {
    try {
      const { data } = await Api.get(`notes`, {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const addNote = createAsyncThunk(
  'notes/addNote',
  async (
    { id, access_token, board_id = null, name, text, type = 0 },
    thunkAPI
  ) => {
    try {
      const { data } = await Api.post(
        `notes`,
        {
          user_id: id,
          board_id: board_id,
          name: name,
          text: text,
          type: type,
          status: 10,
        },
        {
          headers: { Authorization: 'Bearer ' + access_token },
        }
      )
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ access_token, noteId, name, text, status, type }, thunkAPI) => {
    try {
      const { data } = await Api.put(
        `notes/${noteId}`,
        {
          name: name,
          text: text,
          status: status,
          type: type,
        },
        {
          headers: { Authorization: 'Bearer ' + access_token },
        }
      )
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedNote: (state, props) => {
      state.selectedNote = props.payload
    },
    removeSelectedNote: (state) => {
      state.selectedNote = null
    },
    setNoteSortBy: (state, props) => {
      state.noteSortBy = props.payload
    },
    setNoteSearchQuery: (state, props) => {
      state.noteSearchQuery = props.payload
    },
    setNotesActiveFilterListItem: (state, props) => {
      state.filterList.activeFilter = props.payload
    },
    removeNotesActiveFilterListItem: (state) => {
      state.filterList.activeFilter = DEFAULT_ACTIVE_FILTER_LIST_ITEM
    },
    setNotesActiveFilterStatus: (state, props) => {
      state.filterList.activeFilterStatus = props.payload
    },
    removeNotesActiveFilterStatus: (state) => {
      state.filterList.activeFilterStatus = DEFAULT_ACTIVE_FILTER_STATUS
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.fetchNotesLoading = 'pending'
        state.error = null
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        if (state.fetchNotesLoading === 'pending') {
          state.fetchNotesLoading = 'idle'
          state.notes = action.payload
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        if (state.fetchNotesLoading === 'pending') {
          state.fetchNotesLoading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(addNote.pending, (state) => {
        state.addNoteLoading = 'pending'
        state.error = null
      })
      .addCase(addNote.fulfilled, (state, action) => {
        if (state.addNoteLoading === 'pending') {
          state.addNoteLoading = 'idle'
          state.notes = [action.payload, ...state.notes]
        }
      })
      .addCase(addNote.rejected, (state, action) => {
        if (state.addNoteLoading === 'pending') {
          state.addNoteLoading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(updateNote.pending, (state) => {
        state.updateNoteLoading = 'pending'
        state.error = null
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (state.updateNoteLoading === 'pending') {
          state.updateNoteLoading = 'idle'
          const updatedNoteIndex = state.notes
            .map((note) => note.id)
            .indexOf(action.payload.id)
          state.notes.splice(updatedNoteIndex, 1, action.payload)

          if (state.selectedNote) state.selectedNote = action.payload
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        if (state.updateNoteLoading === 'pending') {
          state.updateNoteLoading = 'idle'
          state.error = action.payload
        }
      })
  },
})

export const getNotes = (state) => state.notes.notes
export const getNotesError = (state) => state.notes.error
export const getSelectedNote = (state) => state.notes.selectedNote

export const getNoteSortBy = (state) => state.notes.noteSortBy
export const getNoteSearchQuery = (state) => state.notes.noteSearchQuery
export const getNoteSearchParam = (state) => state.notes.noteSearchParam

export const getNotesFilterList = (state) => state.notes.filterList.filters
export const getNotesActiveFilterListItem = (state) =>
  state.notes.filterList.activeFilter
export const getNotesActiveFilterStatus = (state) =>
  state.notes.filterList.activeFilterStatus

export const getAddNoteLoading = (state) => state.notes.addNoteLoading
export const getUpdateNoteLoading = (state) => state.notes.updateNoteLoading
export const getFetchNotesLoading = (state) => state.notes.fetchNotesLoading

export const {
  setSelectedNote,
  removeSelectedNote,
  setNoteSortBy,
  setNoteSearchQuery,
  setNotesActiveFilterListItem,
  removeNotesActiveFilterListItem,
  setNotesActiveFilterStatus,
  removeNotesActiveFilterStatus,
} = notesSlice.actions

export default notesSlice.reducer
