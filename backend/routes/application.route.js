import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getApplicantCount,checkApplicationStatus,applyJob, getAppliedJobs, getApplicants, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

// Corrected: Change from GET to POST
router.route('/apply/:id').post(isAuthenticated, applyJob);

router.route('/get').get(isAuthenticated, getAppliedJobs);

router.route('/:id/applicants').get(isAuthenticated, getApplicants);

router.route('/status/:id/update').post(isAuthenticated, updateStatus);

// src/routes/application.route.js
router.route("/check/:id").get(isAuthenticated, checkApplicationStatus);

// src/routes/application.route.js
router.route("/count/:id").get(getApplicantCount);

export default router;