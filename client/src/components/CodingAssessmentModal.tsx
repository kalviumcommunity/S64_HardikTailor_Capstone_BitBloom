import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight, FiChevronLeft, FiCheck, FiCode, FiTarget, FiClock, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';
import '../styles/CodingAssessmentModal.css';

interface AssessmentAnswer {
  experience: string;
  topics: string[];
  timePreference: string;
  goal: string;
  difficulty: string;
}

interface CodingAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (filters: { topics: string[]; difficulty: string[] }) => void;
}

interface TopicOption {
  value: string;
  label: string;
  description: string;
}

const CodingAssessmentModal: React.FC<CodingAssessmentModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [topicOptions, setTopicOptions] = useState<TopicOption[]>([]);

  const [answers, setAnswers] = useState<AssessmentAnswer>({
    experience: '',
    topics: [],
    timePreference: '',
    goal: '',
    difficulty: ''
  });

  const fetchTopics = async () => {
    try {
      const response = await axios.get<string[]>('https://bitbloom-1zw8.onrender.com/api/coding/topics');
      const formattedTopics: TopicOption[] = response.data.map(topic => ({
        value: topic,
        label: topic,
        description: `${topic} related problems`
      }));
      setTopicOptions(formattedTopics);
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTopics();
    }
  }, [isOpen]);

  const questions = [
    {
      id: 'experience',
      title: "What's your coding experience level?",
      subtitle: 'Help us understand your background',
      icon: <FiCode />,
      type: 'single',
      options: [
        { value: 'beginner', label: 'Beginner', description: 'New to programming or less than 1 year' },
        { value: 'intermediate', label: 'Intermediate', description: '1-3 years of programming experience' },
        { value: 'advanced', label: 'Advanced', description: '3+ years, comfortable with algorithms' },
        { value: 'expert', label: 'Expert', description: 'Extensive experience, competitive programming' }
      ]
    },
    {
      id: 'topics',
      title: 'Which topics interest you most?',
      subtitle: 'Select all that apply (minimum 2)',
      icon: <FiTarget />,
      type: 'multiple',
      options: topicOptions
    },
    {
      id: 'timePreference',
      title: 'How much time do you typically have?',
      subtitle: 'This helps us recommend appropriate difficulty',
      icon: <FiClock />,
      type: 'single',
      options: [
        { value: 'quick', label: '10-15 minutes', description: 'Quick practice sessions' },
        { value: 'moderate', label: '20-30 minutes', description: 'Focused problem solving' },
        { value: 'extended', label: '45+ minutes', description: 'Deep dive into complex problems' }
      ]
    },
    {
      id: 'goal',
      title: "What's your primary goal?",
      subtitle: 'We\'ll tailor recommendations accordingly',
      icon: <FiTrendingUp />,
      type: 'single',
      options: [
        { value: 'interview', label: 'Job Interviews', description: 'Prepare for technical interviews' },
        { value: 'learning', label: 'Skill Building', description: 'Learn new concepts and techniques' },
        { value: 'practice', label: 'Regular Practice', description: 'Maintain and improve coding skills' },
        { value: 'competition', label: 'Competitions', description: 'Competitive programming prep' }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canProceed = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id as keyof AssessmentAnswer];

    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length >= 2;
    }
    return answer !== '';
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const recommendedFilters = generateRecommendations(answers);
    onComplete(recommendedFilters);
    onClose();
  };

  const generateRecommendations = (answers: AssessmentAnswer): { topics: string[]; difficulty: string[] } => {
    const { experience, topics, timePreference, goal } = answers;
    let recommendedDifficulty: string[] = [];
    const recommendedTopics: string[] = topics;

    switch (experience) {
      case 'beginner':
        recommendedDifficulty = ['Easy'];
        break;
      case 'intermediate':
        recommendedDifficulty = timePreference === 'quick' ? ['Easy'] : timePreference === 'moderate' ? ['Easy', 'Medium'] : ['Medium'];
        break;
      case 'advanced':
        recommendedDifficulty = timePreference === 'quick' ? ['Easy', 'Medium'] : timePreference === 'moderate' ? ['Medium'] : ['Medium', 'Hard'];
        break;
      case 'expert':
        recommendedDifficulty = timePreference === 'quick' ? ['Medium'] : timePreference === 'moderate' ? ['Medium', 'Hard'] : ['Hard'];
        break;
    }

    if (goal === 'interview' && experience === 'intermediate') {
      recommendedDifficulty = ['Easy', 'Medium'];
    } else if (goal === 'competition') {
      recommendedDifficulty = ['Medium', 'Hard'];
    } else if (goal === 'learning' && experience === 'beginner') {
      recommendedDifficulty = ['Easy'];
    }

    return {
      topics: recommendedTopics,
      difficulty: recommendedDifficulty
    };
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="assessment-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="assessment-modal" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()}>
          <div className="assessment-header">
            <div className="assessment-header-content">
              <div className="assessment-icon">{currentQuestion.icon}</div>
              <div className="assessment-header-text">
                <h2>Find Your Perfect Challenges</h2>
                <p>Step {currentStep + 1} of {questions.length}</p>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}><FiX /></button>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
            <span className="progress-text">{Math.round(progress)}% Complete</span>
          </div>

          <div className="question-container">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="question-title">{currentQuestion.title}</h3>
              <p className="question-subtitle">{currentQuestion.subtitle}</p>

              <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    className={`option-card ${currentQuestion.type === 'multiple' ? (answers[currentQuestion.id as keyof AssessmentAnswer] as string[])?.includes(option.value) ? 'selected' : '' : answers[currentQuestion.id as keyof AssessmentAnswer] === option.value ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      if (currentQuestion.type === 'multiple') {
                        const currentAnswers = (answers[currentQuestion.id as keyof AssessmentAnswer] as string[]) || [];
                        const newAnswers = currentAnswers.includes(option.value)
                          ? currentAnswers.filter(a => a !== option.value)
                          : [...currentAnswers, option.value];
                        handleAnswerChange(currentQuestion.id, newAnswers);
                      } else {
                        handleAnswerChange(currentQuestion.id, option.value);
                      }
                    }}
                  >
                    <div className="option-content">
                      <div className="option-header">
                        <h4>{option.label}</h4>
                        {((currentQuestion.type === 'multiple' && (answers[currentQuestion.id as keyof AssessmentAnswer] as string[])?.includes(option.value)) || (currentQuestion.type === 'single' && answers[currentQuestion.id as keyof AssessmentAnswer] === option.value)) && <FiCheck className="check-icon" />}
                      </div>
                      <p>{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="assessment-navigation">
            <button className="nav-btn prev-btn" onClick={prevStep} disabled={currentStep === 0}><FiChevronLeft /> Previous</button>
            <button className={`nav-btn next-btn ${canProceed() ? 'enabled' : 'disabled'}`} onClick={nextStep} disabled={!canProceed()}>
              {currentStep === questions.length - 1 ? 'Get Recommendations' : 'Next'} <FiChevronRight />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CodingAssessmentModal;