// src/components/JobDescription.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge"; // Import badge correctly
import { Button } from "@/components/ui/button"; // Shadcn button use for consistency
import { setLoading, setJob } from "../redux/jobSlice"; // Import actions

const JobDescription = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams(); // Get job ID from the URL
  const job = useSelector((state) => state.jobs.job); // Get job details from Redux store
  const isLoading = useSelector((state) => state.jobs.isLoading); // Get loading state
  const isApplied = false; // State for applied job (can be updated later)

  // Fetch single job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      dispatch(setLoading()); // Set loading to true
      try {
        const res = await axios.get(`http://localhost:9001/api/v1/job/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setJob(res.data.data)); // Dispatch the fetched job
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchSingleJob();
  }, [dispatch, jobId]);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (!job) {
    return <p>Job not found</p>; // Show message if job is not found
  }

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
      {/* Job Tags */}
      <div className="flex gap-3 mb-4">
        <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
          {job.jobType}
        </Badge>
        <Badge className="bg-green-100 text-green-700 font-semibold px-3 py-1">
          {job.location}
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-700 font-semibold px-3 py-1">
          ${job.salary}K
        </Badge>
      </div>

      {/* Job Details */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
        <p className="text-gray-600">{job.description}</p>

        {/* Job Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">📍 Location: </span> {job.location}
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">📅 Posted Date: </span>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">💼 Experience: </span>{" "}
            {job.experienceLevel}+ years
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">👥 Total Applicants: </span>{" "}
            {job.application?.length || 0}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        variant={isApplied ? "secondary" : "default"}
        className="mt-6 w-full py-2 text-lg font-semibold"
        disabled={isApplied} // Disable button if already applied
      >
        {isApplied ? "✅ Already Applied" : "🚀 Apply Now"}
      </Button>
    </div>
  );
};

export default JobDescription;