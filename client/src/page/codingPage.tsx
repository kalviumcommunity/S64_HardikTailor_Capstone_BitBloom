import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import codingHero from "../assets/coding-hero.png";
import "../styles/coding.css";
import "../styles/common.css";

type Difficulty = "Easy" | "Medium" | "Hard";

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  time: string;
  link: string;
}

const CodingPage: React.FC = () => {
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

  const challenges: ChallengeCardProps[] = [
    {
      title: "N Queens",
      description: "Find the contiguous subarray with the maximum sum",
      difficulty: "Medium",
      category: "Data Structures | Arrays",
      time: "~15 min",
      link: "https://leetcode.com/problems/n-queens"
    },
    {
      title: "N Queens",
      description: "Find the contiguous subarray with the maximum sum",
      difficulty: "Medium",
      category: "Data Structures | Arrays",
      time: "~15 min",
      link: "https://leetcode.com/problems/n-queens"
    },
    {
      title: "N Queens",
      description: "Find the contiguous subarray with the maximum sum",
      difficulty: "Medium",
      category: "Data Structures | Arrays",
      time: "~15 min",
      link: "https://leetcode.com/problems/n-queens"
    },
    {
      title: "Two Sum",
      description: "Find indices of two numbers that add up to target",
      difficulty: "Easy",
      category: "Algorithms | Hashmaps",
      time: "~10 min",
      link: "https://leetcode.com/problems/two-sum/"
    },
    {
      title: "Longest Palindromic Substring",
      description: "Return the longest palindromic substring",
      difficulty: "Hard",
      category: "Dynamic Programming | Strings",
      time: "~25 min",
      link: "https://leetcode.com/problems/longest-palindromic-substring/"
    },
    {
      title: "Unique Path",
      description: "Number of possible unique paths that the robot can take to reach the bottom-right corner",
      difficulty: "Easy",
      category: "Algorithms | DP",
      time: "~10 min",
      link: "https://leetcode.com/problems/unique-paths/"
    },
  ];

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
                <button className="coding-accent-btn">
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

      {/* Challenges Grid */}
      <section className="py-5 bg-white">
        <Container className="px-3 px-md-5">
          <h2 className="section-heading animate-in">Explore Our Exciting Coding Challenges</h2>
          <Row xs={1} md={2} xl={3} className="g-4">
            {challenges.map((challenge, index) => (
              <Col key={index} className="d-flex">
                <div className="challenge-card animate-in" style={{ width: '100%', animationDelay: `${index * 0.1}s` }}>
                  <h3 className="challenge-card-title">{challenge.title}</h3>
                  <p className="challenge-card-description">{challenge.description}</p>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted small">{challenge.category}</span>
                    <span className="text-muted small">{challenge.time}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}`}>
                      {challenge.difficulty}
                    </span>
                    <a 
                      href={challenge.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="coding-accent-btn btn-sm"
                    >
                      Solve
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
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
                <button className="coding-accent-btn pulse-animation">
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
    </div>
  );
};

export default CodingPage;
