import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiTarget } from 'react-icons/fi';
import { QuestionFilters } from '../types/Question';
import '../styles/RecommendationBanner.css';

interface RecommendationBannerProps {
  filters: QuestionFilters;
  onClearRecommendations: () => void;
}

const RecommendationBanner: React.FC<RecommendationBannerProps> = ({
  filters,
  onClearRecommendations
}) => {
  const totalFilters = filters.topics.length + filters.difficulty.length;

  if (totalFilters === 0) return null;

  return (
    <motion.div
      className="recommendation-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="banner-content">
        <div className="banner-icon">
          <FiTarget />
        </div>
        <div className="banner-text">
          <h4>Personalized Questions Ready!</h4>
          <p>
            We've found <strong>{totalFilters} filters</strong> based on your preferences.
            {filters.topics.length > 0 && (
              <span> Topics: <strong>{filters.topics.join(', ')}</strong></span>
            )}
            {filters.difficulty.length > 0 && (
              <span> • Difficulty: <strong>{filters.difficulty.join(', ')}</strong></span>
            )}
          </p>
        </div>
        <button 
          className="banner-close"
          onClick={onClearRecommendations}
          title="Clear recommendations"
        >
          <FiX />
        </button>
      </div>
      <div className="banner-success-icon">
        <FiCheck />
      </div>
    </motion.div>
  );
};

export default RecommendationBanner;