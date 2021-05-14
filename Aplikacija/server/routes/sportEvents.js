import express, { Router } from 'express'
import {
  getSportEvents,
  createSportEvent,
  updateSportEvent,
  getSportEventById,
  getNearbySportEvents
} from '../controllers/sportEventsController.js'

import auth from '../middleware/auth.js'

const router = express.Router()

/* ISPRED RUTA DODATI auth, za one rute kojima treba autentifikacija,
npr za get()Events rute ne treba jer Evente moze videti svako */
/*potrebno dodati deleteEvent*/
router.get('/:long-:lat', getNearbySportEvents);
router.get('/', getSportEvents);
router.get('/:id', getSportEventById);
router.post('/add', auth, createSportEvent);
router.patch('/:id', auth, updateSportEvent);

export default router
