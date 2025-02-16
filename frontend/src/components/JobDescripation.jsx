import React from "react";
import { Badge } from "@/components/ui/badge"; // Import badge correctly
import { Button } from "@/components/ui/button"; // Shadcn button use for consistency

const JobDescription = () => {
  const isApplied = false; // State for applied job

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
      {/* Job Tags */}
      <div className="flex gap-3 mb-4">
        <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
          Full-Time
        </Badge>
        <Badge className="bg-green-100 text-green-700 font-semibold px-3 py-1">
          Remote
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-700 font-semibold px-3 py-1">
          $60K - $80K
        </Badge>
      </div>

      {/* Job Details */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">Frontend Developer</h2>
        <p className="text-gray-600">
          We are looking for a skilled frontend developer to join our dynamic team.
        </p>

        {/* Job Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">📍 Location: </span> New York, USA
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">📅 Posted Date: </span> Feb 13, 2025
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">💼 Experience: </span> 2+ years
          </p>
          <p className="text-gray-700 font-semibold">
            <span className="text-gray-500">👥 Total Applicants: </span> 120
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
