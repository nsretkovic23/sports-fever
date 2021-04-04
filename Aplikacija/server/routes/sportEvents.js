import express, { Router } from 'express';
import {getSportEvents, createSportEvent} from '../controllers/sportEventsController.js';

const router= express.Router();

router.get('/', getSportEvents);
router.post('/add', createSportEvent);

export default router;