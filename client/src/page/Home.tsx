import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import hero from '../assets/home.gif';
import { Button, Card, Container, Row, Col , Dropdown } from 'react-bootstrap';
import '../styles/Home.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

<div
  className="hero-section d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 px-4 py-5"
  style={{ backgroundColor: 'light white' }}
>
  {/* Left Content */}
  <div className="text-center text-md-start mb-4 mb-md-0">
    <h1 className="fw-bold display-4 mb-3">Your Space to Innovate</h1>
    <p className="lead">Ready to Create & Collaborate?</p>
    <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
      {/* Upload Dropdown */}
      <Dropdown>
        <Dropdown.Toggle className="custom-btn" id="upload-dropdown">
          Upload
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/uploadresource">Resource</Dropdown.Item>
          <Dropdown.Item href="/uploadproject">Open Source Project</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Explore Button */}
      <Button className="custom-outline-btn">Explore</Button>
    </div>
  </div>

  {/* Right Image */}
  <div className="text-center">
    <img
      src={hero}
      alt="Hero Illustration"
      className="img-fluid"
      style={{ maxWidth: '470px', height: 'auto' }}
    />
  </div>
</div>


      <Container className="my-5">
        <h3 className="text-center mb-4 section-heading">Discover</h3>
        <Row>
          <Col md={4} className="text-muted mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <Card.Title>Trending Resources for <strong>Creators</strong></Card.Title>
                <Card.Text className='lead mb-3'>
                  Find templates, designs, and code snippets.
                </Card.Text>
                <Button className="custom-btn" onClick={() =>navigate('/resource')}>View Marketplace</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <Card.Title>Open-Source Projects for <strong>You</strong></Card.Title>
                <Card.Text className='lead mb-3'>
                  Contribute to projects that match your interests.
                </Card.Text >
                <Button className="custom-btn" onClick={() =>navigate('/opensource')}>Find Projects</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <Card.Title>Recommended Coding <strong>Challenges</strong></Card.Title>
                <Card.Text className='lead mb-3'>
                  Test your skills with various difficulty levels.
                </Card.Text>
                <Button className="custom-btn">Solve Challenges</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className=" text-black py-5" style={{ backgroundColor: '#F5F5F5' }}>
        <Container>
          <h3 className="text-center mb-4">Empower Your Creativity and Collaboration</h3>
          <p className="lead mb-3 text-center mx-auto w-75 mb-5">
            Discover a world of opportunities tailored for creators, contributors, and developers. Whether you're looking to monetize your work or enhance your skills, we have something for everyone.
          </p>
          <Row>
            <Col md={4} className="lead mb-3">
              <h5>For Creators: Monetize Your Digital Assets</h5>
              <p>Easily upload and sell your digital resources while ensuring secure transactions and file access.</p>
            </Col>
            <Col md={4} className="lead mb-3">
              <h5>For Open-Source Contributors: Join the Movement</h5>
              <p>Browse and contribute to various open-source projects with direct links to GitHub repositories.</p>
            </Col>
            <Col md={4} className="lead mb-3">
              <h5>For Developers: Challenge Yourself</h5>
              <p>Explore a range of coding challenges categorized by difficulty and get redirected to platforms like LeetCode, CodeForces, and CodeChef.</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="text-center py-5 call-to-action bg-white">
        <h4 className="mb-3">Elevate Your Profile Today!</h4>
        <p className="lead mb-3">Showcase your talents by uploading your work and engaging with our vibrant community.</p>
        <Button className="custom-btn me-3">Upload</Button>
        <Button className="custom-outline-btn">Share</Button>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
