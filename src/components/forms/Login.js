import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function LoginForm({
  setUsername,
  setPassword,
  onLoginClick,
  isLoading,
  responseError,
}) {
  const handleInputUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleInputPassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Row className="mt-3 justify-content-center">
      <Col className="col-md-8 col-lg-6">
        <h3 className="text-center">Login</h3>
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
              <Button variant="primary" onClick={onLoginClick}>
                Login
              </Button>
            )}
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Signup.</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
