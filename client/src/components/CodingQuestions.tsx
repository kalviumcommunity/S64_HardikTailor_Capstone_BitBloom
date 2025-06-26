  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import QuestionCard from './QuestionCard';
  import FilterBar from './FilterBar';
  import LoadingSpinner from './LoadingSpinner';
  import RecommendationBanner from './RecommendationBanner';
  import { Question, QuestionFilters } from '../types/Question';
  import { questionService } from '../services/questionService';
  import '../styles/CodingQuestions.css';

  interface CodingQuestionsProps {
    initialFilters?: QuestionFilters;
  }

  const CodingQuestions: React.FC<CodingQuestionsProps> = ({ initialFilters }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allTopics, setAllTopics] = useState<string[]>([]);
    const [filters, setFilters] = useState<QuestionFilters>(
      initialFilters || {
        topics: [],
        difficulty: []
      }
    );
    const [showRecommendationBanner, setShowRecommendationBanner] = useState(false);

    // Fetch questions from API
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Build query parameters based on filters
          const params: {topics?: string; difficulty?: string}  = {};
          if (filters.topics.length > 0) {
            params.topics = filters.topics.join(',');
          }
          if (filters.difficulty.length > 0) {
            params.difficulty = filters.difficulty.join(',');
          }

          const data = await questionService.getQuestions(params);
          setQuestions(data.questions);
          setFilteredQuestions(data.questions);
          
          // Extract unique topics for filter options
          const topics = Array.from(new Set(
          data.questions.flatMap((q: Question) => q.topics))).sort();
          setAllTopics(topics);

          
        } catch (err) {
          setError('Failed to fetch questions. Please try again.');
          console.error('Error fetching questions:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }, [filters]);

    // Update filters when initialFilters prop changes
    useEffect(() => {
      if (initialFilters) {
        setFilters(initialFilters);
        setShowRecommendationBanner(true);
      }
    }, [initialFilters]);

    // Apply client-side filtering (backup if API doesn't support filtering)
    useEffect(() => {
      let filtered = questions;
      
      if (filters.topics.length > 0) {
        filtered = filtered.filter(q => 
          filters.topics.some(topic => q.topics.includes(topic))
        );
      }
      
      if (filters.difficulty.length > 0) {
        filtered = filtered.filter(q => 
          filters.difficulty.includes(q.difficulty)
        );
      }
      
      setFilteredQuestions(filtered);
    }, [questions, filters]);

    const handleFilterChange = (newFilters: QuestionFilters) => {
      setFilters(newFilters);
    };

    const clearFilters = () => {
      setFilters({ topics: [], difficulty: [] });
      setShowRecommendationBanner(false);
    };

    const clearRecommendations = () => {
      setShowRecommendationBanner(false);
    };

    if (loading) {
      return (
        <div className="coding-questions-container">
          <div className="questions-header">
            <h1 className="questions-title">Coding Questions</h1>
            <p className="questions-subtitle">Practice and improve your coding skills</p>
          </div>
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="coding-questions-container">
          <div className="error-state">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="coding-questions-container">
        {/* Header */}
        <div className="questions-header">
          <h1 className="questions-title">Coding Questions</h1>
          <p className="questions-subtitle">
            Practice coding problems from LeetCode. Filter by topic and difficulty to find your perfect challenge.
          </p>
          <div className="questions-stats">
            <span className="stat-item">
              <strong>{filteredQuestions.length}</strong> questions
            </span>
            {filters.topics.length > 0 || filters.difficulty.length > 0 ? (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            ) : null}
          </div>
        </div>

        {/* Recommendation Banner */}
        {showRecommendationBanner && initialFilters && (
          <RecommendationBanner 
            filters={filters}
            onClearRecommendations={clearRecommendations}
          />
        )}

        {/* Filter Bar */}
        <FilterBar
          allTopics={allTopics}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Questions Grid */}
        <AnimatePresence mode="wait">
          {filteredQuestions.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="no-results"
            >
              <h3>No questions found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="questions-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredQuestions.map((question, index) => (
                <QuestionCard
                  key={question._id || question.slug}
                  question={question}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  export default CodingQuestions;