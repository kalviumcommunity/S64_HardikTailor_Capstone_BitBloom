import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ResourceCard.module.css';

interface ResourceCardProps {
  _id: string;
  title: string;
  description: string;
  file?: string;
  isFree?: boolean;
  price?: number;
  user?: {
    username: string;
    email: string;
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, _id, isFree, price, user }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetResource = async () => {
    if (isFree) {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        // Make a request to the download endpoint
        const response = await fetch(`http://localhost:5000/api/resources/download/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to download resource');
        }
        
        // Get the download URL from the response
        const data = await response.json();
        
        // Open the download URL in a new tab
        window.open(data.downloadUrl, '_blank');
      } catch (error) {
        console.error('Error downloading resource:', error);
        alert('Failed to download resource. Please try again.');
      }
    } else {
      // Redirect to payment page
      navigate(`/payment/${_id}`);
    }
  };

  const getResourceType = () => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('guide') || lowerTitle.includes('how')) return 'Guide';
    if (lowerTitle.includes('tutorial')) return 'Tutorial';
    if (lowerTitle.includes('template')) return 'Template';
    if (lowerTitle.includes('tool')) return 'Tool';
    return 'Resource';
  };

  return (
    <>
      <div className={styles.resourceCard}>
        <div className={styles.cardHighlight}></div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={styles.cardTag}>{getResourceType()}</span>
          {isFree !== undefined && (
            <span className={`badge ${isFree ? 'bg-success' : 'bg-primary'}`}>
              {isFree ? 'Free' : `₹${price}`}
            </span>
          )}
        </div>
        <h5 className={styles.cardTitle}>{title}</h5>
        <p className={styles.cardDescription}>
          {description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </p>
        {user && (
          <small className="text-muted d-block mb-2">By {user.username}</small>
        )}
        <button
          className={styles.cardButton}
          onClick={handleReadMore}
          aria-label="Read more about this resource"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Read More
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{title}</h3>
                {isFree !== undefined && (
                  <span className={`badge ${isFree ? 'bg-success' : 'bg-primary'} ms-2`}>
                    {isFree ? 'Free' : `₹${price}`}
                  </span>
                )}
              </div>
              <button 
                className={styles.closeButton} 
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              <div className={styles.modalBody}>
                {user && (
                  <p className="text-muted mb-2">By {user.username}</p>
                )}
                <p className={styles.modalDescription}>{description}</p>
                <button
                  className={styles.viewButton}
                  onClick={handleGetResource}
                >
                  {isFree ? 'Get for Free' : `Buy for ₹${price}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResourceCard;
