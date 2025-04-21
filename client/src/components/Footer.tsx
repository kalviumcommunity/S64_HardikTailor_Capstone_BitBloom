import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-white py-5 border-top">
      <Container className='bg-white'>
        {/* Top Content */}
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-semibold mb-3">Stay Connected with Our Community</h5>
            <p className="text-muted">
              Join us in exploring, creating, and sharing digital resources that inspire innovation.
            </p>
          </Col>

          <Col md={8}>
            <Row>
              <Col xs={6} md={4}>
                <h6 className="fw-bold mb-3">About</h6>
                <ul className="list-unstyled text-muted">
                  <li><a href="#" className="text-decoration-none text-muted">Contact</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">About Us</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Support Center</a></li>
                </ul>
              </Col>

              <Col xs={6} md={4}>
                <h6 className="fw-bold mb-3">Legal</h6>
                <ul className="list-unstyled text-muted">
                  <li><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Terms of Use</a></li>
                </ul>
              </Col>

              <Col xs={6} md={4}>
                <h6 className="fw-bold mb-3">Community</h6>
                <ul className="list-unstyled text-muted">
                  <li><a href="#" className="text-decoration-none text-muted">GitHub Page</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Twitter Feed</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">LinkedIn Group</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Community Forum</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Blog Posts</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">Help Center</a></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="my-4" />

        {/* Bottom Row */}
        <div className="d-flex justify-content-between align-items-center text-muted small">
          <div className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="BitBloom Logo"
              height="55"
              width="55"
              style={{ objectFit: 'cover', borderRadius: '5px' }}
            />
            <span className="fw-semibold">BitBloom</span>
          </div>
          <div>© 2025 BitBloom. All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
