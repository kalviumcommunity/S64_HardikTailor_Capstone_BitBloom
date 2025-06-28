import mongoose, { Document } from 'mongoose';

interface IPurchase extends Document {
  user: mongoose.Schema.Types.ObjectId;
  resource: mongoose.Schema.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const purchaseSchema = new mongoose.Schema<IPurchase>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

// Compound index to ensure a user can only purchase a resource once
purchaseSchema.index({ user: 1, resource: 1 }, { unique: true });

const Purchase = mongoose.model<IPurchase>('Purchase', purchaseSchema);
export default Purchase; 