import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import {
  getTasks,
  updateTask,
  getTasksLoading,
} from '../../features/tasks/tasksSlice'
import { getUser } from '../../features/user/userSlice'
import TaskItem from './TaskItem'

export default function TasksList({ note, type }) {
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks)
  const { access_token } = useSelector(getUser)
  const tasksLoading = useSelector(getTasksLoading)

  const onDoneTaskClick = (taskId, status) => {
    if (tasksLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  const onUnDoneTaskClick = (taskId, status) => {
    if (tasksLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  const onDeleteTaskClick = (taskId, status) => {
    if (tasksLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  const noteTasksList = tasks.map((task) =>
    task.note_id === note?.id && task.status !== 0 ? (
      <TaskItem
        key={task.id}
        task={task}
        type={type}
        onDoneTaskClick={onDoneTaskClick}
        onUnDoneTaskClick={onUnDoneTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
      />
    ) : null
  )

  const tasksList = tasks.map((task) =>
    task.note_id === null && task.status !== 0 ? (
      <TaskItem
        key={task.id}
        task={task}
        onDoneTaskClick={onDoneTaskClick}
        onUnDoneTaskClick={onUnDoneTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
      />
    ) : null
  )

  return (
    <ListGroup className="list-group-flush">
      {note ? noteTasksList : tasksList}
    </ListGroup>
  )
}
