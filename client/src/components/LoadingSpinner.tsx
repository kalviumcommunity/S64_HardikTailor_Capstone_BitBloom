import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </motion.div>
      
      <motion.div
        className="loading-text"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Loading questions...
      </motion.div>

      {/* Skeleton Cards */}
      <div className="skeleton-grid">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="skeleton-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="skeleton-header">
              <div className="skeleton-title"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-tags">
              <div className="skeleton-tag"></div>
              <div className="skeleton-tag short"></div>
            </div>
            <div className="skeleton-footer">
              <div className="skeleton-meta"></div>
              <div className="skeleton-action"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;