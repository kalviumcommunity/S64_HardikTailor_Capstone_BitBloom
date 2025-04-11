import express from 'express';
import { createResource, getResources, getResourceById , updateResource} from '../controller/resourceController';
const router = express.Router();


router.post('/', createResource); 
router.get('/' , getResources);
router.get('/:id' , getResourceById);
router.put('/:id' , updateResource);




export default router;
