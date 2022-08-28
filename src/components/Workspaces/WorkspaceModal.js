import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Modal, Button } from 'react-bootstrap'

import Loader from '../Loader/Loader'
import {
  updateWorkspace,
  getUpdateWorkspaceLoading,
  getSelectedWorkspace,
} from '../../features/workspaces/workspacesSlice'
import { getUser } from '../../features/user/userSlice'

export default function WorkspaceModal({ show, handleClose }) {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  const updateWorkspaceLoading = useSelector(getUpdateWorkspaceLoading)

  const [name, setName] = useState(selectedWorkspace.name)
  const [status, setStatus] = useState(selectedWorkspace.status)

  const handleInputName = (event) => setName(event.target.value)

  const onSaveChangesClick = async () => {
    if (updateWorkspaceLoading === 'idle') {
      const workspaceId = selectedWorkspace.id
      await dispatch(
        updateWorkspace({ access_token, workspaceId, name, status })
      )
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              autoFocus
              onChange={handleInputName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Actions</Form.Label>
            <Button variant="danger" onClick={() => setStatus(0)}>
              Delete
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Loader
          loading={updateWorkspaceLoading}
          onClick={onSaveChangesClick}
          buttonText="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  )
}
