// utils/multerConfig.ts
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Configure Cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bitbloom-resources',
    resource_type: 'auto',
    public_id: (req, file) => {
      const sanitizedTitle = (req.body.title || 'untitled')
        .toLowerCase()
        .replace(/[^a-z0-9\s\-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      return `${sanitizedTitle}-${Date.now()}`;
    }
  }
});

// Configure multer to use Cloudinary storage
const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'application/zip',
      'application/x-rar-compressed',
      'application/x-tar',
      'application/x-7z-compressed',
      'application/x-zip-compressed',
      'multipart/x-zip',
      'text/javascript',
      'text/css',
      'text/html',
      'application/json',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('Rejected file type:', file.mimetype);
      cb(new Error(`Invalid file type: ${file.mimetype}. Only documents, images, archives, and common file formats are allowed.`));
    }
  },
});

export default upload;
