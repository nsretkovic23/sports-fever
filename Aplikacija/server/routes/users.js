import express, { Router } from 'express';
import {getUserById, signin, signup} from '../controllers/usersController.js';
import auth from '../middleware/auth.js';

const router= express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id',getUserById);

export default router;