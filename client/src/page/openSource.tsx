import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/projectCard';
import heroImage from '../assets/OpensourceHero.gif';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  techStack: string;
}

const OpenSource: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/project'); 
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      }catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
        {/* Hero Section */}
        <div style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-5 fw-bold mb-4">Empower Open Source – Explore & Contribute!</h1>
              <p className="lead mb-4">
                Browse innovative projects or showcase your own. Join the open-source movement today!
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-primary px-4 py-2">Explore</button>
                <button className="btn btn-outline-primary px-4 py-2" onClick={() => navigate('/uploadproject')}>Upload</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={heroImage}
                alt="Open Source Projects"
                className="img-fluid rounded"
                style={{ maxHeight: '600px', width: '600px' }}
                />
            </div>
          </div>
        </div>
      </div>

        {/* Projects Section */}
        <div className="container py-5">
          <div className="mb-5">
            <h2 className="mb-4 fw-semibold">Discover Exciting Projects</h2>
            {loading ? (
              <p>Loading projects...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                {projects.map((proj, idx) => (
                  <div className="col d-flex justify-content-center" key={idx}>
                    <ProjectCard {...proj} />
                  </div>
                ))}
              </div>
            )}
            <div className="text-end mt-4">
              <button className="btn btn-link text-decoration-none">
                View all →
              </button>
            </div>
          </div>

          {/* Featured Project Section */}
          <div className="mb-5">
            <h2 className="mb-4 fw-semibold">Featured</h2>
            <div className="trendcard border-0 shadow-sm p-4 mb-4 bg-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-3">Discover Our Featured Open Source Project</h5>
                  <small className="text-muted">Explore our highlighted project that showcases innovative solutions and collaborative efforts. Join the community of contributors and make an impact today!</small>
                </div>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-outline-primary btn-sm">Explore</button>
                    <button className="btn btn-primary btn-sm">Contribute</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center my-5 py-5">
            <h2 className="fw-bold mb-3">Elevate Your Profile Today!</h2>
            <p className="lead mb-4">
              Showcase your talents by uploading your work and engaging with our vibrant community.
            </p>
            <button className="btn btn-primary px-5 py-2">Upload & Share</button>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default OpenSource;
