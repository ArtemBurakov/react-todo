import React from 'react'

import { Row, Col, Card, Placeholder } from 'react-bootstrap'

export default function LoadingWorkspacesList({ numberOfWorkspaces = 16 }) {
  return (
    <Row xs={1} md={2} lg={2} xl={3} className="g-3">
      {[...Array(numberOfWorkspaces)].map((e, i) => (
        <Col key={i}>
          <Card>
            <Placeholder as={Card.Body} animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
