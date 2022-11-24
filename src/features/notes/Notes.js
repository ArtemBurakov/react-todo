import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Row, Col, Alert, Button } from 'react-bootstrap'

import './../../components/Notes/Notes.css'
import AddNote from '../../components/Notes/AddNote'
import NotesList from '../../components/Notes/NotesList'
import LoadingNotesList from '../../components/Notes/LoadingNotesList'
import NotesOffCanvas from '../../components/Notes/NotesOffCanvas'
import NotesFilterForm from '../../components/Notes/NotesFilterForm'
import NotesFilterList from '../../components/Notes/FilterList/NotesFilterList'

import { getUser } from '../user/userSlice'
import {
  fetchNotes,
  getNotesError,
  getFetchNotesLoading,
  removeNotesActiveFilterListItem,
  removeNotesActiveFilterStatus,
} from './notesSlice'
import { fetchWorkspaces } from '../workspaces/workspacesSlice'
import { fetchTasks, getFetchTasksLoading } from '../tasks/tasksSlice'

export default function Notes() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [show, setShow] = useState(false)
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getNotesError)
  const fetchNotesLoading = useSelector(getFetchNotesLoading)
  const tasksFetchLoading = useSelector(getFetchTasksLoading)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
    dispatch(fetchNotes(access_token))
    dispatch(fetchWorkspaces(access_token))

    return () => {
      dispatch(removeNotesActiveFilterStatus())
      dispatch(removeNotesActiveFilterListItem())
    }
  }, [])

  if (responseError)
    return (
      <>
        <h4>Notes</h4>
        <Alert variant="warning">{responseError}</Alert>
      </>
    )

  return (
    <>
      {location.pathname === '/notes' && (
        <Row className="mb-3">
          <div className="notes-header">
            <div className="offcanvas-button">
              <NotesOffCanvas />
            </div>
            <div className="body">
              <h4>Notes</h4>
            </div>
            <div className="create-button">
              <Button onClick={handleShow}>Create new</Button>
            </div>
          </div>
        </Row>
      )}
      <Row>
        <Col
          lg={3}
          md={4}
          className="mb-md-0 mb-3 d-lg-block d-md-block d-none"
        >
          <NotesFilterList />
        </Col>
        <Col lg={9} md={8}>
          <NotesFilterForm />
          {[fetchNotesLoading, tasksFetchLoading].includes('pending') ? (
            <LoadingNotesList />
          ) : (
            <NotesList />
          )}
        </Col>
      </Row>
      {show && <AddNote show={show} handleClose={handleClose} />}
    </>
  )
}
