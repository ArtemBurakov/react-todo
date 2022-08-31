import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col, Card, Button } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <h3 className="text-center mb-3">Welcome to Todo!</h3>
      <Row className="justify-content-center">
        <Col lg={7}>
          <h5 className="text-center mb-4">
            Remember everything and tackle any project with notes, tasks, and
            organize all in one place with workspaces.
          </h5>
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Tasks</Card.Title>
              <Card.Text>
                Writing your tasks on a list can help you increase productivity
                and decrease stress. Also tasks allows you to better manage your
                time.
              </Card.Text>
              <Button variant="primary" as={Link} to="/tasks">
                Open Tasks
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Notes</Card.Title>
              <Card.Text>
                Create any notes to record important information, customize and
                extend them with new features by adding tasks to make a
                checklist.
              </Card.Text>
              <Button variant="primary" as={Link} to="/notes">
                Open Notes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Workspaces</Card.Title>
              <Card.Text>
                Notes and tasks are the building blocks for organizing your work
                in the Todo workspace, allowing you to reach new peaks of
                productivity.
              </Card.Text>
              <Button variant="primary" as={Link} to="/workspaces">
                Open Workspaces
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
