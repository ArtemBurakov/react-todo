import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import './../../components/Workspace/Workspace.css'
import Notes from '../notes/Notes'
import LoadingWorkspace from '../../components/Workspaces/LoadingWorkspace'
import WorkspaceModal from '../../components/Modal/Workspaces/WorkspaceModal'
import {
  fetchWorkspace,
  getSelectedWorkspace,
  getFetchWorkspaceLoading,
  removeSelectedWorkspace,
} from './workspacesSlice'
import { getUser } from '../user/userSlice'

export default function Workspace() {
  const dispatch = useDispatch()
  const { workspaceId } = useParams()
  const { access_token } = useSelector(getUser)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  const fetchWorkspaceLoading = useSelector(getFetchWorkspaceLoading)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    if (!selectedWorkspace)
      dispatch(fetchWorkspace({ access_token, workspaceId }))

    return () => {
      dispatch(removeSelectedWorkspace())
    }
  }, [])

  return (
    <>
      <div className="mb-3">
        {fetchWorkspaceLoading === 'pending' ? (
          <LoadingWorkspace />
        ) : (
          <div className="workspace-header">
            <h4>{selectedWorkspace?.name}</h4>
            <Button variant="outline-dark" onClick={handleShow}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
          </div>
        )}
      </div>
      <Notes />
      {show && <WorkspaceModal show={show} handleClose={handleClose} />}
    </>
  )
}
