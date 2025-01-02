// /* eslint-disable no-unused-vars */

import { AlignJustify, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logoutFromAccount } from "../utilities";
import { useAtom } from "jotai";
import { userDataAtom } from "../store/store";
import { INFO_URL, LOGOUT_URL } from "../constant";

const Navbar = () => {
  const [displayNavItems, setDisplayNavItems] = useState(false);
  const [userData, setUserData] = useAtom(userDataAtom);
  const navigate = useNavigate();
  useEffect(()=>{
    getUserInfo(INFO_URL,setUserData)
  },[setUserData])
  const handleMenu = () => setDisplayNavItems(prev => !prev);

  const handleLogin = () => navigate("/auth");
 console.log(userData)
  const renderLinks = () => {
    const baseLinkStyles = "p-2 block font-medium transition-colors duration-300";
    const hoverRecruiter = "hover:text-blue-600";
    const hoverOther = "hover:text-green-600";
    const linkClasses = (hoverStyle) => `${baseLinkStyles} ${hoverStyle}`;

    const authButton = userData ? (
      <button onClick={() => logoutFromAccount(LOGOUT_URL, setUserData, navigate)} className={`${baseLinkStyles} text-red-500`}>
        Logout
      </button>
    ) : (
      <button className={`${baseLinkStyles} text-red-500`} onClick={handleLogin}>
        Login
      </button>
    );

    if (userData?.profileType === "recruiter") {
      return (
        <>
          <Link to="/profile" className={linkClasses(hoverRecruiter)}>
            Profile
          </Link>
          {authButton}
        </>
      );
    } else {
      return (
        <>
          <Link to="/jobs" className={linkClasses(hoverOther)}>
            Jobs
          </Link>
          <Link to="/browse" className={linkClasses(hoverOther)}>
            Browse
          </Link>
          <Link to="/profile" className={linkClasses(hoverRecruiter)}>
            Profile
          </Link>
          {authButton}
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-100 px-4 py-3 shadow-md">
      <div className="w-[85%] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">
          Job<span className="text-orange-600">Finder</span>
        </h1>

        <div className="hidden lg:flex space-x-6">{renderLinks()}</div>

        <button
          className="lg:hidden p-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={handleMenu}
          aria-label={displayNavItems ? "Close menu" : "Open menu"}
          aria-controls="nav-items"
        >
          {displayNavItems ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
        </button>
      </div>

      {displayNavItems && (
        <div className="lg:hidden w-full p-4 mt-2 bg-gradient-to-b from-gray-100 to-gray-300 rounded-md">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;