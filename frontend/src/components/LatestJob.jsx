import React from "react";
import LatestJobCards from "./LatestJobCards"; // Importing job card component

const jobList = [
  {
    company: "Google",
    location: "India",
    title: "Software Engineer",
    description: "Work on cutting-edge technology and AI solutions.",
    positions: "5 Positions",
    type: "Full Time",
    salary: "24 LPA",
  },
  {
    company: "Microsoft",
    location: "India",
    title: "Backend Developer",
    description: "Build scalable and secure backend services.",
    positions: "3 Positions",
    type: "Part Time",
    salary: "20 LPA",
  },
  {
    company: "Amazon",
    location: "Bangalore",
    title: "Frontend Developer",
    description: "Design and develop UI components for large-scale apps.",
    positions: "4 Positions",
    type: "Full Time",
    salary: "22 LPA",
  },
  {
    company: "Netflix",
    location: "Remote",
    title: "Fullstack Developer",
    description: "Work with cutting-edge streaming technologies.",
    positions: "2 Positions",
    type: "Remote",
    salary: "26 LPA",
  },
];

const LatestJob = () => {
  return (
    <div className="max-w-5xl mx-auto my-12 p-6">
      {/* Section Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8">
        Latest & Top <span className="text-blue-600">Job Openings 🚀</span>
      </h1>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobList.slice(0, 6).map((job, index) => (
          <LatestJobCards key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJob;
