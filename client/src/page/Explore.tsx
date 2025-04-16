import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../assets/Shared workspace.gif';

import '../App.css'
const ExplorePage = () => {
  return (
    <div className="bg-light text-dark">

      {/* Hero Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold display-4 mb-3">
                Share.<br />Collaborate.<br />Grow.
              </h1>
              <p className="lead">
                A platform to monetize digital resources, contribute to open-source, and enhance coding skills.
              </p>
              <p className="text-muted mb-4">
                Empowering creators, developers, and innovators worldwide.
              </p>
              <Button variant="primary" size="lg">Get Started</Button>
            </Col>
            <Col md={6}>
              <img src={heroImage} alt="Hero" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ExplorePage;
