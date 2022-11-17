import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Modal, Button } from 'react-bootstrap'

import Loader from '../../Loader/Loader'
import {
  updateWorkspace,
  getUpdateWorkspaceLoading,
  getSelectedWorkspace,
} from '../../../features/workspaces/workspacesSlice'
import { getUser } from '../../../features/user/userSlice'

const DELETED_WORKSPACE_STATUS = 0

export default function WorkspaceModal({ show, handleClose }) {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  const updateWorkspaceLoading = useSelector(getUpdateWorkspaceLoading)

  const [name, setName] = useState(selectedWorkspace.name)
  const [status, setStatus] = useState(selectedWorkspace.status)

  const handleInputName = (event) => setName(event.target.value)

  const onSaveChangesClick = async (workspaceStatus = status) => {
    if (updateWorkspaceLoading === 'idle') {
      const workspaceId = selectedWorkspace.id
      await dispatch(
        updateWorkspace({ access_token, workspaceId, name, workspaceStatus })
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
            <Form.Control type="text" value={name} onChange={handleInputName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <p className="mb-2">Actions</p>
            <Button
              variant="danger"
              onClick={() => {
                onSaveChangesClick(DELETED_WORKSPACE_STATUS)
              }}
            >
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
          onClick={() => {
            onSaveChangesClick()
          }}
          buttonText="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  )
}
