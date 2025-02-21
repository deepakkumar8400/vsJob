// src/components/LatestJob.js
import React from "react";
import { useSelector } from 'react-redux';
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from '../hooks/useGetAllJobs';

const LatestJob = () => {
  useGetAllJobs(); // Fetch jobs on component mount
  const allJobs = useSelector((state) => state.jobs.allJobs);
  const isLoading = useSelector((state) => state.jobs.isLoading);

  return (
    <div className="max-w-5xl mx-auto my-12 p-6">
      {/* Section Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8">
        Latest & Top <span className="text-blue-600">Job Openings 🚀</span>
      </h1>

      {/* Job Cards */}
      {isLoading ? (
        <p>Loading...</p> // Show loading state
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards
              key={job._id}
              company={job.company?.name || "Unknown Company"} // Handle null company
              location={job.location}
              title={job.title}
              description={job.description}
              positions={`${job.position} Positions`}
              type={job.jobType}
              salary={`${job.salary} LPA`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJob;