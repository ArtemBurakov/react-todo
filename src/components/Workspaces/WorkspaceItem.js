import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Col, Card } from 'react-bootstrap'

import { setSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

export default function WorkspaceItem({ workspace }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onWorkspaceItemClick = () => {
    dispatch(setSelectedWorkspace(workspace))
    navigate(`/workspaces/${workspace.id}`)
  }

  return (
    <Col>
      <Card>
        <Card.Body onClick={onWorkspaceItemClick}>{workspace.name}</Card.Body>
      </Card>
    </Col>
  )
}
