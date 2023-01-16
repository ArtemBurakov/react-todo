import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Masonry from 'react-masonry-css'
import { ListGroup, Accordion } from 'react-bootstrap'

import TaskItem from '../../components/Tasks/List/TaskItem'
import NoteItem from '../../components/Notes/List/NoteItem'
import WorkspaceItem from '../../components/Workspaces/Item/WorkspaceItem'
import { notesBreakpointColumns } from './../../components/Notes/List/NotesBreakpointColumns'
import { workspacesBreakpointColumns } from './../../components/Workspaces/List/WorkspacesBreakpointColumns'

import { getUser } from '../user/userSlice'
import { fetchTasks, getTasks } from '../tasks/tasksSlice'
import { fetchNotes, getNotes } from '../notes/notesSlice'
import { fetchWorkspaces, getWorkspaces } from '../workspaces/workspacesSlice'
import { getSearchParam, getSearchQuery, setSearchQuery } from './searchSlice'

export default function Search() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const tasks = useSelector(getTasks)
  const notes = useSelector(getNotes)
  const workspaces = useSelector(getWorkspaces)
  const searchQuery = useSelector(getSearchQuery)
  const searchParam = useSelector(getSearchParam)

  const search = (data) => {
    if (!searchQuery || !data.length) return []
    return data.filter((object) =>
      searchParam.some((objectKeyName) =>
        object[objectKeyName]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    )
  }

  useEffect(() => {
    dispatch(fetchTasks(access_token))
    dispatch(fetchNotes(access_token))
    dispatch(fetchWorkspaces(access_token))

    return () => {
      dispatch(setSearchQuery(''))
    }
  }, [])

  return (
    <Accordion defaultActiveKey={['0', '1', '2']} flush alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Tasks</Accordion.Header>
        <Accordion.Body>
          <ListGroup className="list-group-flush">
            {search(tasks).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Notes</Accordion.Header>
        <Accordion.Body>
          <Masonry
            breakpointCols={notesBreakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {search(notes).map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </Masonry>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Workspaces</Accordion.Header>
        <Accordion.Body>
          <Masonry
            breakpointCols={workspacesBreakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {search(workspaces).map((workspace) => (
              <WorkspaceItem key={workspace.id} workspace={workspace} />
            ))}
          </Masonry>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
