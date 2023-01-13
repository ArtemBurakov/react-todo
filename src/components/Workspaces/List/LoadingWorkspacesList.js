import React from 'react'

import { Row, Col, Card, Placeholder } from 'react-bootstrap'

import { DEFAULT_MAX_WORKSPACES_IN_LOADING } from '../../../app/constants'

export default function LoadingWorkspacesList({
  numberOfWorkspaces = DEFAULT_MAX_WORKSPACES_IN_LOADING,
}) {
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
