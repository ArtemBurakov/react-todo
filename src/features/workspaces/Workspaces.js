import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert, Button } from 'react-bootstrap'

import AddWorkspace from '../../components/Workspaces/AddWorkspace'
import LoadingWorkspacesList from '../../components/Workspaces/LoadingWorkspacesList'
import WorkspacesList from '../../components/Workspaces/WorkspacesList'
import {
  fetchWorkspaces,
  getWorkspacesError,
  getFetchWorkspacesLoading,
} from './workspacesSlice'
import { getUser } from '../user/userSlice'

export default function Workspaces() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getWorkspacesError)
  const fetchWorkspacesLoading = useSelector(getFetchWorkspacesLoading)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    dispatch(fetchWorkspaces(access_token))
  }, [])

  return (
    <>
      {responseError ? (
        <Alert variant="warning">{responseError}</Alert>
      ) : (
        <>
          <h4>Your workspaces list</h4>
          <Button className="mb-3" variant="primary" onClick={handleShow}>
            Add Workspace
          </Button>
          {fetchWorkspacesLoading === 'pending' ? (
            <LoadingWorkspacesList />
          ) : (
            <WorkspacesList />
          )}
          {show && <AddWorkspace show={show} handleClose={handleClose} />}
        </>
      )}
    </>
  )
}
