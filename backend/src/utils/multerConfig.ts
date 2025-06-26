import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Supported file extensions
const docExts = ['.pdf', '.doc', '.docx', '.zip', '.ppt', '.pptx', '.txt'];
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
const videoExts = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (
    req: Request,
    file: Express.Multer.File
  ) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext);

    // Dynamically determine resource_type
    const resource_type = docExts.includes(ext) ? 'raw' : 'auto';

    return {
      folder: 'bitbloom-resources',
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      allowed_formats: [
        ...docExts,
        ...imageExts,
        ...videoExts,
      ].map((e) => e.replace('.', '')),
      public_id: () => baseName,
      resource_type, // ✅ included here inside `params`, not outside
    };
  },
});

const upload = multer({ storage });

export default upload;
