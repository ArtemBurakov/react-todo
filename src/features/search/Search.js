import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, ListGroup, Accordion } from 'react-bootstrap'

import TaskItem from '../../components/Tasks/TaskItem'
import NoteItem from '../../components/Notes/NoteItem'
import WorkspaceItem from '../../components/Workspaces/Item/WorkspaceItem'

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
    return data?.filter((item) => {
      return searchParam?.some((newItem) => {
        return (
          item[newItem]
            ?.toString()
            ?.toLowerCase()
            ?.indexOf(searchQuery.toLowerCase()) > -1
        )
      })
    })
  }

  useEffect(() => {
    // Using the async IIFE function
    // This will fix a bug: cleanup function never get called
    ;(async () => {
      await dispatch(fetchTasks(access_token))
      await dispatch(fetchNotes(access_token))
      await dispatch(fetchWorkspaces(access_token))
    })()

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
          <Row xs={1} md={2} lg={3} className="g-3">
            {search(notes).map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Workspaces</Accordion.Header>
        <Accordion.Body>
          <Row xs={1} md={2} lg={3} className="g-3">
            {search(workspaces).map((workspace) => (
              <WorkspaceItem key={workspace.id} workspace={workspace} />
            ))}
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
