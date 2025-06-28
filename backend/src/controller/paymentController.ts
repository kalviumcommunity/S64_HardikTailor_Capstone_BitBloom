import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';
import Resource from '../models/Resource';
import Purchase from '../models/Purchase';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// POST /api/payment/create-order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }

    // Check if resource exists and is paid
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.isFree) {
      return res.status(400).json({ message: 'This resource is free' });
    }

    if (!resource.price) {
      return res.status(400).json({ message: 'Resource price not set' });
    }

    // Check if user has already purchased this resource
    const existingPurchase = await Purchase.findOne({
      user: userId,
      resource: resourceId,
      status: 'completed'
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'You have already purchased this resource' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: resource.price * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `res_${Date.now()}`,
      notes: {
        resourceId: resourceId,
        userId: userId,
        resourceTitle: resource.title
      }
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
  console.error('🔥 Error creating Razorpay order:', error?.message || error);
  if (error?.error) {
    console.error('🔍 Razorpay error details:', JSON.stringify(error.error, null, 2));
  }
  res.status(500).json({ message: 'Failed to create order', error: error?.message || 'Unknown error' });
}
};

// POST /api/payment/verify
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      resourceId 
    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Get resource details
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.isFree) {
      return res.status(400).json({ message: 'This resource is free' });
    }

    // Check if purchase already exists
    let purchase = await Purchase.findOne({
      user: userId,
      resource: resourceId
    });

    if (purchase) {
      // Update existing purchase
      purchase.razorpayPaymentId = razorpay_payment_id;
      purchase.status = 'completed';
      await purchase.save();
    } else {
      // Create new purchase record
      purchase = new Purchase({
        user: userId,
        resource: resourceId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: resource.price!,
        status: 'completed'
      });
      await purchase.save();
    }

    res.status(200).json({
      message: 'Payment verified successfully',
      purchaseId: purchase._id,
      resourceId: resourceId
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
};

// Helper function to check if user has purchased a resource
export const userHasPurchased = async (userId: string, resourceId: string): Promise<boolean> => {
  try {
    const purchase = await Purchase.findOne({
      user: userId,
      resource: resourceId,
      status: 'completed'
    });
    return !!purchase;
  } catch (error) {
    console.error('Error checking purchase status:', error);
    return false;
  }
}; 