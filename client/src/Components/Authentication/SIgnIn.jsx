/* eslint-disable react/prop-types */
// import React from 'react';
import { useState } from 'react';
import Passwordfeild from '../../utilities/Passwordfeild';
import { SignInFunction } from '../../utilities';
import { SIGNIN_URL } from '../../constant';
import { useNavigate } from "react-router-dom";
const SignIn = ({ toogleFuction,setUserData }) => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    profileType:""
  });
  const navigate= useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value
    });
  };
  console.log(signInData)

  const handleSignInBtn=()=>{
    SignInFunction(signInData,SIGNIN_URL,navigate,setUserData)
    
  }
  const handleProfileTypeChange = (e) => {
    setSignInData({
      ...signInData,
      profileType: e.target.value,
    });
  };
  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg mx-auto mt-6 p-8 border border-blue-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Login</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          required
          type="email"
          name='email'
          placeholder="Enter your Email"
          value={signInData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-3">
        <Passwordfeild 
         value={signInData.password} 
         onValueChange={(val) => setSignInData({ ...signInData, password: val })}
        />
      </div>
      <div className="mb-3 flex gap-4 items-center">
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
              checked={signInData.profileType === "student"}
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
              checked={signInData.profileType === "recruiter"}
              onChange={handleProfileTypeChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Recruiter</span>
          </label>
        </div>
      </div>
</div>

      <button
      onClick={handleSignInBtn}
        className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        Login
      </button>

      <div className="flex justify-center mt-6">
        <span className="text-gray-700">Don’t have an account?
          <button className="text-blue-500 font-semibold underline ml-2" onClick={toogleFuction}>
            Sign Up
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignIn;

