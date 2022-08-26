import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Row } from 'react-bootstrap'

import WorkspaceItem from './WorkspaceItem'
import {
  getWorkspaces,
  setSelectedWorkspace,
} from '../../features/workspaces/workspacesSlice'

export default function WorkspacesList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const workspaces = useSelector(getWorkspaces)

  const workspacesList = workspaces.map((workspace) =>
    workspace.status === 10 ? (
      <WorkspaceItem
        workspace={workspace}
        key={workspace.id}
        onClick={() => {
          dispatch(setSelectedWorkspace(workspace))
          navigate(`${workspace.id}`)
        }}
      />
    ) : null
  )

  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {workspacesList}
    </Row>
  )
}
