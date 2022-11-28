import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Modal, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'

import '../Modal.css'
import Loader from '../../Loader/Loader'
import TasksList from '../../Tasks/List/TasksList'
import AddNewTaskInput from '../../Tasks/AddNewTaskInput'

import {
  updateNote,
  getSelectedNote,
  getUpdateNoteLoading,
  removeSelectedNote,
} from '../../../features/notes/notesSlice'
import { getUser } from '../../../features/user/userSlice'

export default function NoteModal({ show, handleClose }) {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const selectedNote = useSelector(getSelectedNote)
  const updateNoteLoading = useSelector(getUpdateNoteLoading)

  const [name, setName] = useState(selectedNote.name)
  const [text, setText] = useState(selectedNote.text)
  const [status, setStatus] = useState(selectedNote.status)

  const radios = [
    { name: 'Active', value: 10, variant: 'outline-primary' },
    { name: 'Done', value: 20, variant: 'outline-success' },
    { name: 'Deleted', value: 0, variant: 'outline-danger' },
  ]

  const handleInputName = (event) => setName(event.target.value)
  const handleInputText = (event) => setText(event.target.value)

  const onSaveChangesClick = async () => {
    if (updateNoteLoading === 'idle') {
      const noteId = selectedNote.id
      const type = selectedNote.type
      await dispatch(
        updateNote({ access_token, noteId, name, text, status, type })
      )
      handleClose()
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removeSelectedNote())
    }
  }, [])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleInputName} />
          </Form.Group>
          <p className="mb-2">Status</p>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radio.variant}
                name="radio"
                value={`${radio.value}`}
                checked={status === radio.value}
                onChange={(e) => setStatus(JSON.parse(e.currentTarget.value))}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <Form.Group className="mt-3 mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={text}
              onChange={handleInputText}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tasks</Form.Label>
            <AddNewTaskInput />
            <TasksList note={selectedNote} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Loader
          loading={updateNoteLoading}
          onClick={onSaveChangesClick}
          buttonText="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  )
}
