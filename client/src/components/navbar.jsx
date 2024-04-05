// import Container from 'react-bootstrap/Container'
import {Nav, Navbar, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <>
      <Navbar expand="lg" className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand>LayoutIndex</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to={'/'}>Locations</Nav.Link>
            <Nav.Link as={Link} to={'/device'}>Device</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default navbar