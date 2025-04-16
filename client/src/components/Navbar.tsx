import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import  '../App.css';

const Navbar = () => {
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="BitBloom Logo"
            height="45"
            width="45"
            style={{ objectFit: 'cover', borderRadius: '3px' }}
          />
          <span className="fw-bold fs-4 text-dark mb-0">BitBloom</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={Link} to="/" className="text-dark fw-medium">Home</Nav.Link>
            <Nav.Link as={Link} to="/explore" className="text-dark fw-medium">Explore</Nav.Link>
            <Nav.Link as={Link} to="/resources" className="text-dark fw-medium">Resources</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-dark fw-medium">Login</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
