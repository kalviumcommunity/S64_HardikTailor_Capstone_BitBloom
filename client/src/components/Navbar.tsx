import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import  '../App.css';

const Navbar = () => {
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/explore" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="BitBloom Logo"
            height="85"
            width="85"
            style={{ objectFit: 'cover', borderRadius: '0.5px' }}
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={Link} to="/" className="text-dark fw-medium">Home</Nav.Link>
            <Nav.Link as={Link} to="/resource" className="text-dark fw-medium">Resources</Nav.Link>
            <Nav.Link as={Link} to="/opensource" className="text-dark fw-medium">Open Source</Nav.Link>
            <Nav.Link as={Link} to="/coding" className="text-dark fw-medium">Coding Challenges</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
