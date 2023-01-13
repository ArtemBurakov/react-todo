import React from 'react'

import { Row, Col, Card, Placeholder } from 'react-bootstrap'

import { DEFAULT_MAX_NOTES_IN_LOADING } from '../../../app/constants'

export default function LoadingNotesList({
  numberOfNotes = DEFAULT_MAX_NOTES_IN_LOADING,
}) {
  return (
    <Row xs={1} md={1} lg={2} xl={3} className="g-3">
      {[...Array(numberOfNotes)].map((e, i) => (
        <Col key={i}>
          <Card>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
            <Card.Footer>
              <Placeholder as="small" animation="glow">
                <Placeholder xs={7} bg="secondary" />
              </Placeholder>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
