import express from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  downloadResource
} from '../controller/resourceController';
import { authMiddleware } from '../middleware/authMiddleware';
import upload from '../utils/multerConfig';

const router = express.Router();

router.post('/', authMiddleware, upload.single('file'), createResource);
router.get('/', getResources);
router.get('/:id', getResourceById);
router.get('/download/:id' , authMiddleware , downloadResource);

export default router;
            