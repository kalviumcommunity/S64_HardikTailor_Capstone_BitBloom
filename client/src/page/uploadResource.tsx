import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const UploadResource: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!title || !description || (!isFree && !price)) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isFree', JSON.stringify(isFree));
    if (!isFree) formData.append('price', price);
    if (selectedFile) formData.append('file', selectedFile);

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assume auth token is stored
      const response = await axios.post('http://localhost:5000/api/resources', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Resource uploaded successfully!');
      console.log(response.data);
      // Clear the form after successful upload
      setTitle('');
      setDescription('');
      setPrice('');
      setSelectedFile(null);
      setIsFree(true);
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload resource.');
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
            <h1 className="fw-bold mb-3">Upload Your Resource & Share with the Community</h1>
            <p className="lead">Help others by sharing your knowledge. Upload your files and set a price (or free)!</p>
          </div>

          <div
            className="upload-area p-5 mb-4 text-center border rounded bg-white"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {selectedFile ? (
              <div>
                <p>File Name: {selectedFile.name}</p>
                <p>File Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            ) : (
              <>
                <p className="mb-3">Drag & drop your files here</p>
                <label htmlFor="fileInput" className="btn btn-primary">
                  Browse files
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileSelect} />
              </>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="isFreeSwitch"
              checked={isFree}
              onChange={() => setIsFree(!isFree)}
            />
            <label className="form-check-label" htmlFor="isFreeSwitch">
              {isFree ? 'Free Resource' : 'Paid Resource'}
            </label>
          </div>

          {!isFree && (
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Set Price (₹)
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          )}

          {loading ? (
            <div>Uploading...</div>
          ) : (
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => window.history.back()}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
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

export default UploadResource;
