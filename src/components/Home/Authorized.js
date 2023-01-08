import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Row } from 'react-bootstrap'

import './Authorized.css'

import NotesList from '../Notes/List/NotesList'
import TasksList from '../Tasks/List/TasksList'
import LoadingTasksList from '../Tasks/List/LoadingTasksList'
import LoadingNotesList from '../Notes/List/LoadingNotesList'
import WorkspacesList from '../Workspaces/List/WorkspacesList'
import LoadingWorkspacesList from '../Workspaces/List/LoadingWorkspacesList'

import {
  fetchNotes,
  getFetchNotesLoading,
} from '../../features/notes/notesSlice'
import {
  fetchTasks,
  getFetchTasksLoading,
} from '../../features/tasks/tasksSlice'
import {
  fetchWorkspaces,
  getFetchWorkspacesLoading,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'

const MAX_TASKS_IN_HOME_VIEW = 6
const MAX_NOTES_IN_HOME_VIEW = 7
const MAX_WORKSPACES_IN_HOME_VIEW = 8

export default function Authorized() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)
  const fetchNotesLoading = useSelector(getFetchNotesLoading)
  const fetchWorkspacesLoading = useSelector(getFetchWorkspacesLoading)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
    dispatch(fetchNotes(access_token))
    dispatch(fetchWorkspaces(access_token))
  }, [])

  return (
    <>
      <h4>Recently worked on</h4>
      <Row>
        <Link className="link-title" to="tasks">
          TASKS
        </Link>
        {fetchTasksLoading === 'pending' ? (
          <LoadingTasksList />
        ) : (
          <TasksList maxTasks={MAX_TASKS_IN_HOME_VIEW} />
        )}
      </Row>
      <Row>
        <Link className="link-title mt-3 mb-2" to="workspaces">
          WORKSPACES
        </Link>
        {fetchWorkspacesLoading === 'pending' ? (
          <LoadingWorkspacesList />
        ) : (
          <WorkspacesList
            showCreateWorkspaceButton={false}
            maxWorkspaces={MAX_WORKSPACES_IN_HOME_VIEW}
          />
        )}
      </Row>
      <Row>
        <Link className="link-title mt-2 mb-2" to="notes">
          NOTES
        </Link>
        {[fetchNotesLoading, fetchTasksLoading].includes('pending') ? (
          <LoadingNotesList />
        ) : (
          <NotesList maxNotes={MAX_NOTES_IN_HOME_VIEW} />
        )}
      </Row>
    </>
  )
}
