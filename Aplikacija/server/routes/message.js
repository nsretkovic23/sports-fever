import express, { Router } from 'express'
import {newMessage} from '../controllers/messagesController.js'

const router = express.Router()

router.post('/newmsg', newMessage);

export default router;