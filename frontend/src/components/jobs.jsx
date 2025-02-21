// src/components/Jobs.js
import React from "react";
import { useSelector } from 'react-redux';
import FilterCard from './FilterCard';
import Job from './Job';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs(); // Fetch jobs on component mount
  const allJobs = useSelector((state) => state.jobs.allJobs);
  const isLoading = useSelector((state) => state.jobs.isLoading);

  // Function to calculate days ago
  const daysAgoFunction = (mongoTime) => {
    const created = new Date(mongoTime);
    const currentTime = new Date();
    const timeDifference = currentTime - created;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-1/5">
          <FilterCard />
        </div>
        <div className="flex-1 h-[80vh] overflow-y-auto">
          {isLoading ? (
            <span>Loading...</span> // Show loading state
          ) : allJobs.length <= 0 ? (
            <span>Job Not Found</span> // Show message if no jobs are found
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {allJobs.map((job) => (
                <Job
                  key={job._id}
                  jobData={{
                    ...job,
                    companyName: job.company?.name || "Unknown Company", // Handle null company
                    daysAgo: daysAgoFunction(job.createdAt), // Calculate days ago
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;