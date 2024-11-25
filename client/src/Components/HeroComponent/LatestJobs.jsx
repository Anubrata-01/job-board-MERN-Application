import React from "react";

import { latestJobs } from "../../constant/jobs";

const LatestJobs = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-center text-purple-600">
      Latest Job Openings
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestJobs.map((job) => (
        <div
          key={job.jobId}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-lg sm:text-lg font-medium mb-2 text-black">
             {job.companyName}
          </h2>
          <h2 className="text-lg sm:text-lg font-medium mb-2 text-black">
          {job.role}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            <strong className="text-indigo-600">Region:</strong> {job.region}
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            <strong className="text-green-600">Type:</strong> {job.jobType}
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            <strong className="text-orange-600">Positions:</strong>{" "}
            {job.numberofPosition}
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            <strong className="text-purple-600">Salary:</strong> {job.salary}
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            <strong className="text-red-600">Description:</strong>{" "}
            {job.description}
          </p>
          <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default LatestJobs;
