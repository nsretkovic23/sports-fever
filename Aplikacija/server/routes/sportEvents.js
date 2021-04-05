import express, { Router } from 'express';
import {getSportEvents, createSportEvent, updateSportEvent, getSportEventById} from '../controllers/sportEventsController.js';

const router= express.Router();

router.get('/', getSportEvents);
router.get('/:id', getSportEventById);
router.post('/add', createSportEvent);
router.patch('/:id', updateSportEvent);

export default router;