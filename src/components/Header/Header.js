import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { Nav, Navbar, Button, Container } from 'react-bootstrap'

import { removeUser } from '../../features/user/userSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user.user)

  const onLogoutClick = () => {
    dispatch(removeUser())
    navigate('login', { replace: true })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Todo
        </Navbar.Brand>
        {user ? (
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
