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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
              </>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title for your resource"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              placeholder="Enter description for your resource"
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
              <label htmlFor="price" className="form-label">Set Price (₹)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter value"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          )}

          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => window.history.back()}>Cancel</button>
            <button className="btn btn-primary" >Upload</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadResource;
