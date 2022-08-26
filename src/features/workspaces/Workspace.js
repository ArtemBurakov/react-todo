import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Button } from 'react-bootstrap'

import Notes from '../notes/Notes'
import WorkspaceModal from '../../components/Workspaces/WorkspaceModal'
import {
  fetchWorkspace,
  getSelectedWorkspace,
  removeSelectedWorkspace,
} from './workspacesSlice'
import { getUser } from '../user/userSlice'

export default function Workspace() {
  const dispatch = useDispatch()
  const { workspaceId } = useParams()
  const { access_token } = useSelector(getUser)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
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
        <h4 className="mb-3">{selectedWorkspace?.name}</h4>
        <Button variant="secondary" onClick={handleShow}>
          Edit Workspace
        </Button>
      </div>
      <Notes workspace={selectedWorkspace} />

      {show ? <WorkspaceModal show={show} handleClose={handleClose} /> : <></>}
    </>
  )
}
