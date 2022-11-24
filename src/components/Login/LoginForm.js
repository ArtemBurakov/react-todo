import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Row, Col, Form, Alert } from 'react-bootstrap'

import Loader from '../Loader/Loader'

import {
  getUserLoading,
  getUserLoginEvent,
} from '../../features/user/userSlice'

export default function LoginForm({ setUsername, setPassword, onLoginClick }) {
  const userLoading = useSelector(getUserLoading)
  const userLoginEvent = useSelector(getUserLoginEvent)

  const handleInputUsername = (event) => setUsername(event.target.value)

  const handleInputPassword = (event) => setPassword(event.target.value)

  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-6">
        <h3 className="text-center">Login</h3>
        {userLoginEvent.errorMessage && (
          <Alert variant="warning">{userLoginEvent.errorMessage}</Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={handleInputUsername}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputPassword}
            />
          </Form.Group>
          <div className="text-center">
            <Loader
              loading={userLoading}
              onClick={onLoginClick}
              buttonText="Login"
            />
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Signup.</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
