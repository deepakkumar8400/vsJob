import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setLoading, setJob } from "../redux/jobSlice";

const JobDescription = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const job = useSelector((state) => state.jobs.job);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const [isApplied, setIsApplied] = useState(false); // State to track if the user has applied
  const [applicantCount, setApplicantCount] = useState(0); // State to track total applicants

  // Fetch applicant count
  const fetchApplicantCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9001/api/v1/application/count/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setApplicantCount(res.data.count); // Update applicant count
      }
    } catch (error) {
      console.error("Error fetching applicant count:", error);
    }
  };

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

  // Fetch applicant count when the component loads
  useEffect(() => {
    fetchApplicantCount();
  }, [jobId]);

  // Check if the user has already applied for the job
  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9001/api/v1/application/check/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setIsApplied(res.data.isApplied); // Update isApplied state
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    if (jobId) {
      checkIfApplied();
    }
  }, [jobId]);

  // Handle Apply Now button click
  const handleApply = async () => {
    try {
      const res = await axios.post(
        `http://localhost:9001/api/v1/application/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update isApplied state to true
        fetchApplicantCount(); // Fetch updated applicant count
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found</p>;
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
            {applicantCount} {/* Display real-time applicant count */}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        variant={isApplied ? "secondary" : "default"}
        className="mt-6 w-full py-2 text-lg font-semibold"
        disabled={isApplied} // Disable button if already applied
        onClick={!isApplied ? handleApply : undefined} // Only call handleApply if not applied
      >
        {isApplied ? "✅ Already Applied" : "🚀 Apply Now"}
      </Button>
    </div>
  );
};

export default JobDescription;