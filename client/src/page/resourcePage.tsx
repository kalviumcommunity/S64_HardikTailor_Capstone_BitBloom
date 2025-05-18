import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResourceCard from '../components/resourceCard';
import heroImage from '../assets/Working remotely.gif';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ResourcePage.module.css';
import '../styles/common.css'; // Import common styles

interface Resource {
  _id: string;
  title: string;
  description: string;
  isFree: boolean;
  price?: number;
  file?: string;
  user: {
    username: string;
    email: string;
  };
}

const Resources: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
  }, [resources]); // Re-run when resources are loaded
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources'); 
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        console.log('Resources fetched:', data);
        setResources(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching resources:', err);
          setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchResources();
  }, []);

  return (
    <div className="bitbloom-app bg-light text-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-lg-start">
              <h1 className="animate-in visible">
                Discover & Monetize<br />Digital Resources
              </h1>
              <p className="lead mb-3 animate-in visible">
                Explore a vast collection of templates, code snippets, UI kits, and more.
              </p>
              <p className="text-muted mb-4 animate-in visible">
                Upload your own and start earning today!
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start animate-in visible">
                <button className="custom-btn custom-btn-resource">
                  <i className="bi bi-search me-2"></i>Explore
                </button>
                <button className="custom-outline-btn custom-outline-btn-resource" onClick={() => navigate('/uploadresource')}>
                  <i className="bi bi-upload me-2"></i>Upload
                </button>
              </div>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img 
                src={heroImage} 
                alt="Digital Resources" 
                className="img-fluid " 
                style={{ maxHeight: '550px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resource Cards Section */}
      <section className="py-5 bg-white">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading animate-in visible">Latest Insights and Trends</h2>

          {/* Loading and Error Handling */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status" style={{ color: 'var(--resource-color)' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          ) : (
            <Row xs={1} md={2} xl={4} className="g-4">
              {/* Mapping over resources */}
              {resources.map((res, idx) => (
                <Col key={idx} className="d-flex justify-content-center">
                  <div className="animate-in visible" style={{ width: '100%', animationDelay: `${idx * 0.1}s` }}>
                    <ResourceCard 
                      title={res.title} 
                      description={res.description} 
                      _id={res._id} 
                      file={res.file}
                      isFree={res.isFree}
                      price={res.price}
                      user={res.user}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* View All Button */}
          <div className="text-end mt-4">
            <button 
              className="btn btn-link text-decoration-none animate-in visible"
              onClick={() => navigate('/resources-feed')}
              style={{ color: 'var(--resource-color)' }}
            >
              View all resources <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </Container>
      </section>

      {/* Trending Section */}
      <section className="py-5 bg-light">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading animate-in visible">Trending</h2>
          <div className="card animate-in visible">
            <Row>
              <Col md={8}>
                <h5 className="card-title">React Dashboard Template</h5>
                <p className="text-muted">
                  A comprehensive dashboard template built with React, featuring responsive layouts, 
                  dark mode, and integration with popular chart libraries.
                </p>
                <div className="d-flex gap-2 mt-3">
                  <span className={styles.trendingTag}>UI Kit</span>
                  <span className={styles.trendingTag}>React</span>
                  <span className={styles.trendingTag}>Dashboard</span>
                </div>
              </Col>
              <Col md={4} className="d-flex flex-column justify-content-center align-items-end mt-3 mt-md-0">
                <small className="text-muted">By Alex Dev</small>
                <div className="d-flex gap-2 mt-2">
                  <button className="custom-outline-btn custom-outline-btn-resource btn-sm">
                    View
                  </button>
                  <button className="custom-btn custom-btn-resource btn-sm">
                    Buy
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Community Section */}
      <section className="call-to-action">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-4 animate-in visible">Join Our Creative Community</h2>
              <p className="text-muted mb-4 animate-in visible">
                Dive into our extensive library of resources or share your own creations with the world.
                Start your journey with us today!
              </p>
              <div className="d-flex flex-wrap gap-3 animate-in visible">
                <button className="custom-btn custom-btn-resource" onClick={() => navigate('/uploadresource')}>
                  <i className="bi bi-cloud-upload me-2"></i>Start Uploading
                </button>
                <button className="custom-outline-btn custom-outline-btn-resource">
                  Learn More
                </button>
              </div>
            </Col>
            <Col md={6} className="text-end mt-4 mt-md-0">
              <p className="text-muted animate-in visible">
                Join thousands of creators who are already sharing their work and earning through BitBloom.
                Our community is growing every day with talented developers and designers.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
     
      <Footer />
    </div>
  );
};

export default Resources;
