import express from 'express';
import { createOrder, verifyPayment } from '../controller/paymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', authMiddleware, createOrder);

// Verify payment
router.post('/verify', authMiddleware, verifyPayment);

export default router; 