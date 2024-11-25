/* eslint-disable react/prop-types */


// import { useAtom } from "jotai";
// import { Navigate, } from "react-router-dom";
// import { userDataAtom } from "../store/store";

// export const StudentProtectedRoute = ({ children }) => {
//   const [userData] = useAtom(userDataAtom);
//     console.log(userData)
//   if (!userData) {
//     return <Navigate to="/" />;
//   }

//   return userData?.profileType === "student" && children ;
// };

// export const RecruiterProtectedRoute = ({ children }) => {
//   const [userData] = useAtom(userDataAtom);

//   if (!userData) {
//     return <Navigate to="/" />;
//   }

//   return userData?.profileType === "recruiter" && children ;
// };

import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userDataAtom } from "../store/store";

export const StudentProtectedRoute = ({ children }) => {
  const [userData] = useAtom(userDataAtom);
  const profileType = userData?.profileType;

  if (!profileType) {
    return <Navigate to="/" />;
  }
  return profileType === "student" ? children : <Navigate to="/" />;
};

export const RecruiterProtectedRoute = ({ children }) => {
  const [userData] = useAtom(userDataAtom);
  const profileType = userData?.profileType;

  if (!profileType) {
    return <Navigate to="/" />;
  }
  return profileType === "recruiter" ? children : <Navigate to="/" />;
};

export const ProtectedRoute=({isAuth,children})=>{
    return isAuth?children:<Navigate to="/" />
}