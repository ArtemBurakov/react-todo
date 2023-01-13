import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Authorized.css'

import {
  MAX_NOTES_IN_HOME_VIEW,
  MAX_TASKS_IN_HOME_VIEW,
  MAX_WORKSPACES_IN_HOME_VIEW,
} from '../../app/constants'
import NewUser from './NewUser'
import HomeTasksList from '../Tasks/List/HomeTasksList'
import HomeNotesList from '../Notes/List/HomeNotesList'
import HomeWorkspacesList from '../Workspaces/List/HomeWorkspacesList'

import {
  fetchNotes,
  getFetchNotesLoading,
  getNotes,
} from '../../features/notes/notesSlice'
import {
  fetchTasks,
  getFetchTasksLoading,
  getTasks,
} from '../../features/tasks/tasksSlice'
import {
  fetchWorkspaces,
  getFetchWorkspacesLoading,
  getWorkspaces,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'

export default function Authorized() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const tasks = useSelector(getTasks)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)
  const notes = useSelector(getNotes)
  const fetchNotesLoading = useSelector(getFetchNotesLoading)
  const workspaces = useSelector(getWorkspaces)
  const fetchWorkspacesLoading = useSelector(getFetchWorkspacesLoading)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
    dispatch(fetchNotes(access_token))
    dispatch(fetchWorkspaces(access_token))
  }, [])

  if (
    tasks.length === 0 &&
    fetchTasksLoading !== 'pending' &&
    notes.length === 0 &&
    fetchNotesLoading !== 'pending' &&
    workspaces.length === 0 &&
    fetchWorkspacesLoading !== 'pending'
  )
    return <NewUser />

  return (
    <>
      <h4>Recently worked on</h4>
      <HomeTasksList maxTasks={MAX_TASKS_IN_HOME_VIEW} />
      <HomeWorkspacesList maxWorkspaces={MAX_WORKSPACES_IN_HOME_VIEW} />
      <HomeNotesList maxNotes={MAX_NOTES_IN_HOME_VIEW} />
    </>
  )
}
