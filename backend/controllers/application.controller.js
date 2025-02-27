import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id; 

        if (!jobId) {
            return res.status(400).json({
                message: 'Job Id is required',
                success: false
            });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId 
        });

        if (existingApplication) {
            return res.status(200).json({
                message: 'You have already applied for this job',
                success: false
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        const newApplication = new Application({
            job: jobId,
            applicant: userId
        });
        await newApplication.save();

        // Ensure applications array exists
        if (!job.applications) {
            job.applications = [];
        }

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: 'Application submitted successfully',
            success: true,
        });

    } catch (error) {
        console.log("Error in applyJob:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({
            applicant: userId
        }).sort({ createdAt: -1 }).populate({
            path: 'job',
            populate: {
                path: 'company'
            }
        });

        if (!applications.length) { 
            return res.status(404).json({
                message: 'No applications found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Applied Jobs fetched successfully',
            success: true,
            applications
        });

    } catch (error) {
        console.log("Error in getAppliedJobs:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const getApplicants = async (req, res) => { 
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ 
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Applicants fetched successfully',
            success: true,
            job
        });

    } catch (error) {
        console.log("Error in getApplicants:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        const application = await Application.findById(applicationId); 

        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }

        application.status = status.toLowerCase(); 
        await application.save();

        return res.status(200).json({
            message: 'Application status updated successfully',
            success: true
        });

    } catch (error) {
        console.log("Error in updateStatus:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// src/controllers/application.controller.js
export const checkApplicationStatus = async (req, res) => {
    try {
      const userId = req.id;
      const jobId = req.params.id;
  
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
  
      return res.status(200).json({
        success: true,
        isApplied: !!existingApplication, // Return true if application exists
      });
    } catch (error) {
      console.log("Error in checkApplicationStatus:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  };

  // src/controllers/application.controller.js
export const getApplicantCount = async (req, res) => {
    try {
      const jobId = req.params.id;
  
      const count = await Application.countDocuments({ job: jobId });
  
      return res.status(200).json({
        success: true,
        count, // Return the total number of applicants
      });
    } catch (error) {
      console.log("Error in getApplicantCount:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  };