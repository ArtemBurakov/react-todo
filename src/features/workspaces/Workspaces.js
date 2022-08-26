import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert, Button, Spinner } from 'react-bootstrap'

import AddWorkspace from '../../components/Workspaces/AddWorkspace'
import WorkspacesList from '../../components/Workspaces/WorkspacesList'
import {
  fetchWorkspaces,
  getWorkspacesError,
  getWorkspacesLoading,
} from './workspacesSlice'
import { getUser } from '../user/userSlice'

export default function Workspaces() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getWorkspacesError)
  const workspacesLoading = useSelector(getWorkspacesLoading)
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
          {workspacesLoading === 'pending' ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            <>
              <Button className="mb-3" variant="primary" onClick={handleShow}>
                Add Workspace
              </Button>
              <WorkspacesList />
            </>
          )}
          {show ? (
            <AddWorkspace show={show} handleClose={handleClose} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
}
