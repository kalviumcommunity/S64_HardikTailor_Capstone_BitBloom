import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'bitbloom-resources', // 
      allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
