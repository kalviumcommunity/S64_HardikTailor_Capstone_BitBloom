import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ResourceCard.module.css';

const ResourceCard = ({ title, description, _id }: any) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card p-3 shadow-sm h-100 w-100">
        <h5>{title}</h5>
        <p>{description.substring(0, 80)}...</p>
        <button
          className="btn btn-sm btn-outline-primary mt-auto"
          onClick={handleReadMore}
        >
          Read More
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>{title}</h3>
                <button className={styles.closeButton} onClick={handleCloseModal}>
                  ×
                </button>
              </div>
              <div className={styles.modalBody}>
                <p>{description}</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate(`/resources/${_id}`)}
                >
                  View Full Resource
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResourceCard;
