import express, { Router } from 'express'
import { deleteReport, getAllReports, newReport } from '../controllers/reportsController.js';

const router = express.Router()

router.get('/', getAllReports);
router.post('/newreport', newReport);
router.delete('/delete/:id', deleteReport)

export default router;