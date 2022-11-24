import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Button, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import './../../components/Workspace/Workspace.css'
import Notes from '../notes/Notes'
import AddNote from '../../components/Notes/AddNote'
import NotesOffCanvas from '../../components/Notes/NotesOffCanvas'
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
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const handleShowWorkspaceModal = () => setShowWorkspaceModal(true)
  const handleCloseWorkspaceModal = () => setShowWorkspaceModal(false)

  const handleShowAddNoteModal = () => setShowAddNoteModal(true)
  const handleCloseAddNoteModal = () => setShowAddNoteModal(false)

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
          <Row className="mb-3">
            <div className="workspace-header">
              <div className="offcanvas-button">
                <NotesOffCanvas />
              </div>
              <div className="body text-truncate h4">
                {selectedWorkspace?.name}
              </div>
              <div className="create-button">
                <Button
                  variant="outline-dark"
                  onClick={handleShowWorkspaceModal}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button onClick={handleShowAddNoteModal}>Create new</Button>
              </div>
            </div>
          </Row>
        )}
      </div>
      <Notes />
      {showWorkspaceModal && (
        <WorkspaceModal
          show={showWorkspaceModal}
          handleClose={handleCloseWorkspaceModal}
        />
      )}
      {showAddNoteModal && (
        <AddNote
          show={showAddNoteModal}
          handleClose={handleCloseAddNoteModal}
        />
      )}
    </>
  )
}
