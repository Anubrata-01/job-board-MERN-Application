import  { useCallback, useEffect, useState } from 'react'
import SIgnIn from './SIgnIn'
import SignUp from './SignUp';
import { useAtom } from 'jotai';
import { userDataAtom } from '../../store/store';
import { getUserInfo } from '../../utilities';
import { INFO_URL } from '../../constant';
import { useNavigate } from 'react-router';

const Auth = () => {
    const [isShow,setIsShow]=useState(false);
    const [userData,setUserData]=useAtom(userDataAtom);
    const navigate=useNavigate()
    const toogleFuction=()=>{
        setIsShow(!isShow)
    }
    const fetchUserInfo = useCallback(() => {
      getUserInfo(INFO_URL, setUserData);
    }, [setUserData]);
    
    useEffect(() => {
      fetchUserInfo();
    }, [fetchUserInfo])
    useEffect(() => {
          if (userData?.profileType) {
            if (userData.profileType === "recruiter") {
              navigate("/recruiter");
            } else if (userData.profileType === "student") {
              navigate("/home");
            }
          }
        }, [userData, navigate]);

  
    console.log(userData)
  return (
    <div className='min-h-screen  bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
     <h1 className=" text-xl font-bold font-mono text-white  text-center mt-5"> Welcome to Job Finder!</h1>

     <div>
        {
            isShow?(<SIgnIn toogleFuction={toogleFuction} setUserData={setUserData}/>):(<SignUp toogleFuction={toogleFuction} setUserData={setUserData}/>)
        }
        
     </div>
    </div>
  )
}

export default Auth



// import { useCallback, useEffect, useState } from "react";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
// import { useAtom } from "jotai";
// import { userDataAtom } from "../../store/store";
// import { getUserInfo } from "../../utilities";
// import { INFO_URL } from "../../constant";
// import { useNavigate } from "react-router";

// const Auth = () => {
//   const [isShow, setIsShow] = useState(false);
//   const [userData, setUserData] = useAtom(userDataAtom);
//   const [loading, setLoading] = useState(true); // Loading state for fetch
//   const navigate = useNavigate();

//   const toggleFunction = () => {
//     setIsShow(!isShow);
//   };

//   const fetchUserInfo = useCallback(async () => {
//     await getUserInfo(INFO_URL, setUserData);
//     setLoading(false); // Mark fetch as complete
//   }, [setUserData]);

//   useEffect(() => {
//     fetchUserInfo();
//   }, [fetchUserInfo]);

//   // Redirect if the user is already logged in
//   useEffect(() => {
//     if (userData?.profileType) {
//       if (userData.profileType === "recruiter") {
//         navigate("/recruiter");
//       } else if (userData.profileType === "student") {
//         navigate("/home");
//       }
//     }
//   }, [userData, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
//         <h2 className="text-white text-xl font-bold">Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-6">
//       <h1 className="text-xl font-bold font-mono text-white text-center mt-5">
//         Welcome to Job Finder!
//       </h1>

//       <div>
//         {isShow ? (
//           <SignIn toggleFunction={toggleFunction} setUserData={setUserData} />
//         ) : (
//           <SignUp toggleFunction={toggleFunction} setUserData={setUserData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;
