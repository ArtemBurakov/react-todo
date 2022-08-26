import React from 'react'

import { Stack, Button, ListGroup } from 'react-bootstrap'
import {
  faTrashCan,
  faCheck,
  faRotateBack,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskItem({
  task,
  type = 'default',
  onDoneTaskClick,
  onUnDoneTaskClick,
  onDeleteTaskClick,
}) {
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
