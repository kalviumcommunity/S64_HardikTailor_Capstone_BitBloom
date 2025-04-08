import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, required: true },
    price: {type: Number, validate: {
        validator: function (value: number) {
          // If not free, price must be provided
          if (!this.isFree && (value === undefined || value === null)) {
            return false;
          }
          return true;
        },
        message: 'Price is required if the resource is paid',
      },
    },
    file: { type: String }, // will store file path later
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
