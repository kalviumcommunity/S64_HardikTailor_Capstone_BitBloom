import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../assets/Shared workspace.gif';
import benefitsImage from '../assets/benefitss.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/Explore.css';

const ExplorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bitbloom-app bg-light text-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="explore-hero py-5">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold display-4 mb-4">
                Share.<br />Collaborate.<br />Grow.
              </h1>
              <p className="lead mb-3">
                A platform to monetize digital resources, contribute to open-source, and enhance coding skills.
              </p>
              <p className="text-muted mb-4">
                Empowering creators, developers, and innovators worldwide.
              </p>
              <Button className="custom-join-btn" onClick={()=>navigate('/auth')}>Join</Button>
              
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img src={heroImage} alt="Hero" className="img-fluid "  style={{ maxHeight: '550px' }}/>
              
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="explore-benefits py-5 bg-white">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            {/* Text */}
            <Col md={6}>
              <h2 className="fw-bold mb-4">Unlock Your Potential with BitBloom</h2>
              <p className="text-muted mb-4">
                Discover how BitBloom empowers you to create, collabAorate, and innovate. Our platform offers
                unique opportunities for creators, contributors, and developers alike.
              </p>
              <div className="mb-4">
                <h5 className="fw-semibold">Earn Creatively</h5>
                <p className="text-muted">
                  Upload and sell your digital creations with ease and security.
                </p>
              </div>
              <div>
                <h5 className="fw-semibold">Contribute Openly</h5>
                <p className="text-muted">
                  Find and contribute to exciting open-source projects that inspire you.
                </p>
              </div>
            </Col>

            {/* Image */}
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img src={benefitsImage} alt="BitBloom Benefits" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Join Community Section */}
      <section className="explore-community py-5">
        <Container className="px-3 px-md-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-4">Join the BitBloom Community</h2>
              <p className="text-muted mb-4">
                Start your journey with us today. Collaborate with like-minded individuals and
                grow your skills in a vibrant community.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button className="btn custom-join-btn btn-lg" onClick={()=>navigate('/auth')}>Sign Up Now</Button>
                <Button variant="outline-secondary">Learn More</Button>
              </div>
            </Col>
            <Col md={6} className="text-end mt-4 mt-md-0">
              <p className="text-muted">
                Join our thriving coding community today! More than 10,000 developers are using BitBloom to
                collaborate on projects.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default ExplorePage;
