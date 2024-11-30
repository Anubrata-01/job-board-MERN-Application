// import React from 'react';
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userDataAtom } from "../../store/store";
import { getAppliedJobs } from "../../utilities";
import { APPLIED_JOBS_URL } from "../../constant";

const Profile = () => {
  const [userData] = useAtom(userDataAtom);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newEducation, setNewEducation] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [appliedJobs,setAppliedJobs]=useState([])

  useEffect(() => {
    if (userData) {
      getAppliedJobs(APPLIED_JOBS_URL, userData, setAppliedJobs);
    }
  }, [userData]);
  console.log(appliedJobs)
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

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
      {/* User Details Section */}
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
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3">Number of Posted Jobs</h3>
            <p>Display posted jobs by the user</p>
          </div>
        </>
      ) : (
        <>
          {/* Application Status */}
          <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3">Application Status</h3>
        {appliedJobs.length > 0 ? (
          <ul className="list-disc list-inside">
            {appliedJobs.map((job, index) => (
              <li key={index}>
                <strong>{job.role}</strong> - {job.companyName}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found.</p>
        )}
          </div>

          {/* Education Section */}
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

          {/* Skills Section */}
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

          {/* Projects Section */}
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
                className="p-2 mb-2 rounded w-full text-black"
                placeholder="Project name"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
              />
              <textarea
                className="p-2 rounded w-full text-black"
                placeholder="Project description"
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
        </>
      )}
    </div>
  );
};

export default Profile;
