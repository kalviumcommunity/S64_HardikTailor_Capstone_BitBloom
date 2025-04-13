import express from 'express';
import { createResource, getResources, getResourceById , updateResource, deleteResource} from '../controller/resourceController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();


router.post('/', authMiddleware, createResource); 
router.get('/' , getResources);
router.get('/:id' , getResourceById);
router.put('/:id' , updateResource);
router.delete('/:id' , deleteResource);




export default router;
