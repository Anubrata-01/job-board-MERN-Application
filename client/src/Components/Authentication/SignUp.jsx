/* eslint-disable react/prop-types */
import { useState } from "react";
import Passwordfeild from "../../utilities/Passwordfeild";
import { handleSignup } from "../../utilities";
import { SIGNUP_URL } from "../../constant";
import { useNavigate } from "react-router";

const SignUp = ({ toogleFuction, setUserData }) => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileType: "", // Added profileType for recruiter or student
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleProfileTypeChange = (e) => {
    setSignupData({
      ...signupData,
      profileType: e.target.value,
    });
  };
console.log(signupData)
  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg mx-auto mt-4 p-8 border border-green-300 rounded-lg shadow-lg bg-gradient-to-r from-green-50 via-white to-green-100">
      <h2 className="text-2xl font-bold mb-3 text-center text-green-600">Sign Up</h2>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
        <input
          required
          type="text"
          name="username"
          placeholder="Enter your full name"
          value={signupData.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          value={signupData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-3">
        <Passwordfeild
          placeholder="Enter your password"
          value={signupData.password}
          onValueChange={(val) => setSignupData({ ...signupData, password: val })}
        />
      </div>

      <div className="mb-3">
        <Passwordfeild
          placeholder="Confirm your password"
          value={signupData.confirmPassword}
          onValueChange={(val) => setSignupData({ ...signupData, confirmPassword: val })}
        />
      </div>

      {/* Profile Type Section */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Choose your profile type:
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="profileType"
              value="student"
              checked={signupData.profileType === "student"}
              onChange={handleProfileTypeChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Student</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="profileType"
              value="recruiter"
              checked={signupData.profileType === "recruiter"}
              onChange={handleProfileTypeChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Recruiter</span>
          </label>
        </div>
      </div>

      <button
        onClick={() => handleSignup(SIGNUP_URL, signupData, navigate, setUserData)}
        className="w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
      >
        Sign Up
      </button>

      <div className="flex justify-center mt-6">
        <span className="text-gray-700">
          Already have an account?
          <button className="text-green-500 font-semibold underline ml-2" onClick={toogleFuction}>
            Login
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
