import React, { useEffect, useState } from 'react';
import ResourceCard from '../components/resourceCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

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

const ResourceFeed: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        console.log('Fetching resources...');
        const response = await fetch('http://localhost:5000/api/resources');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        console.log('Resources fetched in ResourceFeed:', data);
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

  // Filter resources based on search term and price filter
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === 'all') return matchesSearch;
    if (categoryFilter === 'free') return matchesSearch && resource.isFree;
    if (categoryFilter === 'paid') return matchesSearch && !resource.isFree;
    
    // For other categories, we'll use a simple keyword matching approach
    const resourceType = getResourceType(resource.title);
    return matchesSearch && resourceType.toLowerCase() === categoryFilter.toLowerCase();
  });
  
  // Helper function to determine resource type from title
  const getResourceType = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('template')) return 'templates';
    if (lowerTitle.includes('ui') || lowerTitle.includes('kit')) return 'ui kits';
    if (lowerTitle.includes('code') || lowerTitle.includes('snippet')) return 'code snippets';
    if (lowerTitle.includes('book') || lowerTitle.includes('guide')) return 'ebooks';
    if (lowerTitle.includes('tutorial') || lowerTitle.includes('learn')) return 'tutorials';
    return 'other';
  };

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-light py-4">
        <div className="container">
          <h1 className="display-6 fw-bold mb-3">Digital Resources Library</h1>
          <p className="lead text-muted">
            Explore our collection of high-quality digital resources for developers, designers, and creators
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end">
              <select 
                className="form-select w-auto" 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Resources</option>
                <option value="free">Free Resources</option>
                <option value="paid">Paid Resources</option>
                <option value="templates">Templates</option>
                <option value="ui kits">UI Kits</option>
                <option value="code snippets">Code Snippets</option>
                <option value="ebooks">E-Books</option>
                <option value="tutorials">Tutorials</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">No resources found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
              {filteredResources.map((resource, idx) => (
                <div className="col d-flex justify-content-center" key={idx}>
                  <ResourceCard 
                    title={resource.title} 
                    description={resource.description} 
                    _id={resource._id} 
                    file={resource.file}
                    isFree={resource.isFree}
                    price={resource.price}
                    user={resource.user}
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>

      {/* Featured Resources */}
      <div className="container py-4">
        <h2 className="mb-4 fw-semibold">Featured Resources</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="mb-3">React Dashboard Template</h4>
                    <p className="text-muted mb-3">
                      A fully responsive admin dashboard template built with React, Bootstrap 5, and Chart.js.
                      Perfect for building modern web applications.
                    </p>
                    <small className="text-muted">By Alex Dev</small>
                  </div>
                  <span className="badge bg-secondary py-2">UI Kit</span>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-outline-primary btn-sm">Preview</button>
                  <button className="btn btn-primary btn-sm">Download</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="mb-3">JavaScript Performance Guide</h4>
                    <p className="text-muted mb-3">
                      A comprehensive guide to optimizing JavaScript performance in modern web applications.
                      Learn best practices and advanced techniques.
                    </p>
                    <small className="text-muted">By Sarah Tech</small>
                  </div>
                  <span className="badge bg-secondary py-2">E-Book</span>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-outline-primary btn-sm">Preview</button>
                  <button className="btn btn-primary btn-sm">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Share Your Knowledge</h2>
          <p className="lead mb-4">
            Have a valuable resource to share with our community? Upload it today and help others learn and grow.
          </p>
          <button 
            className="btn btn-primary px-5 py-2"
            onClick={() => navigate('/uploadresource')}
          >
            Upload Resource
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResourceFeed;