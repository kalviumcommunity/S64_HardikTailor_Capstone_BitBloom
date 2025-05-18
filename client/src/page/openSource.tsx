import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import heroImage from '../assets/OpensourceHero.gif';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/OpenSource.css';
import '../styles/common.css'; // Import common styles

interface Project {
  title: string;
  description: string;
  techStack: string | string[] ; // Can be a string, array of strings, or other format
}

const OpenSource: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
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
  }, [projects]); // Re-run when projects are loaded

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/project/'); 
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        console.log('Projects fetched:', data);
        
        // Log the structure of the first project to help with debugging
        if (data && data.length > 0) {
          console.log('First project structure:', {
            title: typeof data[0].title,
            description: typeof data[0].description,
            techStack: typeof data[0].techStack,
            techStackValue: data[0].techStack
          });
        }
        
        setProjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching projects:', err);
          setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
                Empower Open Source<br />Explore & Contribute!
              </h1>
              <p className="lead mb-3 animate-in visible">
                Browse innovative projects or showcase your own.
              </p>
              <p className="text-muted mb-4 animate-in visible">
                Join the open-source movement today!
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start animate-in visible">
                <button className="custom-btn custom-btn-opensource">
                  <i className="bi bi-search me-2"></i>Explore Projects
                </button>
                <button className="custom-outline-btn custom-outline-btn-opensource" onClick={() => navigate('/uploadproject')}>
                  <i className="bi bi-upload me-2"></i>Upload Project
                </button>
              </div>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img 
                src={heroImage} 
                alt="Open Source Projects" 
                className="img-fluid" 
                style={{ maxHeight: '550px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="py-5 bg-white">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading animate-in visible">Discover Exciting Projects</h2>
          
          {/* Loading and Error Handling */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status" style={{ color: 'var(--opensource-color)' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-state animate-in visible">
              <i className="bi bi-code-square"></i>
              <h4>No Projects Found</h4>
              <p>
                There are currently no open source projects available. Be the first to share your project with the community!
              </p>
              <button className="custom-btn custom-btn-opensource" onClick={() => navigate('/uploadproject')}>
                <i className="bi bi-upload me-2"></i>Upload Your Project
              </button>
            </div>
          ) : (
            <Row xs={1} md={2} xl={3} className="g-4">
              {/* Mapping over projects */}
              {projects.map((proj, idx) => (
                <Col key={idx}>
                  <div className="animate-in visible" style={{ height: '100%', animationDelay: `${idx * 0.1}s` }}>
                    <div className="project-card">
                      <h3 className="project-card-title">{proj.title}</h3>
                      <p className="project-card-description">{proj.description}</p>
                      
                      <div className="d-flex flex-wrap mb-3">
                        {typeof proj.techStack === 'string' 
                          ? proj.techStack.split(',').map((tech, techIdx) => (
                              <span key={techIdx} className="project-language">
                                {tech.trim()}
                              </span>
                            ))
                          : Array.isArray(proj.techStack)
                            ? proj.techStack.map((tech, techIdx) => (
                                <span key={techIdx} className="project-language">
                                  {typeof tech === 'string' ? tech.trim() : tech}
                                </span>
                              ))
                            : (
                                <span className="project-language">
                                  {String(proj.techStack)}
                                </span>
                              )
                        }
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="project-stars">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span>42</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock-history text-muted me-2"></i>
                          <small className="text-muted">Updated 2 days ago</small>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <button className="custom-outline-btn custom-outline-btn-opensource btn-sm">
                          <i className="bi bi-eye me-1"></i> View Details
                        </button>
                        <button className="custom-btn custom-btn-opensource btn-sm">
                          <i className="bi bi-code-slash me-1"></i> Contribute
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
          
          {/* View All Button */}
          <div className="text-end mt-4">
            <button 
              className="btn btn-link text-decoration-none animate-in visible"
              onClick={() => navigate('/projects')}
              style={{ color: 'var(--opensource-color)' }}
            >
              View all projects <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </Container>
      </section>

      {/* How to Contribute Section */}
      <section className="py-5 bg-light">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading text-center mb-5 animate-in visible">How to Contribute</h2>
          
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="contribute-step animate-in visible">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Find a Project</h4>
                  <p>Browse through our collection of open-source projects and find one that matches your interests and skills.</p>
                </div>
              </div>
              
              <div className="contribute-step animate-in visible">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Fork the Repository</h4>
                  <p>Create your own copy of the project by forking the repository to your GitHub account.</p>
                </div>
              </div>
              
              <div className="contribute-step animate-in visible">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Make Your Changes</h4>
                  <p>Implement your improvements, fix bugs, or add new features to the codebase.</p>
                </div>
              </div>
              
              <div className="contribute-step animate-in visible">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Submit a Pull Request</h4>
                  <p>Send your changes back to the original project for review and potential inclusion.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Project Section */}
      <section className="py-5 bg-white">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading animate-in visible">Featured Project</h2>
          
          <div className="project-card featured-project animate-in visible">
            <Row>
              <Col md={8}>
                <h3 className="project-card-title">BitBloom Community Platform</h3>
                <p className="project-card-description">
                  Our flagship open-source project that powers this very platform! BitBloom is built with React, Node.js, and MongoDB, 
                  focusing on creating a vibrant community for developers to share resources, collaborate on projects, and grow together.
                </p>
                <div className="d-flex flex-wrap mb-3">
                  <span className="project-language">React</span>
                  <span className="project-language">Node.js</span>
                  <span className="project-language">MongoDB</span>
                  <span className="project-language">Express</span>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <div className="d-flex align-items-center me-4">
                    <i className="bi bi-code-slash text-muted me-2"></i>
                    <small className="text-muted">42 contributors</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock-history text-muted me-2"></i>
                    <small className="text-muted">Updated 3 days ago</small>
                  </div>
                </div>
              </Col>
              <Col md={4} className="d-flex flex-column justify-content-center align-items-end mt-4 mt-md-0">
                <div className="project-stars mb-4" style={{ padding: '0.5rem 1.2rem', fontSize: '1.1rem' }}>
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  <span className="fw-bold">128</span>
                </div>
                <div className="d-flex flex-column gap-3 w-100">
                  <button className="custom-outline-btn custom-outline-btn-opensource w-100">
                    <i className="bi bi-github me-2"></i> View Repository
                  </button>
                  <button className="custom-btn custom-btn-opensource w-100">
                    <i className="bi bi-code-slash me-2"></i> Contribute
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-4 animate-in visible">Elevate Your Profile Today!</h2>
              <p className="text-muted mb-4 animate-in visible">
                Showcase your talents by uploading your work and engaging with our vibrant community.
                Start your journey with us today!
              </p>
              <div className="d-flex flex-wrap gap-3 animate-in visible">
                <button className="custom-btn custom-btn-opensource" onClick={() => navigate('/uploadproject')}>
                  <i className="bi bi-upload me-2"></i>Upload & Share
                </button>
                <button className="custom-outline-btn custom-outline-btn-opensource">
                  <i className="bi bi-github me-2"></i>Connect GitHub
                </button>
              </div>
            </Col>
            <Col md={6} className="text-end mt-4 mt-md-0">
              <p className="text-muted animate-in visible">
                Join thousands of developers who are already sharing their work and contributing through BitBloom.
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

export default OpenSource;
