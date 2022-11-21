import React from 'react'

import { Row, Placeholder } from 'react-bootstrap'

import './../Workspace/Workspace.css'
export default function LoadingWorkspace() {
  return (
    <Row className="mb-3">
      <div className="workspace-header">
        <div className="body text-truncate h4">
          <Placeholder as="h4" animation="glow">
            <Placeholder xs={7} />
          </Placeholder>
        </div>
        <div className="create-button">
          <Placeholder.Button aria-hidden="true" variant="secondary" />
          <Placeholder.Button aria-hidden="true" variant="secondary" />
        </div>
      </div>
    </Row>
  )
}
