import express from 'express';
import { createResource, getResources } from '../controller/resourceController';
import { get } from 'http';
const router = express.Router();


router.post('/', createResource); 
router.get('/' , getResources);



export default router;
