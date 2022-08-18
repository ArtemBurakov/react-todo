import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SignupForm({
  setUsername,
  setEmail,
  setPassword,
  onSignupClick,
  signupSuccess,
  formErrors,
  isLoading,
  responseError,
}) {
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
    <Row className="mt-3 justify-content-center">
      <Col className="col-md-8 col-lg-6">
        {signupSuccess ? (
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
            {responseError.displayError ? (
              <Alert variant="warning">{responseError.errorMessage}</Alert>
            ) : (
              <></>
            )}
            <Form>
              <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleInputUsername}
                  isInvalid={!!formErrors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleInputEmail}
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputPassword}
                  isInvalid={!!formErrors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                {isLoading ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                ) : (
                  <Button variant="primary" onClick={onSignupClick}>
                    Signup
                  </Button>
                )}
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
