import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
  const { auth, setAuth } = useAuth()

  const onLogoutClick = () => {
    setAuth({})
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="">
          Todo
        </Navbar.Brand>
        {auth?.user ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="" eventKey="1">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="tasks" eventKey="2">
                  Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="notes" eventKey="3">
                  Notes
                </Nav.Link>
                <Nav.Link as={Link} to="workspaces" eventKey="4">
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
