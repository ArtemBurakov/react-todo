import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api, {
  handleResponseError,
  handleSignupResponseError,
} from '../../app/axiosClient'

const initialState = {
  user: null,
  login: {
    errorMessage: null,
  },
  signup: {
    errorMessage: null,
    formError: null,
  },
  loading: 'idle',
}

export const authorizeUser = createAsyncThunk(
  'users/authorize',
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await Api.post(`users/authorize`, { username, password })
      return data
    } catch (error) {
      const responseError = handleResponseError(error)
      return thunkAPI.rejectWithValue(responseError)
    }
  }
)

export const signupUser = createAsyncThunk(
  'users/signup',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const { data } = await Api.post(`users/sign-up`, {
        username,
        email,
        password,
      })
      return data
    } catch (error) {
      const signupResponseError = handleSignupResponseError(error)
      return thunkAPI.rejectWithValue(signupResponseError)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromLocalStorage: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    removeUser: (state) => {
      state.user = null
      state.loading = 'idle'
      state.error = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorizeUser.pending, (state) => {
        state.loading = 'pending'
        state.login.errorMessage = null
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.user = action.payload
          localStorage.setItem('user', JSON.stringify(action.payload))
        }
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.login.errorMessage = action.payload
        }
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = 'pending'
        state.signup.status = null
        state.signup.errorMessage = null
        state.signup.formError = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.signup.status = 'success'
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.signup.status = 'failure'
          state.signup.errorMessage = action.payload.errorMessage
          state.signup.formError = action.payload.formError
        }
      })
  },
})

export const getUser = (state) => state.user.user
export const getUserLoading = (state) => state.user.loading
export const getUserLoginEvent = (state) => state.user.login
export const getUserSignupEvent = (state) => state.user.signup

export const { setUserFromLocalStorage, removeUser } = userSlice.actions

export default userSlice.reducer
