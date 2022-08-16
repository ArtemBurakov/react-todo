import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Tasks</Nav.Link>
            <Nav.Link>Notes</Nav.Link>
            <Nav.Link>Workspaces</Nav.Link>
          </Nav>
          <Button variant="outline-danger">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
