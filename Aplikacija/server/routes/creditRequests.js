import express, { Router } from 'express'
import { deleteRequest, getCreditRequests, newCreditRequest } from '../controllers/creditRequestController.js'


const router = express.Router()

router.get('/', getCreditRequests);
router.post('/newrequest', newCreditRequest);
router.delete('/delete/:id', deleteRequest)

export default router;