import React from 'react'

import { Col, Card } from 'react-bootstrap'

import TasksList from '../Tasks/TasksList'

export default function NoteItem({ note, onClick }) {
  return (
    <Col>
      <Card type="button" onClick={onClick}>
        <Card.Body>
          <Card.Title>{note.name}</Card.Title>
          <Card.Text>{note.text}</Card.Text>
        </Card.Body>
        {note.type === 1 ? <TasksList note={note} type={'inNote'} /> : <></>}
        <Card.Footer>
          <small className="text-muted">
            Last updated {new Date(note.updated_at).toLocaleDateString('en-UK')}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  )
}