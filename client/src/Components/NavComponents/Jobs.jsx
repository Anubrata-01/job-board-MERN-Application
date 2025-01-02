// /* eslint-disable no-undef */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { GET_ALL_JOBS, NUMBER_OF_APPLICANTS } from "../../constant";

 const fetchJobs = async () => {
  const response = await axios.get(GET_ALL_JOBS, { withCredentials: "include" });
  return response.data.jobs;
};
const applicantsForperjobs=async()=>{
  const response=await axios.get(NUMBER_OF_APPLICANTS,{ withCredentials: "include" });
  return response.data
}
const Job = () => {
  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    enabled: true,
  });
  const { data: applicantCounts, isLoading: applicantsLoading, isError: applicantsError } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      if (!jobs) return []; // Avoid unnecessary requests if jobs haven't loaded
      const counts = await applicantsForperjobs();
      return counts;
    },
    enabled: !!jobs, // Only fetch applicant counts after jobs are available
  });
 const navigate=useNavigate();
  const [filters, setFilters] = useState({
    area: "",
    salaryRange: "",
    experience: "",
    jobType: "",
    companyName: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  console.log(jobs);
console.log(applicantCounts)
  const filteredJobs = applicantCounts?.filter((job) => {
    const matchesArea = filters.area ? job.job?.region.toLowerCase().includes(filters.area.toLowerCase()) : true;
    const matchesSalary = filters.salaryRange
      ? job.job.salary >= filters.salaryRange.split("-")[0] &&
        job.job?.salary <= filters.salaryRange.split("-")[1]
      : true;
    const matchesExperience = filters.experience ? job.job?.experience === filters.experience : true;
    const matchesJobType = filters.jobType ? job.job?.jobType == filters.jobType : true;
    const matchesCompanyName = filters.companyName
      ? job.job?.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
      : true;
    const numberofapplications=job?.applicantCount
    return matchesArea && matchesSalary && matchesExperience && matchesJobType && matchesCompanyName && numberofapplications;
  });
  
  console.log(filteredJobs)
  // viewDetails functions
  const handleViewDetails=(job)=>{
    navigate(`/jobs/${job.job.jobId}`);
  }

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {error?.response?.data?.message || "Failed to fetch jobs."}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <input
              type="text"
              value={filters.area}
              onChange={(e) => handleFilterChange("area", e.target.value)}
              placeholder="Enter region"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Salary Range</label>
            <select
              value={filters.salaryRange}
              onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="0-50000">0 - 50,000</option>
              <option value="50000-100000">50,000 - 100,000</option>
              <option value="100000-150000">100,000 - 150,000</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange("experience", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange("jobType", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={filters.companyName}
              onChange={(e) => handleFilterChange("companyName", e.target.value)}
              placeholder="Enter company name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {filteredJobs?.length>0 &&
          filteredJobs.map((job) => 
        
            (
            <div
              key={job.job.jobId}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                {" "}
                
                <div>
                  <div className="flex items-start mb-4">
                    {" "}
                    {/* Image and title container */}
                    {/* <img
                      src=""
                      alt="User"
                      className="w-12 h-12 rounded-full mr-4"
                    />{" "} */}
                    {/* User Image */}
                    <div>
                      <h2 className="text-lg font-medium text-black">
                        {job.job.role}
                      </h2>
                      <p className="text-gray-500 text-sm">
                          Applicants: {job.applicantCount?job.applicantCount:"0"}
                        </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-4">
                    {/* Job Types (Full Time, Part Time) */}
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md mr-2 mb-1 text-xs">
                      {job?.job.jobType}
                    </span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs">
                      {job?.job.jobType}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {/* Job Description (truncated) */}
                    {job.job.description}
                  </p>
                </div>
                <div>
                  {" "}
                  {/* Bottom section with salary and date */}
                  <div className="flex justify-between items-end mt-auto">
                    {" "}
                    {/* Added mt-auto */}
                    <div>
                      <p className="text-lg font-medium text-black">
                        {job.job.salary}
                      </p>
                    </div>
                    <div className="text-right text-gray-500 text-sm">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M3 6.75h1.5m13.5 0h1.5m-16.5 0v9m3-12h13.5a3 3 0 013 3v6a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z"
                          />
                        </svg>
                        Posted:{" "}
                        {job.job.createdAt
                          ? new Date(job.job.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                <button
                  onClick={()=>handleViewDetails(job)}
                  className="mt-2 inline-block bg-blue-600 text-white font-semibold text-sm px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default React.memo(Job);


