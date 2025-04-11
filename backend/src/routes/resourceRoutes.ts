import express from 'express';
import { createResource, getResources, getResourceById } from '../controller/resourceController';
const router = express.Router();


router.post('/', createResource); 
router.get('/' , getResources);
router.get('/:id' , getResourceById);




export default router;
