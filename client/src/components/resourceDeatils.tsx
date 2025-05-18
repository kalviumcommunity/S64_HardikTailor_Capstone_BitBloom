import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.jpg';

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

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    // JWT tokens are in format: header.payload.signature
    const payload = token.split('.')[1];
    // Decode the base64 payload
    const decodedPayload = JSON.parse(atob(payload));
    // Check if the token has an expiration time
    if (decodedPayload.exp) {
      // exp is in seconds, Date.now() is in milliseconds
      return decodedPayload.exp * 1000 < Date.now();
    }
    return false;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // If we can't parse the token, assume it's expired
  }
};

const ResourceDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        // Token is expired, remove it
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resources/${id}`);
        setResource(res.data);
      } catch (error) {
        console.error('Failed to fetch resource:', error);
      }
    };

    fetchResource();
  }, [id]);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated for paid resources
      if (!resource?.isFree && !isAuthenticated) {
        alert('You need to be logged in to download this paid resource.');
        navigate('/auth'); // Redirect to login page
        return;
      }
      
      const token = localStorage.getItem('token');
      
      // Check token expiration again just before the request
      if (token && isTokenExpired(token)) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/auth');
        return;
      }
      
      const endpoint = `http://localhost:5000/api/resources/download/${id}`;
      
      // For both free and paid resources, we'll use the same endpoint
      // but include the token for authentication if available
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Debug: Log headers to ensure token is being sent
      console.log('Request headers:', headers);
      
      // Use fetch API to get the download URL
      const response = await fetch(endpoint, { headers });
      
      // Check if the response is successful
      if (!response.ok) {
        // Handle different error cases
        if (response.status === 401) {
          alert('You need to be logged in to download this resource.');
          navigate('/auth');
          return;
        } else if (response.status === 403) {
          alert('You need to purchase this resource before downloading.');
          return;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to download resource');
        }
      }
      
      // Parse the response to get the download URL
      const data = await response.json();
      console.log('Download response:', data);
      
      if (data.downloadUrl) {
        // Get the download URL
        const url = data.downloadUrl;
        
        // Set loading to false
        setIsLoading(false);
        
        // Create a direct download link that the user can see and click
        const downloadDiv = document.createElement('div');
        downloadDiv.style.position = 'fixed';
        downloadDiv.style.top = '50%';
        downloadDiv.style.left = '50%';
        downloadDiv.style.transform = 'translate(-50%, -50%)';
        downloadDiv.style.backgroundColor = 'white';
        downloadDiv.style.padding = '20px';
        downloadDiv.style.borderRadius = '8px';
        downloadDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        downloadDiv.style.zIndex = '1000';
        downloadDiv.style.maxWidth = '80%';
        downloadDiv.style.textAlign = 'center';
        
        // Determine if this is a PDF that can be previewed
        const isPdf = data.filename?.toLowerCase().endsWith('.pdf') || 
                     data.contentType === 'application/pdf';
        
        downloadDiv.innerHTML = `
          <h3>Download "${data.filename || resource?.title}"</h3>
          <p>Click the button below to download your file:</p>
          <a href="${url}" target="_blank" download="${data.filename || resource?.title}" 
             style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 0;">
             Download File
          </a>
          ${isPdf ? `
          <p><small>Or preview the PDF:</small></p>
          <a href="${url}" target="_blank" 
             style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 0;">
             Preview PDF
          </a>
          ` : ''}
          <p><small>If the download doesn't start, you can copy this URL:</small></p>
          <input type="text" value="${url}" style="width: 100%; padding: 5px; margin-bottom: 10px;" readonly onclick="this.select();" />
          <button id="closeDownloadDialog" style="background-color: #6c757d; border: none; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Close</button>
        `;
        
        document.body.appendChild(downloadDiv);
        
        // Add event listener to close button
        document.getElementById('closeDownloadDialog')?.addEventListener('click', () => {
          document.body.removeChild(downloadDiv);
        });
        
        // Also try to open in a new tab automatically
        window.open(url, '_blank');
      } else {
        throw new Error('No download URL provided by the server');
      }
    } catch (error) {
      console.error('Error downloading the resource:', error);
      alert('Error downloading the resource. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };  

  if (!resource) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5 bg-light white">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">{resource.title}</h2>
        <p className="text-muted mb-2">by {resource.user?.username}</p>

        <p className="lead">{resource.description}</p>

        <div className="d-flex align-items-center gap-3 mt-4">
          {resource.isFree ? (
            <button 
              className="btn btn-success px-4 py-2" 
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Get for Free'}
            </button>
          ) : (
            <button 
              className="btn btn-primary px-4 py-2" 
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Download (₹${resource.price})`}
            </button>
          )}
          {!isAuthenticated && !resource.isFree && (
            <div className="text-danger">
              <small>* Login required for paid resources</small>
            </div>
          )}
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4" />

      {/* Bottom Row */}
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <div className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="BitBloom Logo"
            height="35"
            width="35"
            style={{ objectFit: 'cover', borderRadius: '5px' }}
          />
          <span className="fw-semibold">BitBloom</span>
        </div>
        <div>© 2025 BitBloom. All rights reserved.</div>
      </div>
    </div>
  );
};

export default ResourceDetails;
