import React from 'react'

import { Col, Card } from 'react-bootstrap'

export default function WorkspaceItem({ workspace, onClick }) {
  return (
    <Col>
      <Card>
        <Card.Body onClick={onClick}>{workspace.name}</Card.Body>
      </Card>
    </Col>
  )
}
