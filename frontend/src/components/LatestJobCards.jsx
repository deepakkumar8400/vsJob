// src/components/LatestJobCards.js
import React from "react";
import { Badge } from "@/components/ui/badge"; // Import badge correctly

const LatestJobCards = ({ company, location, title, description, positions, type, salary }) => {
  return (
    <div className="p-6 border border-gray-300 rounded-xl shadow-md bg-white hover:shadow-lg transition-all">
      {/* Company & Location */}
      <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
      <p className="text-gray-500">{location}</p>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-blue-600">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-bold">{positions}</Badge>
        <Badge className="bg-green-100 text-green-700 font-bold">{type}</Badge>
        <Badge className="bg-yellow-100 text-yellow-700 font-bold">{salary}</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;