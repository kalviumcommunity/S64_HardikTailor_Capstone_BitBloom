import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import hero from '../assets/homeHero.gif';
import { Button, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import '../styles/Home.css';
import '../styles/common.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Refs for animation elements
  const animatedElements = useRef<HTMLElement[]>([]);
  
  // Animation observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Get all elements with animation classes
    const elements = document.querySelectorAll('.animate-in, .slide-in-left, .slide-in-right');
    elements.forEach(el => {
      observer.observe(el);
      animatedElements.current.push(el as HTMLElement);
    });
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="bitbloom-app" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="display-4">Your Space to Innovate</h1>
              <p className="lead mb-4">Ready to Create & Collaborate? Join our community of developers and creators.</p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                {/* Upload Dropdown */}
                <Dropdown>
                  <Dropdown.Toggle className="custom-btn" id="upload-dropdown">
                    <i className="bi bi-cloud-upload me-2"></i>Upload
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/uploadresource">Resource</Dropdown.Item>
                    <Dropdown.Item href="/uploadproject">Open Source Project</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Explore Button */}
                <Button 
                  className="custom-outline-btn" 
                  onClick={() => navigate('/explore')}
                >
                  <i className="bi bi-compass me-2"></i>Explore
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <img
                src={hero}
                alt="BitBloom Hero Illustration"
                className="img-fluid"
                style={{ maxWidth: '470px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <Container className="my-5 py-4">
        <h3 className="text-center section-heading animate-in">Discover</h3>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center animate-in">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3 text-center">
                  <i className="bi bi-palette fs-1 text-primary-light"></i>
                </div>
                <Card.Title>Trending Resources for <strong>Creators</strong></Card.Title>
                <Card.Text className="lead mb-4">
                  Find templates, designs, and code snippets to accelerate your projects.
                </Card.Text>
                <div className="mt-auto">
                  <Button 
                    className="custom-btn w-100" 
                    onClick={() => navigate('/resource')}
                  >
                    View Marketplace
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center animate-in" style={{ animationDelay: '0.2s' }}>
              <Card.Body className="d-flex flex-column">
                <div className="mb-3 text-center">
                  <i className="bi bi-github fs-1 text-primary-light"></i>
                </div>
                <Card.Title>Open-Source Projects for <strong>You</strong></Card.Title>
                <Card.Text className="lead mb-4">
                  Contribute to projects that match your interests and skill level.
                </Card.Text>
                <div className="mt-auto">
                  <Button 
                    className="custom-btn w-100" 
                    onClick={() => navigate('/opensource')}
                  >
                    Find Projects
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center animate-in" style={{ animationDelay: '0.4s' }}>
              <Card.Body className="d-flex flex-column">
                <div className="mb-3 text-center">
                  <i className="bi bi-code-square fs-1 text-primary-light"></i>
                </div>
                <Card.Title>Recommended Coding <strong>Challenges</strong></Card.Title>
                <Card.Text className="lead mb-4">
                  Test your skills with various difficulty levels and improve your coding.
                </Card.Text>
                <div className="mt-auto">
                  <Button className="custom-btn w-100" onClick={() => navigate('/coding')}>Solve Challenges</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Empower Section */}
      <div className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
        <Container>
          <h3 className="text-center mb-4 section-heading slide-in-left">Empower Your Creativity and Collaboration</h3>
          <p className="lead mb-5 text-center mx-auto slide-in-right" style={{ maxWidth: '800px' }}>
            Discover a world of opportunities tailored for creators, contributors, and developers. Whether you're looking to monetize your work or enhance your skills, we have something for everyone.
          </p>
          <Row className="g-4">
            <Col md={4} className="animate-in">
              <div className="benefit-card p-4">
                <h5>
                  <i className="bi bi-cash-coin me-2 text-accent-color"></i>
                  For Creators: Monetize Your Digital Assets
                </h5>
                <p>Easily upload and sell your digital resources while ensuring secure transactions and file access. Build your brand and reach a wider audience.</p>
              </div>
            </Col>
            <Col md={4} className="animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="benefit-card p-4">
                <h5>
                  <i className="bi bi-people me-2 text-accent-color"></i>
                  For Open-Source Contributors: Join the Movement
                </h5>
                <p>Browse and contribute to various open-source projects with direct links to GitHub repositories. Collaborate with developers worldwide.</p>
              </div>
            </Col>
            <Col md={4} className="animate-in" style={{ animationDelay: '0.4s' }}>
              <div className="benefit-card p-4">
                <h5>
                  <i className="bi bi-trophy me-2 text-accent-color"></i>
                  For Developers: Challenge Yourself
                </h5>
                <p>Explore a range of coding challenges categorized by difficulty and get redirected to platforms like LeetCode, CodeForces, and CodeChef.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="text-center py-5 call-to-action">
        <Container>
          <h4 className="mb-3 animate-in">Elevate Your Profile Today!</h4>
          <p className="lead mb-4 animate-in">Showcase your talents by uploading your work and engaging with our vibrant community of creators and developers.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap animate-in">
            <Button className="custom-btn pulse-animation">
              <i className="bi bi-upload me-2"></i>Upload
            </Button>
            <Button className="custom-outline-btn">
              <i className="bi bi-share me-2"></i>Share
            </Button>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
