import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, { handleResponseError } from '../../app/axiosClient'

const initialState = {
  tasks: [],
  selectedTask: null,
  loading: 'idle',
  error: null,
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (access_token, thunkAPI) => {
    try {
      const { data } = await Api.get(`tasks`, {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ id, access_token, note_id = null, name }, thunkAPI) => {
    try {
      const { data } = await Api.post(
        `tasks`,
        {
          user_id: id,
          note_id: note_id,
          name: name,
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

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ access_token, taskId, status }, thunkAPI) => {
    try {
      const { data } = await Api.put(
        `tasks/${taskId}`,
        {
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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectedTask: (state, props) => {
      state.selectedTask = props.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.tasks = action.payload
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(addTask.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.tasks = [action.payload, ...state.tasks]
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          const updatedTaskIndex = state.tasks
            .map((task) => task.id)
            .indexOf(action.payload.id)
          state.tasks.splice(updatedTaskIndex, 1, action.payload)
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
  },
})

export const getTasks = (state) => state.tasks.tasks
export const selectedTask = (state) => state.tasks.selectedTask
export const getTasksError = (state) => state.tasks.error
export const getTasksLoading = (state) => state.tasks.loading

// Action creators are generated for each case reducer function
export const { setSelectedTask } = tasksSlice.actions

export default tasksSlice.reducer
