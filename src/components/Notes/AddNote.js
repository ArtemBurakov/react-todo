import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Modal, Button, Spinner } from 'react-bootstrap'

import { getUser } from '../../features/user/userSlice'
import { addNote, getNotesLoading } from '../../features/notes/notesSlice'
import { getSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

export default function AddNote({ show, handleClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const { id, access_token } = useSelector(getUser)
  const notesLoading = useSelector(getNotesLoading)
  const selectedWorkspace = useSelector(getSelectedWorkspace)

  const handleInputName = (event) => setName(event.target.value)
  const handleInputText = (event) => setText(event.target.value)

  const onAddNoteClick = async () => {
    if (notesLoading === 'idle') {
      const board_id = selectedWorkspace?.id
      await dispatch(addNote({ id, access_token, board_id, name, text }))
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter note name here..."
              type="text"
              autoFocus
              onChange={handleInputName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={6} onChange={handleInputText} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {notesLoading === 'pending' ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={onAddNoteClick}>
            Add Note
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
