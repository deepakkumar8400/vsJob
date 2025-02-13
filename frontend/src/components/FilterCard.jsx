import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const filterData = [
  {
    filterType: "Location",
    arrays: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune"],
  },
  {
    filterType: "Job Type",
    arrays: ["Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    arrays: ["0-10K", "10K-50K", "50K+"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h1 className="text-xl font-semibold">Filter Jobs</h1>
      <hr className="my-2" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold">{data.filterType}</h2>
          <RadioGroup>
            {data.arrays.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
