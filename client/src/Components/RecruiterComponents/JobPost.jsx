import  { useState } from "react";
import { postJob } from "../../utilities";
import { JOBPOST_URL } from "../../constant";

const JobPost = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    region: "",
    role: "",
    description: "",
    numberOfPositions: "1",
    jobType: "",
    salary: "",
    jobId: "",
    
  });
  const initialFormData={
    companyName: "",
    region: "",
    role: "",
    description: "",
    numberOfPositions: "1",
    jobType: "",
    salary: "",
    jobId: "",
    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postJob(JOBPOST_URL,formData,setFormData,initialFormData)
    console.log("Job Posted:", formData);
    // You can add logic to send this data to the server
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Post a Job Opportunity
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Microsoft India"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="region">
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="e.g., India"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Backend Developer"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="description">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job requirements"
              rows="4"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Number of Positions */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="numberOfPositions">
              Number of Positions
            </label>
            <input
              type="number"
              id="numberOfPositions"
              name="numberOfPositions"
              value={formData.numberOfPositions}
              onChange={handleChange}
              placeholder="e.g., 5"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobType">
              Job Type
            </label>
            <input
              type="text"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="e.g., Intern"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="salary">
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., 25L"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Job ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobId">
              Job ID
            </label>
            <input
              type="number"
              id="jobId"
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
              placeholder="e.g., 1006"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
