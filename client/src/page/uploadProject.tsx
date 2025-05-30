import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/UploadProject.module.css';

const UploadProject: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (!title || !problemDescription || !techStack || !repoLink) {
      setError('Please fill in all required fields.');
      return;
    }

    const projectData = {
      title,
      problemDescription,
      techStack,
      repoLink,
    };

    try {
      setLoading(true);
      setUploadProgress(0);
      setError('');
      
      const token = localStorage.getItem('token'); // Assume auth token is stored
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      const response = await axios.post('http://localhost:5000/api/project/', projectData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setSuccess('Project uploaded successfully!');
        console.log(response.data);
        // Clear the form after successful upload
        setTitle('');
        setProblemDescription('');
        setTechStack('');
        setRepoLink('');
        setUploadProgress(0);
        
        // Redirect to projects page after 2 seconds
        setTimeout(() => {
          navigate('/projects');
        }, 2000);
      }, 500);
      
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload project.');
      console.error('Upload error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={`container py-5 ${styles.contentContainer}`}>
          <motion.div 
            className="text-center mb-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className={`fw-bold mb-3 ${styles.pageTitle}`}
              variants={itemVariants}
            >
              Upload Your Open Source Project
            </motion.h1>
            <motion.p 
              className={`lead ${styles.pageSubtitle}`}
              variants={itemVariants}
            >
              Share your innovative projects with our community and inspire collaboration!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className={styles.formCard}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className={styles.cardTitle}>Project Details</h4>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    className={styles.alertError}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {success && (
                  <motion.div 
                    className={styles.alertSuccess}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="title" className={styles.formLabel}>
                  Project Title <span style={{ color: 'var(--error-color)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title for your project"
                />
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="problemDescription" className={styles.formLabel}>
                  Problem Description <span style={{ color: 'var(--error-color)' }}>*</span>
                </label>
                <textarea
                  className={`${styles.formControl} ${styles.formControlTextarea}`}
                  id="problemDescription"
                  rows={5}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Describe the problem your project solves and its key features"
                ></textarea>
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="techStack" className={styles.formLabel}>
                  Tech Stack <span style={{ color: 'var(--error-color)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="techStack"
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                />
                <small style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'block' }}>
                  List the main technologies, frameworks, and libraries used in your project
                </small>
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="repoLink" className={styles.formLabel}>
                  Repository Link <span style={{ color: 'var(--error-color)' }}>*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.inputIcon} viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <input
                    type="text"
                    className={`${styles.formControl} ${styles.inputWithIconField}`}
                    id="repoLink"
                    placeholder="https://github.com/your-username/your-repo"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                  />
                </div>
                <small style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'block' }}>
                  Provide a link to your GitHub, GitLab, or Bitbucket repository
                </small>
              </motion.div>

              {loading && (
                <motion.div 
                  className={styles.progressContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
                  <div className={styles.progressText}>{Math.round(uploadProgress)}% Uploaded</div>
                </motion.div>
              )}

              {loading ? (
                <motion.div 
                  className={styles.loadingContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.loadingSpinner}></div>
                  <span className={styles.loadingText}>Uploading your project...</span>
                </motion.div>
              ) : (
                <motion.div 
                  className={styles.buttonContainer}
                  variants={itemVariants}
                >
                  <motion.button 
                    className={styles.cancelButton}
                    onClick={() => navigate('/projects')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    className={styles.uploadButton}
                    onClick={handleUpload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                      <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                    Upload Project
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className={styles.infoCard}
              variants={itemVariants}
            >
              <div className={styles.infoTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                  <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                </svg>
                Project Submission Guidelines
              </div>
              <ul className={styles.infoList}>
                <li className={styles.infoListItem}>Ensure your repository has a clear README with setup instructions</li>
                <li className={styles.infoListItem}>Include screenshots or demos if applicable</li>
                <li className={styles.infoListItem}>Make sure your code is well-documented and follows best practices</li>
                <li className={styles.infoListItem}>Specify any license information in your repository</li>
                <li className={styles.infoListItem}>Projects that violate our community guidelines may be removed</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadProject;
