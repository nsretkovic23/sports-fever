import express, { Router } from 'express';
import {getSportEvents, createSportEvent, updateSportEvent, getSportEventById} from '../controllers/sportEventsController.js';

import auth from '../middleware/auth.js';


const router= express.Router();

/* ISPRED RUTA DODATI auth, za one rute kojima treba autentifikacija,
npr za get()Events rute ne treba jer Evente moze videti svako */
/*potrebno dodati deleteEvent*/
router.get('/', getSportEvents);
router.get('/:id', getSportEventById);
router.post('/add', createSportEvent); 
router.patch('/:id', updateSportEvent);

export default router;