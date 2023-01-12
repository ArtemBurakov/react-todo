import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Authorized.css'

import NewUser from './NewUser'
import HomeTasksList from '../Tasks/List/HomeTasksList'
import HomeNotesList from '../Notes/List/HomeNotesList'
import HomeWorkspacesList from '../Workspaces/List/HomeWorkspacesList'

import {
  fetchWorkspaces,
  getWorkspaces,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'
import { fetchNotes, getNotes } from '../../features/notes/notesSlice'
import { fetchTasks, getTasks } from '../../features/tasks/tasksSlice'

const MAX_TASKS_IN_HOME_VIEW = 6
const MAX_NOTES_IN_HOME_VIEW = 7
const MAX_WORKSPACES_IN_HOME_VIEW = 8

export default function Authorized() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const tasks = useSelector(getTasks)
  const notes = useSelector(getNotes)
  const workspaces = useSelector(getWorkspaces)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
    dispatch(fetchNotes(access_token))
    dispatch(fetchWorkspaces(access_token))
  }, [])

  if (tasks.length === 0 && notes.length === 0 && workspaces.length === 0)
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
