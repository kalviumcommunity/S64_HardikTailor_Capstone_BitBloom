import express from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from '../controller/resourceController';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Create (protected)
router.post('/', authMiddleware, createResource);

// Read (public)
router.get('/', getResources);
router.get('/:id', getResourceById);

// Update/Delete (protected)
router.put('/:id', authMiddleware, updateResource);
router.delete('/:id', authMiddleware, deleteResource);

export default router;
