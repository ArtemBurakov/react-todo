import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Modal, Button } from 'react-bootstrap'

import Loader from '../Loader/Loader'

import {
  addWorkspace,
  getAddWorkspaceLoading,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'

export default function AddWorkspace({ show, handleClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const { id, access_token } = useSelector(getUser)
  const addWorkspaceLoading = useSelector(getAddWorkspaceLoading)

  const handleInputName = (event) => setName(event.target.value)

  const onAddWorkspaceClick = async () => {
    if (addWorkspaceLoading === 'idle') {
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
        <Loader
          loading={addWorkspaceLoading}
          onClick={onAddWorkspaceClick}
          buttonText="Add Workspace"
        />
      </Modal.Footer>
    </Modal>
  )
}
