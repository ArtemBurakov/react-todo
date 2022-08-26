import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, { handleResponseError } from '../../app/axiosClient'

const initialState = {
  notes: [],
  selectedNote: null,
  loading: 'idle',
  error: null,
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
  async ({ id, access_token, board_id = null, name, text }, thunkAPI) => {
    try {
      const { data } = await Api.post(
        `notes`,
        {
          user_id: id,
          board_id: board_id,
          name: name,
          text: text,
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
  async ({ access_token, noteId, name, text, status }, thunkAPI) => {
    try {
      const { data } = await Api.put(
        `notes/${noteId}`,
        {
          name: name,
          text: text,
          status: status,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.notes = action.payload
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(addNote.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(addNote.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.notes = [action.payload, ...state.notes]
        }
      })
      .addCase(addNote.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          const updatedNoteIndex = state.notes
            .map((note) => note.id)
            .indexOf(action.payload.id)
          state.notes.splice(updatedNoteIndex, 1, action.payload)
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
  },
})

export const getNotes = (state) => state.notes.notes
export const getNotesError = (state) => state.notes.error
export const getNotesLoading = (state) => state.notes.loading
export const getSelectedNote = (state) => state.notes.selectedNote

// Action creators are generated for each case reducer function
export const { setSelectedNote, removeSelectedNote } = notesSlice.actions

export default notesSlice.reducer
