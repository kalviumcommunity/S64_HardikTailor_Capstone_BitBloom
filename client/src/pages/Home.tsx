// client/src/pages/HomePage.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
  return (
    <Container
      fluid
      className=" text-dark d-flex justify-content-center align-items-center vh-900"
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-3 fw-bold mb-4">
            Welcome to <span className="text-primary">BitBloom</span> 🌱
          </h1>
          <p className="lead mb-5 px-3">
            Monetize your digital creations, explore coding problems, and contribute to open-source projects — all in one place.
          </p>
          <div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
