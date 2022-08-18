import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onLogoutClick = () => {
    setAuth(null)
    localStorage.removeItem('user')
    navigate('login', { replace: true })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Todo
        </Navbar.Brand>
        {auth ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav activeKey={location.pathname} className="me-auto">
                <Nav.Link as={Link} to="/" eventKey="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="tasks" eventKey="/tasks">
                  Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="notes" eventKey="/notes">
                  Notes
                </Nav.Link>
                <Nav.Link as={Link} to="workspaces" eventKey="/workspaces">
                  Workspaces
                </Nav.Link>
              </Nav>
              <Button variant="outline-danger" onClick={onLogoutClick}>
                Logout
              </Button>
            </Navbar.Collapse>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  )
}
