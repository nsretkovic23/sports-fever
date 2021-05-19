import express, { Router } from 'express'
import {
  getSportEvents,
  createSportEvent,
  updateSportEvent,
  getSportEventById,
  filterEvents,
  joinEvent,
} from '../controllers/sportEventsController.js'

import auth from '../middleware/auth.js'

const router = express.Router()

/* ISPRED RUTA DODATI auth, za one rute kojima treba autentifikacija,
npr za get()Events rute ne treba jer Evente moze videti svako */
/*potrebno dodati deleteEvent*/
//router.get('/filter/:date', filterEvents);
router.get('/filter/:long-:lat-:sport.:date.:spots.:price', filterEvents) //.:price dodati za cenu
router.get('/', getSportEvents)
router.get('/:id', getSportEventById)
router.post('/add', createSportEvent)
router.patch('/:id', auth, updateSportEvent)
router.post('/join', joinEvent);

export default router
