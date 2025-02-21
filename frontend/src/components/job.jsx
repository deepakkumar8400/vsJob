// src/components/Job.js
import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/download.jpg";

const Job = ({ jobData = {} }) => {
  const {
    companyName = "Unknown Company",
    location = "Unknown Location",
    title = "Job Title",
    description = "",
    position = "",
    type = "",
    salary = "",
    daysAgo = "0", // Default value for days ago
  } = jobData;

  const navigate = useNavigate();
  const jobId = jobData._id; // Use the job ID from the job data

  return (
    <div className="p-5 border rounded-2xl shadow-lg bg-white w-full max-w-md mx-auto md:max-w-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-500 text-sm">{daysAgo} days ago</p>
        <Button variant="ghost" className="rounded-full p-2">
          <Bookmark className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      {/* Company Logo and Details */}
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={logo} alt="Company Logo" />
        </Avatar>
        <div>
          <p className="font-bold text-gray-800">{companyName}</p>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-gray-600 text-sm">
          {description?.length > 100 ? description.substring(0, 100) + "..." : description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {position && (
            <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
              {position} Positions
            </Badge>
          )}
          {type && (
            <Badge className="bg-red-100 text-red-700 font-semibold px-3 py-1">
              {type}
            </Badge>
          )}
          {salary && (
            <Badge className="bg-purple-100 text-purple-700 font-semibold px-3 py-1">
              {salary} LPA
            </Badge>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => navigate(`/description/${jobId}`)}
            variant="outline"
            className="w-1/2 border-gray-300"
          >
            Details
          </Button>
          <Button variant="default" className="w-1/2 bg-purple-600 text-white">
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;