// /* eslint-disable no-undef */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GET_ALL_JOBS } from "../../constant";

const fetchJobs = async () => {
  const response = await axios.get(GET_ALL_JOBS, { withCredentials: "include" });
  return response.data.jobs;
};

const Job = () => {
  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

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
  console.log(filters)
console.log(jobs)
  const filteredJobs = jobs?.filter((job) => {
    const matchesArea = filters.area ? job.region.toLowerCase().includes(filters.area.toLowerCase()) : true;
    const matchesSalary = filters.salaryRange
      ? job.salary >= filters.salaryRange.split("-")[0] &&
        job.salary <= filters.salaryRange.split("-")[1]
      : true;
    const matchesExperience = filters.experience ? job.experience === filters.experience : true;
    const matchesJobType = filters.jobType ? job.jobType == filters.jobType : true;
    const matchesCompanyName = filters.companyName
      ? job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
      : true;
    return matchesArea && matchesSalary && matchesExperience && matchesJobType && matchesCompanyName;
  });

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
              <option value="Part-time">Part-time</option>
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
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{job.role}</h2>
                <p className="text-gray-600 text-sm">
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Region:</strong> {job.region}
                </p>
                <p className="text-gray-600 text-sm truncate">
                  <strong>Description:</strong> {job.description}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Salary:</strong> ${job.salary}
                </p>
                <button
                  onClick={() => console.log(`Viewing details for job ID: ${job.jobId}`)}
                  className="mt-2 inline-block bg-blue-600 text-white font-semibold text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No jobs available matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Job);


