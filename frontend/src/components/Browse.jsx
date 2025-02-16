import React from "react";  // ✅ React ka sahi import
import Job from "./Job";  // ✅ Ensure "Job.js" exist karta hai

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">
        Search Results ({randomJobs.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {randomJobs.map((item, index) => (
          <Job key={index} />  // ✅ Unique key added
        ))}
      </div>
    </div>
  );
};

export default Browse;
