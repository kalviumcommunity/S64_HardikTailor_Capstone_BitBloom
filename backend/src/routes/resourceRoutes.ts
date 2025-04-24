import express from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from '../controller/resourceController';
import { authMiddleware } from '../middleware/authMiddleware';
import upload from '../utils/multerConfig';

const router = express.Router();

router.post('/', authMiddleware, upload.single('file'), createResource);
router.get('/', getResources);
router.get('/:id', getResourceById);
router.put('/:id', authMiddleware, updateResource);
router.delete('/:id', authMiddleware, deleteResource);

export default router;
