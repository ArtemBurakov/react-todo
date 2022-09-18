import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { Nav, Navbar, Button, Container } from 'react-bootstrap'

import Search from '../Search/Search'
import './Header.css'
import { getUser, removeUser } from '../../features/user/userSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(getUser)

  const onLogoutClick = () => {
    dispatch(removeUser())
    navigate('login', { replace: true })
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={require('../../common/logo.svg').default}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          React Todo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={location.pathname} className="me-auto">
            <Nav.Link as={Link} to="/" eventKey="/">
              Home
            </Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="tasks" eventKey="/tasks">
                  Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="notes" eventKey="/notes">
                  Notes
                </Nav.Link>
                <Nav.Link as={Link} to="workspaces" eventKey="/workspaces">
                  Workspaces
                </Nav.Link>
              </>
            )}
          </Nav>
          {user ? (
            <>
              <Search />
              <Button
                className="logout-button"
                variant="outline-danger"
                onClick={onLogoutClick}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-success" as={Link} to="login">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
