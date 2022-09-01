import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import notesReducer from '../features/notes/notesSlice'
import workspacesReducer from '../features/workspaces/workspacesSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    workspaces: workspacesReducer,
    search: searchReducer,
  },
})
