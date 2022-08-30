import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Row, Col, Nav, Tab, Alert, Button } from 'react-bootstrap'

import AddNote from '../../components/Notes/AddNote'
import LoadingNotesList from '../../components/Notes/LoadingNotesList'
import NotesList from '../../components/Notes/NotesList'
import { fetchNotes, getNotesError, getFetchNotesLoading } from './notesSlice'
import { fetchTasks, getFetchTasksLoading } from '../tasks/tasksSlice'
import { getUser } from '../user/userSlice'

export default function Notes() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getNotesError)
  const fetchNotesLoading = useSelector(getFetchNotesLoading)
  const tasksFetchLoading = useSelector(getFetchTasksLoading)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    // Using the async IIFE function
    // This will fix a bug: cleanup function never get called
    ;(async () => {
      await dispatch(fetchTasks(access_token))
      await dispatch(fetchNotes(access_token))
    })()
  }, [])

  return (
    <>
      <h4>Your notes list</h4>
      <Tab.Container defaultActiveKey="10">
        <Row>
          <Col md={3} className="mb-md-0 mb-3">
            <Nav variant="pills" className="flex-md-column">
              <Nav.Item>
                <Nav.Link eventKey="10">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="20">Done</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="0">Deleted</Nav.Link>
              </Nav.Item>
              <Button variant="success" onClick={handleShow}>
                Add new note
              </Button>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              {responseError ? (
                <Alert variant="warning">{responseError}</Alert>
              ) : (
                <>
                  {fetchNotesLoading === 'pending' ||
                  tasksFetchLoading === 'pending' ? (
                    <LoadingNotesList />
                  ) : (
                    <>
                      <Tab.Pane eventKey="10">
                        <NotesList status={10} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="20">
                        <NotesList status={20} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="0">
                        <NotesList status={0} />
                      </Tab.Pane>
                    </>
                  )}
                </>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {show && <AddNote show={show} handleClose={handleClose} />}
    </>
  )
}
