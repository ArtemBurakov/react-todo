import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Modal, Button, Spinner } from 'react-bootstrap'

import {
  addWorkspace,
  getWorkspacesLoading,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'

export default function AddWorkspace({ show, handleClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const { id, access_token } = useSelector(getUser)
  const workspacesLoading = useSelector(getWorkspacesLoading)

  const handleInputName = (event) => setName(event.target.value)

  const onAddWorkspaceClick = async () => {
    if (workspacesLoading === 'idle') {
      await dispatch(addWorkspace({ id, access_token, name }))
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workspace name here..."
              autoFocus
              onChange={handleInputName}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {workspacesLoading === 'pending' ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={onAddWorkspaceClick}>
            Add Workspace
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
