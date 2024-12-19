/* eslint-disable no-unused-vars */
import React from 'react';
import { useAtom } from "jotai";
import { useState } from "react";
import { userDataAtom } from "../../store/store";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAppliedJobs, getPostedJobsByRecruiter, updateApplicationStatusClient } from "../../utilities";
import { APPLIED_JOBS_URL, POSTED_JOBS_URL, UPDATE_STATUS_URL } from "../../constant";

const Profile = () => {
  const [userData] = useAtom(userDataAtom);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newEducation, setNewEducation] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [status, setStatus] = useState("Application Sent");

  const {
    data: appliedJobs = [],
    isLoading: isLoadingAppliedJobs,
    isError: isErrorAppliedJobs,
  } = useQuery({
    queryKey: ["appliedJobs", userData?.id],
    queryFn: () => getAppliedJobs(APPLIED_JOBS_URL, userData),
    enabled: userData.profileType === "student",
  });

  const {
    data: postedJobsByRecruiter = { jobs: [], applications: [] },
    isLoading: isLoadingPostedJobs,
    isError: isErrorPostedJobs,
  } = useQuery({
    queryKey: ["postedJobs", userData?.id],
    queryFn: () => getPostedJobsByRecruiter(POSTED_JOBS_URL, userData),
    enabled: userData.profileType === "recruiter",
  });
console.log(appliedJobs)
  const toggleAccordion = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const addEducation = () => {
    if (newEducation) {
      setEducation([...education, newEducation]);
      setNewEducation("");
    }
  };

  const addSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const addProject = () => {
    if (newProject && projectDescription) {
      setProjects([
        ...projects,
        { name: newProject, description: projectDescription },
      ]);
      setNewProject("");
      setProjectDescription("");
    }
  };

  const getApplicationsForJob = (jobId) => {
    return postedJobsByRecruiter.applications.filter(
      (application) => application.jobId === jobId
    );
  };

const updateStatus=(applicationId,status)=>{
  const update=updateApplicationStatusClient(applicationId,status,UPDATE_STATUS_URL);
  console.log(update)
}
// const { mutate: updateStatus } = useMutation(
//   ({ applicationId, status }) =>
//     updateApplicationStatusClient(applicationId, status, UPDATE_STATUS_URL),
//   {
//     onSuccess: () => {
//       QueryClient.invalidateQueries(["postedJobs"]);
//     },
//   }
// );

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold mb-4">Profile Details</h2>
        <div className="text-lg">
          <p>
            <strong>Name:</strong> {userData?.username}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
          <p>
            <strong>Profile Type:</strong> {userData?.profileType}
          </p>
        </div>
      </div>
      {userData?.profileType === "recruiter" ? (
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3">Posted Jobs</h3>
          {postedJobsByRecruiter.jobs.length > 0 ? (
            <ul>
              {postedJobsByRecruiter.jobs.map((job, index) => {
                const applicationsForJob = getApplicationsForJob(job.jobId);
                console.log(applicationsForJob)
                return (
                  <li key={index} className="mb-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p>
                          <strong>Company:</strong> {job.companyName}
                        </p>
                        <p>
                          <strong>Role:</strong> {job.role}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleAccordion(job._id)}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-900 rounded text-white"
                      >
                        {expandedJobId === job._id ? "Hide" : "View"} Applicants
                      </button>
                    </div>
                    {expandedJobId === job._id && (
                      <div className="mt-4">
                        <h4 className="text-lg font-bold mb-2">Applicants:</h4>
                        {applicationsForJob.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {applicationsForJob.map((applicant, idx) => (
                             <li
                             key={idx}
                             className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8 lg:gap-10 p-4 border rounded-md shadow-md"
                           >
                             <div>
                               <p className="text-sm sm:text-base">
                                 <strong>Name:</strong> {applicant.name}
                               </p>
                             </div>
                             <div>
                               <p className="text-sm sm:text-base">
                                 <strong>Email:</strong> {applicant.email}
                               </p>
                             </div>
                             <div>
                               <p className="text-sm sm:text-base">
                                 <strong>Status:</strong> {applicant?.status}
                               </p>
                             </div>
                             <div>
                               <p className="text-sm sm:text-base">
                                 <strong>Resume:</strong>{" "}
                                 <a
                                   href={`http://localhost:5000/${applicant.resume.replace(/\\/g, "/")}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-blue-500 underline hover:text-blue-700"
                                 >
                                   View Resume
                                 </a>
                               </p>
                             </div>
                             <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
                    onClick={() => updateStatus(applicant._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                    onClick={() => updateStatus(applicant._id, "Rejected")}
                  >
                    Reject
                  </button>
                  {/* <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800" onClick={() => updateStatus({ applicationId: applicant._id, status: "Approved" })}>Approve</button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800" onClick={() => updateStatus({ applicationId: applicant._id, status: "Rejected" })}>Reject</button> */}
                </div>
                           </li>
                           
                            ))}
                          </ul>
                        ) : (
                          <p>No applicants found.</p>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3">Application Status</h3>
            {appliedJobs?.jobs?.length > 0 ? (
              <ul className="list-disc list-inside">
                {appliedJobs?.jobs?.map((job, index) => (
                  <li key={index}>
                    <strong>{job.role}</strong> - {job.companyName} -{" "}
                    <strong>{job?.status}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3">Education</h3>
            <ul className="list-disc list-inside">
              {education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                className="p-2 rounded w-full text-black"
                placeholder="Add your education"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
              />
              <button
                onClick={addEducation}
                className="mt-2 px-4 py-2 bg-purple-700 hover:bg-purple-900 rounded text-white"
              >
                Add Education
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3">Skills</h3>
            <ul className="list-disc list-inside">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                className="p-2 rounded w-full text-black"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
                onClick={addSkill}
                className="mt-2 px-4 py-2 bg-purple-700 hover:bg-purple-900 rounded text-white"
              >
                Add Skill
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Projects</h3>
            <ul className="list-disc list-inside">
              {projects.map((project, index) => (
                <li key={index}>
                  <strong>{project.name}:</strong> {project.description}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                className="p-2 rounded w-full text-black"
                placeholder="Add a project name"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
              />
              <textarea
                className="p-2 mt-2 rounded w-full text-black"
                placeholder="Describe your project"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>
              <button
                onClick={addProject}
                className="mt-2 px-4 py-2 bg-purple-700 hover:bg-purple-900 rounded text-white"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


// import { useAtom } from "jotai";
// import { useState } from "react";
// import { userDataAtom } from "../../store/store";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getAppliedJobs,
//   getPostedJobsByRecruiter,
//   updateApplicationStatus,
// } from "../../utilities";
// import { APPLIED_JOBS_URL, POSTED_JOBS_URL, UPDATE_STATUS_URL } from "../../constant";

// const Profile = () => {
//   const [userData] = useAtom(userDataAtom);
//   const [education, setEducation] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [newEducation, setNewEducation] = useState("");
//   const [newSkill, setNewSkill] = useState("");
//   const [newProject, setNewProject] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [expandedJobId, setExpandedJobId] = useState(null);

//   const queryClient = useQueryClient();

//   const {
//     data: appliedJobs = [],
//     isLoading: isLoadingAppliedJobs,
//     isError: isErrorAppliedJobs,
//   } = useQuery({
//     queryKey: ["appliedJobs", userData?.id],
//     queryFn: () => getAppliedJobs(APPLIED_JOBS_URL, userData),
//     enabled: userData.profileType === "student",
//   });

//   const {
//     data: postedJobsByRecruiter = { jobs: [], applications: [] },
//     isLoading: isLoadingPostedJobs,
//     isError: isErrorPostedJobs,
//   } = useQuery({
//     queryKey: ["postedJobs", userData?.id],
//     queryFn: () => getPostedJobsByRecruiter(POSTED_JOBS_URL, userData),
//     enabled: userData.profileType === "recruiter",
//   });

//   const updateStatusMutation = useMutation(updateApplicationStatus, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("postedJobs");
//     },
//   });

//   const toggleAccordion = (jobId) => {
//     setExpandedJobId(expandedJobId === jobId ? null : jobId);
//   };

//   const addEducation = () => {
//     if (newEducation) {
//       setEducation([...education, newEducation]);
//       setNewEducation("");
//     }
//   };

//   const addSkill = () => {
//     if (newSkill) {
//       setSkills([...skills, newSkill]);
//       setNewSkill("");
//     }
//   };

//   const addProject = () => {
//     if (newProject && projectDescription) {
//       setProjects([
//         ...projects,
//         { name: newProject, description: projectDescription },
//       ]);
//       setNewProject("");
//       setProjectDescription("");
//     }
//   };

//   const handleUpdateStatus = (applicationId, newStatus) => {
//     updateStatusMutation.mutate({ url: UPDATE_STATUS_URL, applicationId, newStatus });
//   };

//   const getApplicationsForJob = (jobId) => {
//     return postedJobsByRecruiter.applications.filter(
//       (application) => application.jobId === jobId
//     );
//   };

//   return (
//     <div className="p-6 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
//       <div className="mb-6">
//         <h2 className="text-4xl font-extrabold mb-4">Profile Details</h2>
//         <div className="text-lg">
//           <p>
//             <strong>Name:</strong> {userData?.username}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData?.email}
//           </p>
//           <p>
//             <strong>Profile Type:</strong> {userData?.profileType}
//           </p>
//         </div>
//       </div>
//       {userData?.profileType === "recruiter" ? (
//         <div className="mb-6">
//           <h3 className="text-2xl font-bold mb-3">Posted Jobs</h3>
//           {postedJobsByRecruiter.jobs.length > 0 ? (
//             <ul>
//               {postedJobsByRecruiter.jobs.map((job, index) => {
//                 const applicationsForJob = getApplicationsForJob(job.jobId);
//                 return (
//                   <li key={index} className="mb-4 border-b pb-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p>
//                           <strong>Company:</strong> {job.companyName}
//                         </p>
//                         <p>
//                           <strong>Role:</strong> {job.role}
//                         </p>
//                         <p>
//                           <strong>Date:</strong>{" "}
//                           {new Date(job.createdAt).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => toggleAccordion(job._id)}
//                         className="px-4 py-2 bg-purple-700 hover:bg-purple-900 rounded text-white"
//                       >
//                         {expandedJobId === job._id ? "Hide" : "View"} Applicants
//                       </button>
//                     </div>
//                     {expandedJobId === job._id && (
//                       <div className="mt-4">
//                         <h4 className="text-lg font-bold mb-2">Applicants:</h4>
//                         {applicationsForJob.length > 0 ? (
//                           <ul className="list-disc list-inside">
//                             {applicationsForJob.map((applicant, idx) => (
//                               <li key={idx} className="mb-2">
//                                 <p>
//                                   <strong>Name:</strong> {applicant.name}
//                                 </p>
//                                 <p>
//                                   <strong>Email:</strong> {applicant.email}
//                                 </p>
//                                 <p>
//                                   <strong>Resume:</strong>{" "}
//                                   <a
//                                     href={`http://localhost:5000/${applicant.resume.replace(
//                                       /\\/g,
//                                       "/"
//                                     )}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-500 underline hover:text-blue-700"
//                                   >
//                                     View Resume
//                                   </a>
//                                 </p>
//                                 <div className="mt-2 flex gap-2">
//                                   <button
//                                     onClick={() =>
//                                       handleUpdateStatus(applicant._id, "Accepted")
//                                     }
//                                     className="px-4 py-2 bg-green-600 hover:bg-green-800 rounded text-white"
//                                   >
//                                     Accept
//                                   </button>
//                                   <button
//                                     onClick={() =>
//                                       handleUpdateStatus(applicant._id, "Rejected")
//                                     }
//                                     className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded text-white"
//                                   >
//                                     Reject
//                                   </button>
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p>No applicants found.</p>
//                         )}
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <p>No jobs posted yet.</p>
//           )}
//         </div>
//       ) : (
//         <div>
//           <h3 className="text-2xl font-bold mb-3">Application Status</h3>
//           {appliedJobs?.jobs?.length > 0 ? (
//             <ul className="list-disc list-inside">
//               {appliedJobs?.jobs?.map((job, index) => (
//                 <li key={index}>
//                   <strong>{job.role}</strong> - {job.companyName} -{" "}
//                   <strong>{job.status}</strong>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No applications found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
