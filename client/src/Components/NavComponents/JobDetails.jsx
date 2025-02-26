/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { GET_JOB_DETAILS, SUBMIT_APPLICATION_URL } from "../../constant";
import { useAtom } from "jotai";
import { userDataAtom } from "../../store/store";


const Loader = () => (
  <div className="flex justify-center items-center h-48"> {/* Centering */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
); 

const fetchJobDetails = async (jobId) => {
  const response = await axios.get(`${GET_JOB_DETAILS}/jobs/${jobId}`, {
    withCredentials: "include",
  });
  return response.data;
};

const submitApplication = async (formData, jobId) => {
  const response = await axios.post(
    `${SUBMIT_APPLICATION_URL}/aply/${jobId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const JobDetails = () => {
  const { jobId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData] = useAtom(userDataAtom);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: () => fetchJobDetails(jobId),
    enabled: !!userData,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("resume", formValues.resume);

    try {
      await submitApplication(formData, jobId);
      setMessage("Application submitted successfully!");
      setIsModalOpen(false);
      setFormValues({ name: "", email: "", resume: null });
    } catch (err) {
      setMessage("Failed to submit application. Please try again.");
    }
  };

  if (isLoading) return <Loader/>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        {error?.response?.data?.message || "Failed to fetch job details."}
      </p>
    );

  if (!userData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md border border-gray-200 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login Required</h2>
        <p className="text-gray-600">
          You need to be logged in to apply for jobs. Please login or create an account.
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            onClick={() => navigate("/auth")}
          >
            Login/Signup
          </button>
        </div>
      </div>
    );
  }

  const job = data.job;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md border border-gray-200 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">{job.role}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 font-medium">Company:</p>
          <p className="text-lg font-semibold">{job.companyName}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Region:</p>
          <p className="text-lg font-semibold">{job.region}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Salary:</p>
          <p className="text-lg font-semibold">${job.salary}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Job Type:</p>
          <p className="text-lg font-semibold">{job.jobType}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-gray-500 font-medium">Description:</p>
        <p className="text-lg text-justify">{job.description}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Apply Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Submit Your Application</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Resume</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default JobDetails;