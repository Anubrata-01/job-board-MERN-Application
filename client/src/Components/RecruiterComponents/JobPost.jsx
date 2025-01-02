// /* eslint-disable react/prop-types */
import { useState } from "react";
import { postJob } from "../../utilities";
import { JOBPOST_URL } from "../../constant";
import { useAtom } from "jotai";
import { userDataAtom } from "../../store/store";

const JobPost = () => {
  const [userData] = useAtom(userDataAtom);

  const [formData, setFormData] = useState({
    companyName: "",
    region: "",
    role: "",
    description: "",
    numberOfPositions: "1",
    jobType: "",
    salary: "",
    jobId: "",
    PostedBy: userData?.username || ""
  });

  const initialFormData = {
    companyName: "",
    region: "",
    role: "",
    description: "",
    numberOfPositions: "1",
    jobType: "",
    salary: "",
    jobId: "",
    PostedBy: userData?.username || ""
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    postJob(JOBPOST_URL, formData, setFormData, initialFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Post a Job Opportunity
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="region" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="numberOfPositions" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="jobType" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="salary" className="block text-gray-700 font-medium mb-1">
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
          <div>
            <label htmlFor="jobId" className="block text-gray-700 font-medium mb-1">
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


// import { useState } from "react";
// import { postJob } from "../../utilities";
// import { JOBPOST_URL } from "../../constant";
// import { useAtom } from "jotai";
// import { userDataAtom } from "../../store/store";

// const JobPost = () => {
//   const [userData] = useAtom(userDataAtom);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     jobType: "",
//     description: "",
//     salary: "",
//     PostedBy: userData?.username || "",
//     skills: [""],
//     tags: [""],
//     country: "",
//     city: "",
//     address: "",
//   });

//   const initialFormData = { ...formData };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddSkillTag = (type) => {
//     setFormData({ ...formData, [type]: [...formData[type], ""] });
//   };

//   const handleSkillTagChange = (index, type, value) => {
//     const updatedList = [...formData[type]];
//     updatedList[index] = value;
//     setFormData({ ...formData, [type]: updatedList });
//   };

//   const handleRemoveSkillTag = (index, type) => {
//     const updatedList = [...formData[type]];
//     updatedList.splice(index, 1);
//     setFormData({ ...formData, [type]: updatedList });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postJob(JOBPOST_URL, formData, setFormData, initialFormData);
//   };

//   const goToNextStep = () => setCurrentStep(currentStep + 1);
//   const goToPreviousStep = () => setCurrentStep(currentStep - 1);

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <>
//             <Input label="Company Name" name="companyName" formData={formData} handleChange={handleChange} placeholder="e.g., Microsoft India" required />
//             <Input label="Job Type" name="jobType" formData={formData} handleChange={handleChange} placeholder="e.g., Intern" required />
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <TextArea label="Job Description" name="description" formData={formData} handleChange={handleChange} placeholder="Describe the job requirements" required />
//             <Input label="Salary" name="salary" formData={formData} handleChange={handleChange} placeholder="e.g., 25L" required />
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <SkillTagSection label="Skills" type="skills" formData={formData} handleAddSkillTag={handleAddSkillTag} handleSkillTagChange={handleSkillTagChange} handleRemoveSkillTag={handleRemoveSkillTag} />
//             <SkillTagSection label="Tags" type="tags" formData={formData} handleAddSkillTag={handleAddSkillTag} handleSkillTagChange={handleSkillTagChange} handleRemoveSkillTag={handleRemoveSkillTag} />
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <Input label="Country" name="country" formData={formData} handleChange={handleChange} placeholder="e.g., India" required />
//             <Input label="City" name="city" formData={formData} handleChange={handleChange} placeholder="e.g., Bengaluru" required />
//             <TextArea label="Address" name="address" formData={formData} handleChange={handleChange} placeholder="e.g., Some address" required />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-10 px-4">
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Post a Job Opportunity</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {renderStepContent()}

//           <div className="flex justify-between">
//             {currentStep > 1 && (
//               <button type="button" onClick={goToPreviousStep} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300">Previous</button>
//             )}
//             {currentStep < 4 ? (
//               <button type="button" onClick={goToNextStep} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Next</button>
//             ) : (
//               <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300">Post Job</button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Input = ({ label, name, formData, handleChange, placeholder, required }) => (
//   <div>
//     <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
//     <input type="text" id={name} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required={required} />
//   </div>
// );

// const TextArea = ({ label, name, formData, handleChange, placeholder, required }) => (
//   <div>
//     <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
//     <textarea id={name} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} rows="4" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required={required}></textarea>
//   </div>
// );

// const SkillTagSection = ({ label, type, formData, handleAddSkillTag, handleSkillTagChange, handleRemoveSkillTag }) => (
//   <div>
//     <label className="block text-gray-700 font-medium mb-1">{label}</label>
//     {formData[type].map((item, index) => (
//       <div key={index} className="flex items-center mb-2">
//         <input type="text" value={item} onChange={(e) => handleSkillTagChange(index, type, e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mr-2" />
//         <button type="button" onClick={() => handleRemoveSkillTag(index, type)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
//       </div>
//     ))}
//     <button type="button" onClick={() => handleAddSkillTag(type)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add {label}</button>
//   </div>
// );

// export default JobPost;