import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import '../styles/navbar.css';
import '../App.css';

const Navbar = () => {
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm py-3 animated-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="BitBloom Logo"
            height="85"
            width="115"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-4">
            <Nav.Link as={Link} to="/home" className="nav-link-animated">Home</Nav.Link>
            <Nav.Link as={Link} to="/resource" className="nav-link-animated">Resources</Nav.Link>
            <Nav.Link as={Link} to="/opensource" className="nav-link-animated">Open Source</Nav.Link>
            <Nav.Link as={Link} to="/coding" className="nav-link-animated">Coding Challenges</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
