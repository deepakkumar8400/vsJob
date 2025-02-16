import React from "react";

const AppliedJobTable = () => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse border border-gray-200">
        <caption className="text-lg font-semibold mb-2">Your Applied Jobs</caption>
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="border p-2">Date</th>
            <th className="border p-2">Job Role</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((_, index) => (
            <tr key={index} className="text-center border-b">
              <td className="border p-2">13-02-2025</td>
              <td className="border p-2">Full Stack Developer</td>
              <td className="border p-2">Google</td>
              <td className="border p-2 text-green-600 font-semibold">Selected</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
