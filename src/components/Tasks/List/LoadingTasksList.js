import React from 'react'

import { Stack, ListGroup, Placeholder } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons'

import { DEFAULT_MAX_TASKS_IN_LOADING } from '../../../app/constants'

export default function LoadingTasksList({
  numberOfTasks = DEFAULT_MAX_TASKS_IN_LOADING,
}) {
  return (
    <ListGroup className="list-group-flush">
      {[...Array(numberOfTasks)].map((e, i) => (
        <ListGroup.Item key={i}>
          <Stack direction="horizontal" gap={3}>
            <Placeholder className="mb-0" as="p" animation="glow" xs={7}>
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder.Button className="ms-auto" variant="success">
              <FontAwesomeIcon icon={faCheck} />
            </Placeholder.Button>
            <div className="vr" />
            <Placeholder.Button variant="danger">
              <FontAwesomeIcon icon={faTrashCan} />
            </Placeholder.Button>
          </Stack>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
