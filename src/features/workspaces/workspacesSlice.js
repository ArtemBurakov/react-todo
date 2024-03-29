import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, { handleResponseError } from '../../app/axiosClient'
import {
  WORKSPACE_SEARCH_PARAM,
  STATUS_ACTIVE,
  SORT_BY_RECENT,
} from '../../app/constants'

const initialState = {
  workspaces: [],
  selectedWorkspace: null,
  workspaceSortBy: SORT_BY_RECENT,
  workspaceSearchQuery: '',
  workspaceSearchParam: WORKSPACE_SEARCH_PARAM,
  error: null,
  fetchWorkspacesLoading: 'idle',
  fetchWorkspaceLoading: 'idle',
  addWorkspaceLoading: 'idle',
  updateWorkspaceLoading: 'idle',
}

export const fetchWorkspaces = createAsyncThunk(
  'workspaces/fetchWorkspaces',
  async (access_token, thunkAPI) => {
    try {
      const { data } = await Api.get(`workspaces`, {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const fetchWorkspace = createAsyncThunk(
  'workspaces/fetchWorkspace',
  async ({ access_token, workspaceId }, thunkAPI) => {
    try {
      const { data } = await Api.get(`workspaces/${workspaceId}`, {
        headers: { Authorization: 'Bearer ' + access_token },
      })
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const addWorkspace = createAsyncThunk(
  'workspace/addWorkspace',
  async ({ id, access_token, name }, thunkAPI) => {
    try {
      const { data } = await Api.post(
        `workspaces`,
        {
          user_id: id,
          name: name,
          status: STATUS_ACTIVE,
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

export const updateWorkspace = createAsyncThunk(
  'workspaces/updateWorkspace',
  async ({ access_token, workspaceId, name, workspaceStatus }, thunkAPI) => {
    try {
      const { data } = await Api.put(
        `workspaces/${workspaceId}`,
        {
          name: name,
          status: workspaceStatus,
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

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setSelectedWorkspace: (state, props) => {
      state.selectedWorkspace = props.payload
    },
    removeSelectedWorkspace: (state) => {
      state.selectedWorkspace = null
    },
    setWorkspaceSortBy: (state, props) => {
      state.workspaceSortBy = props.payload
    },
    setWorkspaceSearchQuery: (state, props) => {
      state.workspaceSearchQuery = props.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.fetchWorkspacesLoading = 'pending'
        state.error = null
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        if (state.fetchWorkspacesLoading === 'pending') {
          state.fetchWorkspacesLoading = 'idle'
          state.workspaces = action.payload
        }
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        if (state.fetchWorkspacesLoading === 'pending') {
          state.fetchWorkspacesLoading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(fetchWorkspace.pending, (state) => {
        state.fetchWorkspaceLoading = 'pending'
        state.error = null
      })
      .addCase(fetchWorkspace.fulfilled, (state, action) => {
        if (state.fetchWorkspaceLoading === 'pending') {
          state.fetchWorkspaceLoading = 'idle'
          state.selectedWorkspace = action.payload
        }
      })
      .addCase(fetchWorkspace.rejected, (state, action) => {
        if (state.fetchWorkspaceLoading === 'pending') {
          state.fetchWorkspaceLoading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(addWorkspace.pending, (state) => {
        state.addWorkspaceLoading = 'pending'
        state.error = null
      })
      .addCase(addWorkspace.fulfilled, (state, action) => {
        if (state.addWorkspaceLoading === 'pending') {
          state.addWorkspaceLoading = 'idle'
          state.workspaces = [action.payload, ...state.workspaces]
        }
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        if (state.addWorkspaceLoading === 'pending') {
          state.addWorkspaceLoading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(updateWorkspace.pending, (state) => {
        state.updateWorkspaceLoading = 'pending'
        state.error = null
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        if (state.updateWorkspaceLoading === 'pending') {
          state.updateWorkspaceLoading = 'idle'
          state.selectedWorkspace = action.payload
          const updatedWorkspaceIndex = state.workspaces
            .map((workspace) => workspace.id)
            .indexOf(action.payload.id)
          state.workspaces.splice(updatedWorkspaceIndex, 1, action.payload)
        }
      })
      .addCase(updateWorkspace.rejected, (state, action) => {
        if (state.updateWorkspaceLoading === 'pending') {
          state.updateWorkspaceLoading = 'idle'
          state.error = action.payload
        }
      })
  },
})

export const getWorkspaces = (state) => state.workspaces.workspaces
export const getSelectedWorkspace = (state) =>
  state.workspaces.selectedWorkspace
export const getWorkspaceSortBy = (state) => state.workspaces.workspaceSortBy
export const getWorkspaceSearchQuery = (state) =>
  state.workspaces.workspaceSearchQuery
export const getWorkspaceSearchParam = (state) =>
  state.workspaces.workspaceSearchParam
export const getWorkspacesError = (state) => state.workspaces.error

export const getAddWorkspaceLoading = (state) =>
  state.workspaces.addWorkspaceLoading
export const getUpdateWorkspaceLoading = (state) =>
  state.workspaces.updateWorkspaceLoading
export const getFetchWorkspaceLoading = (state) =>
  state.workspaces.fetchWorkspaceLoading
export const getFetchWorkspacesLoading = (state) =>
  state.workspaces.fetchWorkspacesLoading

export const {
  setSelectedWorkspace,
  removeSelectedWorkspace,
  setWorkspaceSortBy,
  setWorkspaceSearchQuery,
} = workspacesSlice.actions

export default workspacesSlice.reducer
