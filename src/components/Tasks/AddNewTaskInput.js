import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, InputGroup } from 'react-bootstrap'

import Loader from '../Loader/Loader'
import {
  NOTE_TYPE_WITHOUT_TASKS,
  NOTE_TYPE_WITH_TASKS,
} from '../../app/constants'

import { getUser } from '../../features/user/userSlice'
import { getSelectedNote, updateNote } from '../../features/notes/notesSlice'
import { addTask, getAddTaskLoading } from '../../features/tasks/tasksSlice'

export default function AddNewTaskInput() {
  const taskInput = useRef()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const { id, access_token } = useSelector(getUser)
  const selectedNote = useSelector(getSelectedNote)
  const addTaskLoading = useSelector(getAddTaskLoading)

  const handleInputName = (event) => setName(event.target.value)

  const onAddNewTaskClick = async () => {
    if (typeof name === 'string' && name !== '') {
      if (addTaskLoading === 'idle') {
        const noteId = selectedNote?.id
        await dispatch(addTask({ id, access_token, noteId, name }))
        setName('')
        if (selectedNote?.type === NOTE_TYPE_WITHOUT_TASKS) {
          const type = NOTE_TYPE_WITH_TASKS
          await dispatch(updateNote({ access_token, noteId, type }))
        }
      }
    } else {
      taskInput.current.focus()
    }
  }

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Enter task name here..."
        aria-describedby="addNewTask"
        value={name}
        ref={taskInput}
        onChange={handleInputName}
      />
      <Loader
        style="outline-primary"
        loading={addTaskLoading}
        onClick={onAddNewTaskClick}
        buttonText="Add new task"
      />
    </InputGroup>
  )
}
