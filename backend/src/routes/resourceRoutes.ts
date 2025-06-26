import express from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  downloadResource,
  deleteResource,
  UpdateResource
} from '../controller/resourceController';
import { authMiddleware } from '../middleware/authMiddleware';
import upload from '../utils/multerConfig';

const router = express.Router();


router.post('/', authMiddleware, upload.single('file'), createResource);
router.get('/', getResources);

router.get('/download/:id', authMiddleware, downloadResource);

// Get resource by ID route
router.get('/:id', getResourceById);
router.delete('/:id', authMiddleware , deleteResource);
router.put('/:id',authMiddleware, UpdateResource);

export default router;
            