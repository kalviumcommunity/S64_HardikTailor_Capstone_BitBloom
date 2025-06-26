import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiCheck } from 'react-icons/fi';
import { QuestionFilters } from '../types/Question';

interface FilterBarProps {
  allTopics: string[];
  filters: QuestionFilters;
  onFilterChange: (filters: QuestionFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ allTopics, filters, onFilterChange }) => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const toggleTopic = (topic: string) => {
    const newTopics = filters.topics.includes(topic)
      ? filters.topics.filter(t => t !== topic)
      : [...filters.topics, topic];
    
    onFilterChange({ ...filters, topics: newTopics });
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    
    onFilterChange({ ...filters, difficulty: newDifficulties });
  };

  const clearTopicFilters = () => {
    onFilterChange({ ...filters, topics: [] });
  };

  const clearDifficultyFilters = () => {
    onFilterChange({ ...filters, difficulty: [] });
  };

  const getTotalFilters = () => {
    return filters.topics.length + filters.difficulty.length;
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <div className="filter-title">
          <FiFilter className="filter-icon" />
          <span>Filters</span>
          {getTotalFilters() > 0 && (
            <span className="filter-count">{getTotalFilters()}</span>
          )}
        </div>
      </div>

      <div className="filter-controls">
        {/* Topics Filter */}
        <div className={`filter-group ${isTopicsOpen ? 'open' : ''}`}>
          <div 
            className={`filter-dropdown ${isTopicsOpen ? 'open' : ''}`}
            onClick={() => setIsTopicsOpen(!isTopicsOpen)}
          >
            <span className="filter-label">
              Topics
              {filters.topics.length > 0 && (
                <span className="selected-count">({filters.topics.length})</span>
              )}
            </span>
            <FiChevronDown className={`dropdown-icon ${isTopicsOpen ? 'rotated' : ''}`} />
          </div>

          <AnimatePresence>
            {isTopicsOpen && (
              <motion.div
                className="filter-dropdown-content"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-header">
                  <span className="dropdown-title">Select Topics</span>
                  {filters.topics.length > 0 && (
                    <button 
                      className="clear-section-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearTopicFilters();
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="filter-options">
                  {allTopics.map((topic) => (
                    <label key={topic} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.topics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="filter-checkbox"
                      />
                      <span className="checkmark">
                        {filters.topics.includes(topic) && <FiCheck />}
                      </span>
                      <span className="option-text">{topic}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Difficulty Filter */}
        <div className={`filter-group ${isDifficultyOpen ? 'open' : ''}`}>
          <div 
            className={`filter-dropdown ${isDifficultyOpen ? 'open' : ''}`}
            onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
          >
            <span className="filter-label">
              Difficulty
              {filters.difficulty.length > 0 && (
                <span className="selected-count">({filters.difficulty.length})</span>
              )}
            </span>
            <FiChevronDown className={`dropdown-icon ${isDifficultyOpen ? 'rotated' : ''}`} />
          </div>

          <AnimatePresence>
            {isDifficultyOpen && (
              <motion.div
                className="filter-dropdown-content"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-header">
                  <span className="dropdown-title">Select Difficulty</span>
                  {filters.difficulty.length > 0 && (
                    <button 
                      className="clear-section-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearDifficultyFilters();
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="filter-options">
                  {difficulties.map((difficulty) => (
                    <label key={difficulty} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(difficulty)}
                        onChange={() => toggleDifficulty(difficulty)}
                        className="filter-checkbox"
                      />
                      <span className="checkmark">
                        {filters.difficulty.includes(difficulty) && <FiCheck />}
                      </span>
                      <span className={`option-text difficulty-${difficulty.toLowerCase()}`}>
                        {difficulty}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.topics.length > 0 || filters.difficulty.length > 0) && (
        <div className="active-filters">
          <div className="active-filters-list">
            {filters.topics.map((topic) => (
              <span key={topic} className="active-filter topic-filter">
                {topic}
                <FiX 
                  className="remove-filter"
                  onClick={() => toggleTopic(topic)}
                />
              </span>
            ))}
            {filters.difficulty.map((difficulty) => (
              <span key={difficulty} className={`active-filter difficulty-filter ${difficulty.toLowerCase()}`}>
                {difficulty}
                <FiX 
                  className="remove-filter"
                  onClick={() => toggleDifficulty(difficulty)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;