import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Button, InputGroup } from 'react-bootstrap'

import { getUser } from '../../features/user/userSlice'
import { getSelectedNote } from '../../features/notes/notesSlice'
import { addTask, getTasksLoading } from '../../features/tasks/tasksSlice'

export default function AddNewTaskInput() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const { id, access_token } = useSelector(getUser)
  const selectedNote = useSelector(getSelectedNote)
  const tasksLoading = useSelector(getTasksLoading)

  const handleInputName = (event) => setName(event.target.value)

  const onAddNewTaskClick = async () => {
    if (typeof name === 'string' && name !== '') {
      if (tasksLoading === 'idle') {
        const note_id = selectedNote?.id
        await dispatch(addTask({ id, access_token, note_id, name }))
        setName('')
      }
    }
  }
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Enter task name here..."
        aria-describedby="addNewTask"
        value={name}
        onChange={handleInputName}
      />
      <Button
        variant="outline-primary"
        id="addNewTask"
        onClick={onAddNewTaskClick}
      >
        Add new task
      </Button>
    </InputGroup>
  )
}
