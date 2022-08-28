import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Stack, Button, ListGroup } from 'react-bootstrap'
import {
  faTrashCan,
  faCheck,
  faRotateBack,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  updateTask,
  getUpdateTaskLoading,
} from '../../features/tasks/tasksSlice'
import { getUser } from '../../features/user/userSlice'

export default function TaskItem({ task, type = 'default' }) {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const updateTaskLoading = useSelector(getUpdateTaskLoading)

  const onDoneTaskClick = (taskId, status) => {
    if (updateTaskLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  const onUnDoneTaskClick = (taskId, status) => {
    if (updateTaskLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  const onDeleteTaskClick = (taskId, status) => {
    if (updateTaskLoading === 'idle')
      dispatch(updateTask({ access_token, taskId, status }))
  }

  return (
    <ListGroup.Item
      className={
        task.status === 20 ? 'text-decoration-line-through text-muted' : null
      }
    >
      {type === 'default' ? (
        <Stack direction="horizontal" gap={3}>
          {task.name}
          {task.status === 20 ? (
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={() => onUnDoneTaskClick(task.id, 10)}
            >
              <FontAwesomeIcon icon={faRotateBack} />
            </Button>
          ) : (
            <Button
              className="ms-auto"
              variant="outline-success"
              onClick={() => onDoneTaskClick(task.id, 20)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
          <div className="vr" />
          <Button
            variant="outline-danger"
            onClick={() => onDeleteTaskClick(task.id, 0)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Stack>
      ) : (
        task.name
      )}
    </ListGroup.Item>
  )
}
