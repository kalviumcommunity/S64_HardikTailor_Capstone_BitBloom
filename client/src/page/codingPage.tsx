import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CodingQuestions from "../components/CodingQuestions";
import CodingAssessmentModal from "../components/CodingAssessmentModal";
import { QuestionFilters } from "../types/Question";
import codingHero from "../assets/coding-hero.png";
import "../styles/coding.css";
import "../styles/common.css";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;



const CodingPage: React.FC = () => {
  // Refs for animation elements
  const animatedElements = useRef<HTMLElement[]>([]);
  
  // Assessment modal state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [recommendedFilters, setRecommendedFilters] = useState<QuestionFilters | undefined>(undefined);
  
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

  const handleSolveChallenges = () => {
    setIsAssessmentOpen(true);
  };

  const handleAssessmentComplete = (filters: QuestionFilters) => {
    setRecommendedFilters(filters);
    // Scroll to the questions section
    const questionsSection = document.getElementById('questions-section');
    if (questionsSection) {
      questionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="bitbloom-app bg-light text-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-lg-start">
              <h1 className="animate-in">
                Sharpen Your Skills with<br />Coding Challenges
              </h1>
              <p className="lead mb-3 animate-in">
                Solve real-world problems, enhance your problem-solving abilities, and prepare for coding interviews.
              </p>
              <p className="text-muted mb-4 animate-in">
                Join a community of learners and take your coding skills to the next level.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start animate-in">
                <button className="coding-accent-btn" onClick={handleSolveChallenges}>
                  <i className="bi bi-code-slash me-2"></i>Solve Challenges
                </button>
                <button className="coding-outline-accent-btn">
                  <i className="bi bi-upload me-2"></i>Upload Challenge
                </button>
              </div>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img 
                src={codingHero} 
                alt="Coding Challenges" 
                className="img-fluid " 
                style={{ maxHeight: "550px" }} 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Coding Questions Section */}
      <section id="questions-section" className="py-5" style={{ background: '#f8f9fa' }}>
        <CodingQuestions initialFilters={recommendedFilters} />
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6} className="mx-auto text-center">
              <h2 className="fw-bold mb-4 animate-in">Ready to Test Your Skills?</h2>
              <p className="text-muted mb-4 animate-in">
                Join our community of developers and tackle challenges that will help you grow as a programmer.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap animate-in">
                <button className="coding-accent-btn pulse-animation" onClick={handleSolveChallenges}>
                  <i className="bi bi-code-slash me-2"></i>Start Coding
                </button>
                <button className="coding-outline-accent-btn">
                  <i className="bi bi-share me-2"></i>Share Challenge
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
      
      {/* Assessment Modal */}
      <CodingAssessmentModal 
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
};

export default CodingPage;
