/* eslint-disable no-unused-vars */

import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutFromAccount } from "../utilities";
import { useAtom } from "jotai";
import { userDataAtom } from "../store/store";
import { LOGOUT_URL } from "../constant";

const Navbar = () => {
  const [displayNavItems, setDisplayNavItems] = useState(false);
  const [userData, setUserData] = useAtom(userDataAtom);
  const navigate = useNavigate();

  const handleMenu = () => {
    setDisplayNavItems((prev) => !prev);
  };

  const renderLinks = (isSmallScreen = false) => {
    const baseLinkStyles = `p-2 block font-medium transition-colors duration-300`;
    const hoverRecruiter = `hover:text-blue-600`;
    const hoverOther = `hover:text-green-600`;

    return userData?.profileType === "recruiter" ? (
      <>
        <Link
          to="/home/profile"
          className={`${baseLinkStyles} text-gray-700 ${hoverRecruiter}`}
        >
          Profile
        </Link>
        <button
          onClick={() => logoutFromAccount(LOGOUT_URL, setUserData, navigate)}
          className={`${baseLinkStyles} text-red-500`}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          to="/home/jobs"
          className={`${baseLinkStyles} text-orange-500 ${hoverOther}`}
        >
          Jobs
        </Link>
        <Link
          to="/home/browse"
          className={`${baseLinkStyles} text-purple-500 ${hoverOther}`}
        >
          Browse
        </Link>
        <Link
          to="/home/profile"
          className={`${baseLinkStyles} text-gray-700 ${hoverRecruiter}`}
        >
          Profile
        </Link>
        <button
          onClick={() => logoutFromAccount(LOGOUT_URL, setUserData, navigate)}
          className={`${baseLinkStyles} text-red-500`}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="bg-gray-100 px-4 py-3 shadow-md">
      <div className="w-[85%] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">
          Job<span className="text-orange-600">Finder</span>
        </h1>

        {/* Navigation Links for Large Screens */}
        <div className="hidden lg:flex space-x-6">{renderLinks()}</div>

        {/* Menu Button for Small Screens */}
        <button
          className="lg:hidden p-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={handleMenu}
          aria-label={displayNavItems ? "Close menu" : "Open menu"}
          aria-controls="nav-items"
        >
          {!displayNavItems ? (
            <AlignJustify className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation Links for Small Screens */}
      {displayNavItems && (
        <div
          id="nav-items"
          className="lg:hidden w-full p-4 mt-2 bg-gradient-to-b from-gray-100 to-gray-300 rounded-md"
        >
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
