import express from 'express';
import { createResource } from '../controller/resourceController';
const router = express.Router();


router.post('/', createResource); 


export default router;
