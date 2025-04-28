import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.jpg';

interface Resource {
  _id: string;
  title: string;
  description: string;
  isFree: boolean;
  price?: number;
  user: {
    username: string;
    email: string;
  };
}

const ResourceDetails: React.FC = () => {
  const { id } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);

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

  if (!resource) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5 bg-light white">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">{resource.title}</h2>
        <p className="text-muted mb-2">by {resource.user?.username}</p>

        <p className="lead">{resource.description}</p>

        <div className="d-flex align-items-center gap-3 mt-4">
          {resource.isFree ? (
            <button className="btn btn-success px-4 py-2">Get for Free</button>
          ) : (
            <button className="btn btn-primary px-4 py-2">Buy for ₹{resource.price}</button>
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
