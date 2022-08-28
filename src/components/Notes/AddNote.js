import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Modal, Button } from 'react-bootstrap'

import Loader from '../Loader/Loader'
import { getUser } from '../../features/user/userSlice'
import { addNote, getAddNoteLoading } from '../../features/notes/notesSlice'
import { getSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

export default function AddNote({ show, handleClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const { id, access_token } = useSelector(getUser)
  const addNoteLoading = useSelector(getAddNoteLoading)
  const selectedWorkspace = useSelector(getSelectedWorkspace)

  const handleInputName = (event) => setName(event.target.value)
  const handleInputText = (event) => setText(event.target.value)

  const onAddNoteClick = async () => {
    if (addNoteLoading === 'idle') {
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
        <Loader
          loading={addNoteLoading}
          onClick={onAddNoteClick}
          buttonText="Add Note"
        />
      </Modal.Footer>
    </Modal>
  )
}
