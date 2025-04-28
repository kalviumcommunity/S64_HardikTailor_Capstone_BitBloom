import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const UploadProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!title || !problemDescription || !techStack || !repoLink) {
      alert('Please fill in all required fields.');
      return;
    }

    const projectData = {
      title,
      problemDescription,
      techStack,
      repoLink,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assume auth token is stored
      const response = await axios.post('http://localhost:5000/api/project/', projectData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Project uploaded successfully!');
      console.log(response.data);
      setTitle('');
      setProblemDescription('');
      setTechStack('');
      setRepoLink('');
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload project.');
      console.error('Upload error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">Upload Your Project</h1>
            <p className="lead">Share your open-source projects and inspire collaboration!</p>
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Project Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="problemDescription" className="form-label">Brief Description of the Problem</label>
            <textarea
              className="form-control"
              id="problemDescription"
              rows={4}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="techStack" className="form-label">Tech Stack</label>
            <input
              type="text"
              className="form-control"
              id="techStack"
              placeholder="e.g., React, Node.js, MongoDB"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repoLink" className="form-label">Repository Link</label>
            <input
              type="text"
              className="form-control"
              id="repoLink"
              placeholder="https://github.com/your-repo"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
            />
          </div>

          {loading ? (
            <div>Uploading...</div>
          ) : (
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => window.history.back()}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload Project
              </button>
            </div>
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadProject;
