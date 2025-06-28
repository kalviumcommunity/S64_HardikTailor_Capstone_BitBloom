import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/common.css';
import '../styles/payment.css';

const API_BASE_URL =  "http://localhost:5000";

interface Resource {
  _id: string;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  user?: {
    username: string;
    email: string;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

const PaymentPage: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  
  const navigate = useNavigate();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  const fetchResource = React.useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resources/${resourceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resource');
      }
      const data = await response.json();
      setResource(data);
    } catch (err) {
      setError('Failed to load resource details');
      console.error('Error fetching resource:', err);
    } finally {
      setLoading(false);
    }
  }, [resourceId]);

  useEffect(() => {
    if (!resourceId) {
      setError('Resource ID is required');
      setLoading(false);
      return;
    }

    fetchResource();
  }, [resourceId, fetchResource]);

  const handlePayment = async () => {
    if (!resource || !resourceId) return;

    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      // Create order
      const orderResponse = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resourceId })
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BitBloom',
        description: `Purchase: ${resource.title}`,
        order_id: orderData.orderId,
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                resourceId
              })
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            // Payment successful
            alert('🎉 Payment successful! You can now download the resource.');
            // Navigate to the resource page or resources list after a short delay
            setTimeout(() => {
              navigate('/resources');
            }, 1500);
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'User',
          email: 'user@example.com'
        },
        theme: {
          color: '#4a6fa5'
        },
        modal: {
          ondismiss: function(){
              setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(window.Razorpay);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  return (
    <>
      <Navbar />
      
      <motion.div 
        className="hero-section"
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold mb-3">
                Complete Your Purchase
              </h1>
              <p className="lead">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  className="text-center py-5"
                  variants={fadeInVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="payment-loading">
                    <div className="d-flex flex-column align-items-center">
                      <div className="mb-3">
                        <i className="bi bi-credit-card text-primary payment-icon"></i>
                      </div>
                      <LoadingSpinner />
                      <p className="mt-3 text-muted">Loading payment details...</p>
                      <small className="text-muted">Please wait while we prepare your secure checkout</small>
                    </div>
                  </div>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  className="text-center py-5"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="card border-0 shadow-lg payment-error">
                    <div className="card-body p-5">
                      <div className="mb-4">
                        <i className="bi bi-exclamation-triangle-fill text-danger payment-icon"></i>
                      </div>
                      <h3 className="text-danger mb-3">Oops! Something went wrong</h3>
                      <p className="text-muted mb-4">{error}</p>
                      <button 
                        className="custom-btn"
                        onClick={() => navigate('/resources')}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Resources
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : !resource ? (
                <motion.div 
                  key="not-found"
                  className="text-center py-5"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="card border-0 shadow-lg">
                    <div className="card-body p-5">
                      <div className="mb-4">
                        <i className="bi bi-file-earmark-x text-warning payment-icon"></i>
                      </div>
                      <h3 className="text-warning mb-3">Resource Not Found</h3>
                      <p className="text-muted mb-4">The resource you're looking for doesn't exist or has been removed.</p>
                      <button 
                        className="custom-btn"
                        onClick={() => navigate('/resources')}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Resources
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : resource.isFree ? (
                <motion.div 
                  key="free-resource"
                  className="text-center py-5"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="card border-0 shadow-lg payment-success">
                    <div className="card-body p-5">
                      <div className="mb-4">
                        <i className="bi bi-gift text-success payment-icon"></i>
                      </div>
                      <h3 className="text-success mb-3">This Resource is Free!</h3>
                      <p className="text-muted mb-4">
                        Great news! You can download this resource directly without any payment.
                      </p>
                      <div className="d-flex gap-3 justify-content-center">
                        <button 
                          className="custom-btn custom-btn-resource"
                          onClick={() => {
                            // Navigate to resource page or direct download
                            navigate(`/resource/${resourceId}`);
                          }}
                        >
                          <i className="bi bi-download me-2"></i>
                          Download Now
                        </button>
                        <button 
                          className="custom-outline-btn"
                          onClick={() => navigate('/resources')}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Back to Resources
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="payment-form"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="card border-0 shadow-lg payment-card">
                    <div className="card-body p-5">
                      {/* Resource Details */}
                      <div className="row align-items-center mb-4">
                        <div className="col-md-8">
                          <h3 className="card-title mb-3">
                            <i className="bi bi-file-earmark-text text-primary me-2"></i>
                            {resource.title}
                          </h3>
                          <p className="text-muted mb-3">{resource.description}</p>
                          {resource.user && (
                            <div className="d-flex align-items-center text-muted">
                              <i className="bi bi-person-circle me-2"></i>
                              <span>Created by <strong>{resource.user.username}</strong></span>
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 text-end">
                          <div className="price-tag">
                            <div className="text-muted small">Price</div>
                            <div className="display-6 fw-bold text-primary">
                              ₹{resource.price}
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />

                      {/* Payment Security Info */}
                      <div className="row mb-4">
                        <div className="col-12 text-center">
                          <div className="security-badge">
                            <i className="bi bi-shield-check"></i>
                            <span>Secure payment powered by <strong>Razorpay</strong> • 256-bit SSL encryption</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Buttons */}
                      <div className="d-grid gap-3">
                        <button
                          className={`payment-btn ${processing ? '' : 'payment-pulse'}`}
                          onClick={handlePayment}
                          disabled={processing}
                        >
                          {processing ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-credit-card me-2"></i>
                              Pay ₹{resource.price} Securely
                            </>
                          )}
                        </button>
                        <button
                          className="custom-outline-btn"
                          onClick={() => navigate('/resources')}
                          disabled={processing}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Cancel & Go Back
                        </button>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 pt-3 border-top payment-features">
                        <div className="row text-center text-muted small">
                          <div className="col-md-4">
                            <i className="bi bi-download me-1"></i>
                            Instant Download
                          </div>
                          <div className="col-md-4">
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            30-day Money Back
                          </div>
                          <div className="col-md-4">
                            <i className="bi bi-headset me-1"></i>
                            24/7 Support
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentPage; 