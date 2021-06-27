import express, { Router } from 'express'
import {
  banUser,
  getUserById,
  signin,
  signup,
  addCredits,
} from '../controllers/usersController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:id', getUserById)
router.patch('/ban/:id', auth, banUser)
router.patch('/addcredits', addCredits)

export default router
