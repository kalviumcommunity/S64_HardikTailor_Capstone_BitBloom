import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiTag, FiTrendingUp } from 'react-icons/fi';
import { Question } from '../types/Question';

interface QuestionCardProps {
  question: Question;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return 'difficulty-medium';
    }
  };

  const handleCardClick = () => {
    window.open(question.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="question-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{question.title}</h3>
          <span className={`difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
            <FiTrendingUp className="difficulty-icon" />
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Topics */}
      <div className="card-topics">
        {question.topics.map((topic, topicIndex) => (
          <span key={topicIndex} className="topic-tag">
            <FiTag className="topic-icon" />
            {topic}
          </span>
        ))}
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        <div className="card-meta">
          <span className="card-slug">/{question.slug}</span>
        </div>
        
        <motion.div
          className="card-action"
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.7,
            x: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.2 }}
        >
          {isHovered ? (
            <span className="action-text">
              Solve on LeetCode
              <FiExternalLink className="external-icon" />
            </span>
          ) : (
            <FiExternalLink className="external-icon" />
          )}
        </motion.div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="card-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default QuestionCard;