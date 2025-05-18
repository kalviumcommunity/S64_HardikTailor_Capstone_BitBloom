import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/projectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  techStack: string;
}

const ProjectFeed: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/project');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err: unknown) {
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

  // Filter projects based on search term and filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && project.techStack.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-light py-4">
        <div className="container">
          <h1 className="display-6 fw-bold mb-3">Open Source Projects</h1>
          <p className="lead text-muted">
            Discover and contribute to innovative open source projects from our community
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
                placeholder="Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end">
              <select 
                className="form-select w-auto" 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Technologies</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">No projects found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
              {filteredProjects.map((proj, idx) => (
                <div className="col d-flex justify-content-center" key={idx}>
                  <ProjectCard {...proj} />
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

      {/* Call to Action */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Have a Project to Share?</h2>
          <p className="lead mb-4">
            Showcase your work to our community and get valuable feedback and contributions.
          </p>
          <button 
            className="btn btn-primary px-5 py-2"
            onClick={() => navigate('/uploadproject')}
          >
            Upload Your Project
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectFeed;