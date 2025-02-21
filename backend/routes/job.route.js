import express from 'express';
import { getAdminJobs, getAllJobs, postJob, getJobById } from '../controllers/job.controller.js';  // Import the new function
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);  // Correct this route to use getJobById

export default router;
