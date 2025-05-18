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

// Resource CRUD routes
router.post('/', authMiddleware, upload.single('file'), createResource);
router.get('/', getResources);

// Download route - authMiddleware is optional for free resources but required for paid ones
// The controller will handle the logic to determine if authentication is required
// Important: This route must come before the generic /:id route to avoid conflicts
router.get('/download/:id', authMiddleware, downloadResource);

// Get resource by ID route
router.get('/:id', getResourceById);

export default router;
            