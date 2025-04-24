import mongoose, { Document } from 'mongoose';

interface IResource extends Document {
  title: string;
  description: string;
  isFree: boolean;
  price?: number; 
  file?: string; 
  user: mongoose.Schema.Types.ObjectId; 
}

const resourceSchema = new mongoose.Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, required: true },
    price: {
      type: Number,
      required: function (this: IResource) {
        return !this.isFree; 
      },
      validate: {
        validator: function (this: IResource, value: number) {
          if (!this.isFree && (value === undefined || value === null)) {
            return false;
          }
          return true;
        },
        message: 'Price is required if the resource is paid',
      },
    },
    file: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model<IResource>('Resource', resourceSchema);
export default Resource;
