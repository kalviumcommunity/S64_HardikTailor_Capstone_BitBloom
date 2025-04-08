import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, required: true },
    price: {type: Number, required: function () {
        return !this.isFree;
      },
    },
    file: { type: String }, // will store file path later
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
