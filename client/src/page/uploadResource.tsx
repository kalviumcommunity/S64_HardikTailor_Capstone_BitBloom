import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import styles from '../styles/UploadResource.module.css';

const UploadResource: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files?.length) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!title || !description || (!isFree && !price)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isFree', JSON.stringify(isFree));
    if (!isFree) formData.append('price', price);
    if (selectedFile) formData.append('file', selectedFile);

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
      
      const response = await axios.post('http://localhost:5000/api/resources', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        }
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setSuccess('Resource uploaded successfully!');
        console.log(response.data);
        // Clear the form after successful upload
        setTitle('');
        setDescription('');
        setPrice('');
        setSelectedFile(null);
        setUploadProgress(0);
        setError('');
      }, 500);
      
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload resource.');
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
              Upload Your Resource & Share with the Community
            </motion.h1>
            <motion.p 
              className={`lead ${styles.pageSubtitle}`}
              variants={itemVariants}
            >
              Help others by sharing your knowledge. Upload your files and set a price (or free)!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className={`${styles.uploadArea} ${isDragging ? styles.uploadAreaActive : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {selectedFile ? (
                <motion.div 
                  className={styles.fileInfo}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className={`bi bi-file-earmark-check ${styles.uploadIcon}`} viewBox="0 0 16 16">
                    <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                  </svg>
                  <p className={styles.fileName}>{selectedFile.name}</p>
                  <p className={styles.fileSize}>File Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <motion.button 
                    className={styles.removeFileButton}
                    onClick={handleRemoveFile}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    Remove File
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className={`bi bi-cloud-upload ${styles.uploadIcon}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                  <p className={styles.uploadText}>Drag & drop your files here</p>
                  <motion.button 
                    className={styles.browseButton}
                    onClick={handleBrowseClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">
                      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
                    </svg>
                    Browse files
                  </motion.button>
                  <input 
                    type="file" 
                    id="fileInput" 
                    ref={fileInputRef}
                    style={{ display: 'none' }} 
                    onChange={handleFileSelect} 
                  />
                </motion.div>
              )}
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="title" className={styles.formLabel}>
                Title
              </label>
              <input
                type="text"
                className={styles.formControl}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
              />
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="description" className={styles.formLabel}>
                Description
              </label>
              <textarea
                className={`${styles.formControl} ${styles.formControlTextarea}`}
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your resource in detail"
              ></textarea>
            </motion.div>

            <motion.div className={styles.switchContainer} variants={itemVariants}>
              <label className={styles.customSwitch}>
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={() => setIsFree(!isFree)}
                />
                <span className={styles.switchSlider}></span>
              </label>
              <span className={`${styles.switchLabel} ${isFree ? styles.switchFree : styles.switchPaid}`}>
                {isFree ? 'Free Resource' : 'Paid Resource'}
              </span>
            </motion.div>

            <AnimatePresence>
              {!isFree && (
                <motion.div 
                  className={styles.formGroup}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="price" className={styles.formLabel}>
                    Set Price (₹)
                  </label>
                  <input
                    type="number"
                    className={styles.formControl}
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price in INR"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <motion.div 
                className={styles.progressContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className={styles.progressBar}
                  initial={{ width: '0%' }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
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
                <span className={styles.loadingText}>Uploading your resource...</span>
              </motion.div>
            ) : (
              <motion.div 
                className={styles.buttonContainer}
                variants={itemVariants}
              >
                <motion.button 
                  className={styles.cancelButton}
                  onClick={() => window.history.back()}
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
                  Upload Resource
                </motion.button>
              </motion.div>
            )}

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
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadResource;
