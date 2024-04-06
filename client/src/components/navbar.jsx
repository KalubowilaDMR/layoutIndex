// import Container from 'react-bootstrap/Container'
import {Nav, Navbar, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <>
      <Navbar expand="lg" className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand className='text-primary' style={{ fontSize : '2rem', fontWeight : 'bolder' }}>LayoutIndex</Navbar.Brand>
          <Nav className='mx-auto'>
            <Nav.Link style={{ fontSize : '1.2rem', fontWeight : 'bolder' }} as={Link} to={'/'}>Locations</Nav.Link>
            <Nav.Link style={{ fontSize : '1.2rem', fontWeight : 'bolder' }} as={Link} to={'/device'}>Device</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default navbar