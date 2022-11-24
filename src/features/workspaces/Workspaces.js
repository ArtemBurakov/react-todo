import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert } from 'react-bootstrap'

import WorkspacesList from '../../components/Workspaces/WorkspacesList'
import WorkspacesFilterForm from '../../components/Workspaces/WorkspacesFilterForm'
import LoadingWorkspacesList from '../../components/Workspaces/LoadingWorkspacesList'

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

  useEffect(() => {
    dispatch(fetchWorkspaces(access_token))
  }, [])

  if (responseError)
    return (
      <>
        <h4>Workspaces</h4>
        <Alert variant="warning">{responseError}</Alert>
      </>
    )

  return (
    <>
      <h4>Workspaces</h4>
      <WorkspacesFilterForm />
      {fetchWorkspacesLoading === 'pending' ? (
        <LoadingWorkspacesList />
      ) : (
        <WorkspacesList />
      )}
    </>
  )
}
