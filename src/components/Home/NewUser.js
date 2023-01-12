import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Col, Row, Button } from 'react-bootstrap'

import { ReactComponent as TasksSvg } from '../../common/images/tasks.svg'
import { ReactComponent as NotesSvg } from '../../common/images/notes.svg'
import { ReactComponent as WorkspacesSvg } from '../../common/images/workspaces.svg'

export default function NewUser() {
  return (
    <>
      <div className="px-4 my-5 text-center">
        <h1 className="display-5 fw-bold">
          It looks like you are here for the first time!
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Start by creating your first tasks, notes, or workspaces
          </p>
        </div>
      </div>
      <Container className="px-4 pt-3 pb-5">
        <h2 className="pb-2 border-bottom">App features</h2>
        <Row className="g-4 pt-3 pb-4 row-cols-1 row-cols-lg-3">
          <Col className="feature">
            <div className="feature-icon">
              <TasksSvg />
            </div>
            <h2>Tasks</h2>
            <p>
              Writing your tasks on a list can help you increase productivity
              and decrease stress. Also tasks allows you to better manage your
              time.
            </p>
            <Button as={Link} to="/tasks" variant="outline-primary">
              Tasks
            </Button>
          </Col>
          <Col className="feature">
            <div className="feature-icon">
              <NotesSvg />
            </div>
            <h2>Notes</h2>
            <p>
              Create any notes to record important information, customize and
              extend them with new features by adding tasks to make a checklist.
            </p>
            <Button as={Link} to="/notes" variant="outline-primary">
              Notes
            </Button>
          </Col>
          <Col className="feature">
            <div className="feature-icon">
              <WorkspacesSvg />
            </div>
            <h2>Workspaces</h2>
            <p>
              Notes and tasks are the building blocks for organizing your work
              in the Todo workspace, allowing you to reach new peaks of
              productivity.
            </p>
            <Button as={Link} to="/workspaces" variant="outline-primary">
              Workspaces
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}
