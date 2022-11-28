import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Stack, Button, ListGroup } from 'react-bootstrap'
import {
  faTrashCan,
  faTrashRestore,
  faCheck,
  faRotateBack,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  updateTask,
  getUpdateTaskLoading,
} from '../../../features/tasks/tasksSlice'
import { getUser } from '../../../features/user/userSlice'

const STATUS_ACTIVE = 10
const STATUS_DONE = 20
const STATUS_DELETED = 0

export default function TaskItem({ task, type = 'default' }) {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const updateTaskLoading = useSelector(getUpdateTaskLoading)

  const onUpdateTaskClicked = (taskId, status) => {
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
          <div className="text-truncate">{task.name}</div>
          {task.status === 20 && (
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={(e) => {
                e.currentTarget.blur()
                onUpdateTaskClicked(task.id, STATUS_ACTIVE)
              }}
            >
              <FontAwesomeIcon icon={faRotateBack} />
            </Button>
          )}
          {task.status === 10 && (
            <Button
              className="ms-auto"
              variant="outline-success"
              onClick={(e) => {
                e.currentTarget.blur()
                onUpdateTaskClicked(task.id, STATUS_DONE)
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
          {task.status === 0 ? (
            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={(e) => {
                e.currentTarget.blur()
                onUpdateTaskClicked(task.id, STATUS_ACTIVE)
              }}
            >
              <FontAwesomeIcon icon={faTrashRestore} />
            </Button>
          ) : (
            <>
              <div className="vr" />
              <Button
                variant="outline-danger"
                onClick={(e) => {
                  e.currentTarget.blur()
                  onUpdateTaskClicked(task.id, STATUS_DELETED)
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </>
          )}
        </Stack>
      ) : (
        task.name
      )}
    </ListGroup.Item>
  )
}
