import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'

import { Col, Card } from 'react-bootstrap'

import {
  NOTE_TYPE_WITH_TASKS,
  MAX_TASKS_IN_NOTE_VIEW,
} from '../../../app/constants'
import TasksList from '../../Tasks/List/TasksList'
import NoteModal from '../../Modal/Notes/NoteModal'

import { setSelectedNote } from '../../../features/notes/notesSlice'

export default function NoteItem({ note }) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const onNoteItemClick = () => {
    dispatch(setSelectedNote(note))
    handleShow()
  }

  return (
    <>
      {show && <NoteModal show={show} handleClose={handleClose} />}
      <Col>
        <Card type="button" onClick={onNoteItemClick}>
          <Card.Body>
            <Card.Title>{note.name}</Card.Title>
            <Card.Text>{note.text}</Card.Text>
          </Card.Body>
          {note.type === NOTE_TYPE_WITH_TASKS && (
            <TasksList
              note={note}
              type={'inNote'}
              maxTasks={MAX_TASKS_IN_NOTE_VIEW}
            />
          )}
          <Card.Footer>
            <small className="text-muted">
              Updated{' '}
              <Moment
                date={new Date(note.updated_at * 1000)}
                format="DD/MM/YYYY HH:mm"
              />
            </small>
          </Card.Footer>
        </Card>
      </Col>
    </>
  )
}
