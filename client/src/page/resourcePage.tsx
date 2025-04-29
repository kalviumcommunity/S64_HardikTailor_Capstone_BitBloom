import React, { useEffect, useState } from 'react';
import ResourceCard from '../components/resourceCard';
import heroImage from '../assets/resource.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


interface Resource {
  title: string;
  description: string;
  category: string;
  readTime: string;
}


const Resources: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources'); 
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
  
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <div style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5" >
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-5 fw-bold mb-4">Discover & Monetize Digital Resources</h1>
              <p className="lead mb-4">
                Explore a vast collection of templates, code snippets, UI kits, and more.<br />
                Upload your own and start earning today!
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-primary px-4 py-2">Explore</button>
                <button className="btn btn-outline-primary px-4 py-2" onClick={() => navigate('/uploadresource')}>Upload </button>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={heroImage}
                alt="Digital Resources"
                className="img-fluid rounded-3 shadow-sm"
                style={{ maxHeight: '460px', objectFit: 'contain' }}
                />
            </div>
          </div>
        </div>
        </div>

        {/* Resource Cards Section */}
        <div className="container py-5">
          <div className="mb-5">
            <h2 className="mb-4 fw-semibold">Latest Insights and Trends</h2>
            {loading ? (
              <p>Loading resources...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                {resources.map((res, idx) => (
                  <div className="col d-flex justify-content-center" key={idx}>
                    <ResourceCard {...res} />
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

          {/* Trending Section */}
          <div className="mb-5">
            <h2 className="mb-4 fw-semibold">Trending</h2>
            <div className="trendcard border-0 shadow-sm p-4 mb-4 bg-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-3">React Dashboard Template</h5>
                  <small className="text-muted">By Alex Dev</small>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="badge bg-secondary py-2">UI Kit</span>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-outline-primary btn-sm">View</button>
                    <button className="btn btn-primary btn-sm">Buy</button>
                  </div>
                </div>
              </div>
            </div> 
          </div>

          {/* Community Section */}
          <div className="text-center my-5 py-5">
            <h2 className="fw-bold mb-3">Join Our Creative Community</h2>
            <p className="lead mb-4">
              Dive into our extensive library of resources or share your own creations with the world.
            </p>
            <button className="btn btn-primary px-5 py-2" >Start Uploading</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;
