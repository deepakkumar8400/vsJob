import React from "react";
import FilterCard from './FilterCard';
import Job from './Job';

const jobArray = [1,2,3,4,5,6,6,7,8,9,10]; // Define jobArray (replace with actual data)

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-1/5">
          <FilterCard />
        </div>
        <div className="flex-1 h-[80vh] overflow-y-auto">
          {jobArray.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {jobArray.map((item, index) => (
                <Job key={index} jobData={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
