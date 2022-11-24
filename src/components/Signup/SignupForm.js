import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Row, Col, Form, Alert } from 'react-bootstrap'

import Loader from '../Loader/Loader'

import {
  getUserLoading,
  getUserSignupEvent,
} from '../../features/user/userSlice'

export default function SignupForm({
  setUsername,
  setEmail,
  setPassword,
  onSignupClick,
}) {
  const userLoading = useSelector(getUserLoading)
  const userSignupEvent = useSelector(getUserSignupEvent)

  const handleInputUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleInputEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleInputPassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-6">
        {userSignupEvent.status === 'success' ? (
          <Alert variant="success">
            <Alert.Heading>Thank you for the registration!</Alert.Heading>
            <p>
              Your account has been created.{' '}
              <Alert.Link as={Link} to="/login">
                Login to your account.
              </Alert.Link>
            </p>
          </Alert>
        ) : (
          <>
            <h3 className="text-center">Signup</h3>
            {userSignupEvent.errorMessage && (
              <Alert variant="warning">{userSignupEvent.errorMessage}</Alert>
            )}
            <Form>
              <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleInputUsername}
                  isInvalid={!!userSignupEvent.formError?.username}
                />
                <Form.Control.Feedback type="invalid">
                  {userSignupEvent.formError?.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleInputEmail}
                  isInvalid={!!userSignupEvent.formError?.email}
                />
                <Form.Control.Feedback type="invalid">
                  {userSignupEvent.formError?.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputPassword}
                  isInvalid={!!userSignupEvent.formError?.password}
                />
                <Form.Control.Feedback type="invalid">
                  {userSignupEvent.formError?.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                <Loader
                  loading={userLoading}
                  onClick={onSignupClick}
                  buttonText="Signup"
                />
                <p className="mt-3">
                  Already have an account? <Link to="/login">Login.</Link>
                </p>
              </div>
            </Form>
          </>
        )}
      </Col>
    </Row>
  )
}
