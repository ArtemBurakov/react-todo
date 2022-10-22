import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert } from 'react-bootstrap'

import LoadingWorkspacesList from '../../components/Workspaces/LoadingWorkspacesList'
import WorkspacesList from '../../components/Workspaces/WorkspacesList'
import {
  fetchWorkspaces,
  getWorkspacesError,
  getFetchWorkspacesLoading,
} from './workspacesSlice'
import { getUser } from '../user/userSlice'
import WorkspacesFilterForm from '../../components/Workspaces/WorkspacesFilterForm'

export default function Workspaces() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getWorkspacesError)
  const fetchWorkspacesLoading = useSelector(getFetchWorkspacesLoading)

  useEffect(() => {
    dispatch(fetchWorkspaces(access_token))
  }, [])

  return (
    <>
      {responseError ? (
        <Alert variant="warning">{responseError}</Alert>
      ) : (
        <>
          <h4>Workspaces</h4>
          <WorkspacesFilterForm />
          {fetchWorkspacesLoading === 'pending' ? (
            <LoadingWorkspacesList />
          ) : (
            <WorkspacesList />
          )}
        </>
      )}
    </>
  )
}
