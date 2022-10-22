import React from 'react'

import { Col, Card } from 'react-bootstrap'

export default function AddNewWorkspaceItem({ handleShow }) {
  return (
    <Col className="add-workspace">
      <Card onClick={handleShow}>
        <Card.Body>Create new workspace</Card.Body>
      </Card>
    </Col>
  )
}
