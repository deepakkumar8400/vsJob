import { Job } from '../models/job.model.js';

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
    const userId = req.user?._id;
    
    if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
      return res.status(400).json({ message: 'Some required are missing', success: false });
    }

    const job = await Job.create({
        title,
        description,
        equirements: Array.isArray(requirements) ? requirements : requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experienceLevel,
        position,
        company: companyId,
        createdBy: userId,
      });

    return res.status(201).json({ message: 'Job created successfully', success: true, data: job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.body.keyword || '';
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };

    const jobs = await Job.find(query).sort({ createdAt: -1 }).populate('company');
    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found', success: false });
    }

    return res.status(200).json({ message: 'Jobs fetched successfully', success: true, data: jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user?._id;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs.length) {
      return res.status(404).json({ message: 'No admin jobs found', success: false });
    }
    return res.status(200).json({ message: 'Admin jobs fetched successfully', success: true, data: jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};
// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;  // Use req.params.id to get the job ID from URL

    const job = await Job.findById(jobId).populate('company');  // Use findById for fetching the job

    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    return res.status(200).json({ message: 'Job fetched successfully', success: true, data: job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};
