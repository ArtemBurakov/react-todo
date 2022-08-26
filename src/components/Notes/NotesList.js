import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Row } from 'react-bootstrap'

import NoteItem from './NoteItem'
import NoteModal from './NoteModal'
import { getNotes, setSelectedNote } from '../../features/notes/notesSlice'
import { getSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

export default function NotesList({ status }) {
  const dispatch = useDispatch()
  const notes = useSelector(getNotes)
  const selectedWorkspace = useSelector(getSelectedWorkspace)

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const workspaceNoteList = notes.map((note) =>
    note.board_id === selectedWorkspace?.id && note.status === status ? (
      <NoteItem
        note={note}
        key={note.id}
        onClick={() => {
          dispatch(setSelectedNote(note))
          handleShow()
        }}
      />
    ) : null
  )

  const notesList = notes.map((note) =>
    note.status === status && note.board_id === null ? (
      <NoteItem
        note={note}
        key={note.id}
        onClick={() => {
          dispatch(setSelectedNote(note))
          handleShow()
        }}
      />
    ) : null
  )

  return (
    <>
      {show ? <NoteModal show={show} handleClose={handleClose} /> : <></>}
      <Row xs={1} md={2} lg={3} className="g-3">
        {selectedWorkspace?.id ? workspaceNoteList : notesList}
      </Row>
    </>
  )
}
