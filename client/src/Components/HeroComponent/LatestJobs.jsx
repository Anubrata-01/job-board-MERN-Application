/* eslint-disable no-unused-vars */

// import React from "react";

// import { latestJobs } from "../../constant/jobs";

// const LatestJobs = () => {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//     <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-center text-purple-600">
//       Latest Job Openings
//     </h1>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {latestJobs.map((job) => (
//         <div
//           key={job.jobId}
//           className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
//         >
//           <h2 className="text-lg sm:text-lg font-medium mb-2 text-black">
//              {job.companyName}
//           </h2>
//           <h2 className="text-lg sm:text-lg font-medium mb-2 text-black">
//           {job.role}
//           </h2>
//           <p className="text-gray-700 text-sm sm:text-base mb-2">
//             <strong className="text-indigo-600">Region:</strong> {job.region}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base mb-2">
//             <strong className="text-green-600">Type:</strong> {job.jobType}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base mb-2">
//             <strong className="text-orange-600">Positions:</strong>{" "}
//             {job.numberofPosition}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base mb-2">
//             <strong className="text-purple-600">Salary:</strong> {job.salary}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base mb-4">
//             <strong className="text-red-600">Description:</strong>{" "}
//             {job.description}
//           </p>
//           <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//             Apply Now
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// };

// export default LatestJobs;

import { useQuery } from "@tanstack/react-query";
import { latestJobs } from "../../constant/jobs";
import axios from "axios";
import { GET_ALL_JOBS } from "../../constant";
import { features } from "../../utilities/CommonUi";
// import userImage from "../../assets/user.png"
const fetchJobs = async () => {
  const response = await axios.get(GET_ALL_JOBS, {
    withCredentials: "include",
  });
  return response.data.jobs;
};
const LatestJobs = () => {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  console.log(jobs);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-center text-purple-600">
        Latest Job Openings
      </h1>
      <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Why Choose JobFindr
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                {feature.description}
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-6">
                                {feature.benefits.map((benefit, i) => (
                                    <li key={i} className="mb-1">
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-center w-full">
                                <a
                                    href={feature.ctaLink}
                                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-md inline-block"
                                >
                                    {feature.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-gray-500">
                    Trusted by 10,000+ companies worldwide
                </p>
            </div>
        </div>
      

    </div>
  );
};

export default LatestJobs;
