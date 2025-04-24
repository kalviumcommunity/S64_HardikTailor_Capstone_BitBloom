import multer from 'multer';
import path from 'path';


const sanitizeTitle = (title: string): string => {
  return title
    .toLowerCase()        
    .replace(/[^a-z0-9\s\-]/g, '')  
    .replace(/\s+/g, '-')    
    .trim();                
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    const sanitizedTitle = sanitizeTitle(req.body.title || 'untitled');

    const uniqueFilename = `${sanitizedTitle}_${Date.now()}${path.extname(file.originalname)}`;

    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export default upload;
