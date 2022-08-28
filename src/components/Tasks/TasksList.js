import React from 'react'
import { useSelector } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import TaskItem from './TaskItem'
import { getTasks } from '../../features/tasks/tasksSlice'

export default function TasksList({ note, type }) {
  const tasks = useSelector(getTasks)

  const noteTasksList = tasks.map((task) =>
    task.note_id === note?.id && task.status !== 0 ? (
      <TaskItem key={task.id} task={task} type={type} />
    ) : null
  )

  const tasksList = tasks.map((task) =>
    task.note_id === null && task.status !== 0 ? (
      <TaskItem key={task.id} task={task} />
    ) : null
  )

  return (
    <ListGroup className="list-group-flush">
      {note ? noteTasksList : tasksList}
    </ListGroup>
  )
}
