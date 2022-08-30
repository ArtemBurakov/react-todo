import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, { handleResponseError } from '../../app/axiosClient'

const initialState = {
  notes: [],
  selectedNote: null,
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
  async ({ access_token, noteId, name, text, status, type = 0 }, thunkAPI) => {
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

export const getAddNoteLoading = (state) => state.notes.addNoteLoading
export const getUpdateNoteLoading = (state) => state.notes.updateNoteLoading
export const getFetchNotesLoading = (state) => state.notes.fetchNotesLoading

// Action creators are generated for each case reducer function
export const { setSelectedNote, removeSelectedNote } = notesSlice.actions

export default notesSlice.reducer
