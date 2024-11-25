// import  { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle the menu for small screens
//   const handleMenuToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-100 px-4 py-3 shadow-md">
//       <div className="flex justify-between items-center">
//         {/* Logo / Application Name */}
//         <h1 className="text-2xl font-bold text-blue-700">JobFinder</h1>

//         {/* Hamburger Menu for Small Devices */}
//         <button
//           onClick={handleMenuToggle}
//           className="text-gray-700 lg:hidden"
//           aria-label="Toggle Menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             ></path>
//           </svg>
//         </button>

//         {/* Navigation Links for Medium and Large Screens */}
//         <div className={`lg:flex gap-6 items-center ${isOpen ? 'block' : 'hidden'} md:flex`}>
//           <Link to="/" className="text-gray-700 hover:text-blue-600 block md:inline-block my-2 md:my-0">Home</Link>
//           <Link to="/jobs" className="text-gray-700 hover:text-blue-600 block md:inline-block my-2 md:my-0">Jobs</Link>
//           <Link to="/browse" className="text-gray-700 hover:text-blue-600 block md:inline-block my-2 md:my-0">Browse</Link>
//           <Link to="/profile" className="text-gray-700 hover:text-blue-600 flex items-center gap-2 block md:inline-block my-2 md:my-0">
//             Profile
//             <img src="/profile-image.jpg" alt="Profile" className="w-8 h-8 rounded-full"/>
//           </Link>
//         </div>
//       </div>

//       {/* Dropdown for Small Devices */}
//       {isOpen && (
//         <div className="flex flex-col lg:hidden mt-4 space-y-2">
//           <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">Jobs</Link>
//           <Link to="/browse" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">Browse</Link>
//           <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
//             Profile
//             <img src="/profile-image.jpg" alt="Profile" className="w-8 h-8 rounded-full"/>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import { AlignJustify, X } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutFromAccount } from "../utilities";
// import { useAtom } from "jotai";
// import { userDataAtom } from "../store/store";
// import { LOGOUT_URL } from "../constant";

// const Navbar = () => {
//   const [displayNavItems, setDisplayNavItems] = useState(false);
//   const [userData, setUserData] = useAtom(userDataAtom);
//   const navigate = useNavigate();
//   const handleMenu = () => {
//     setDisplayNavItems((prev) => !prev);
//   };
//   console.log(userData);
//   return (
//     <nav className="bg-gray-100 px-4 py-3 shadow-md">
//       <div className="w-[85%] mx-auto flex justify-between gap-12 items-center my-2">
//         <h1 className="text-2xl font-bold text-blue-700">
//           Job<span className=" text-orange-600">Finder</span>
//         </h1>

//         {/* Navigation Links for Large Screens */}
//         <div className="hidden lg:flex justify-center items-center space-x-6">
//           {userData?.profileType === "recruiter" ? (
//             <>
//               <Link
//                 to="/home/profile"
//                 className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
//               >
//                 Profile
//               </Link>
//               <Link
//                 className="p-2 block text-red-500"
//                 onClick={() =>
//                   logoutFromAccount(LOGOUT_URL, setUserData, navigate)
//                 }
//               >
//                 Logout
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/home/jobs"
//                 className="text-orange-600 hover:text-gray-600"
//                 aria-label="Jobs"
//               >
//                 Jobs
//               </Link>
//               <Link
//                 to="/home/browse"
//                 className="text-orange-600 hover:text-gray-600"
//                 aria-label="Browse"
//               >
//                 Browse
//               </Link>
//               <Link
//                 to="/home/profile"
//                 className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
//               >
//                 Profile
//               </Link>
//               <Link
//                 className="p-2 block text-red-500"
//                 onClick={() =>
//                   logoutFromAccount(LOGOUT_URL, setUserData, navigate)
//                 }
//               >
//                 Logout
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Menu Button for Small Screens */}
//         <button
//           className="lg:hidden p-2 bg-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
//           onClick={handleMenu}
//           aria-label={displayNavItems ? "Close menu" : "Open menu"}
//           aria-controls="nav-items"
//         >
//           {!displayNavItems ? (
//             <AlignJustify className="w-4 h-4 md:w-4 md:h-4" />
//           ) : (
//             <X className="w-4 h-4 md:w-4 md:h-4" />
//           )}
//         </button>
//       </div>

//       {/* Navigation Links for Small Screens */}
//       {displayNavItems && (
//         <div
//           id="nav-items"
//           className="lg:hidden w-full p-2 mt-2 bg-gradient-to-b from-gray-100 to-gray-300"
//         >
//           {/* <Link
//             to="/home/jobs"
//             className="block p-2 text-orange-600"
//             aria-label="Jobs"
//           >
//             Jobs
//           </Link>
//           <Link
//             to="/home/browse"
//             className="block p-2 text-orange-600"
//             aria-label="Browse"
//           >
//             Browse
//           </Link>
//           <Link
//             to="/home/profile"
//             className="block p-2 text-orange-600"
//             aria-label="Profile"
//           >
//             Profile
//           </Link>
//           <Link
//             className="p-2 text-red-500"
//             onClick={() => logoutFromAccount(LOGOUT_URL, setUserData, navigate)}
//           >
//             Logout
//           </Link> */}


// {userData?.profileType === "recruiter" ? (
//             <>
//               <Link
//                 to="/home/profile"
//                 className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
//               >
//                 Profile
//               </Link>
//               <Link
//                 className="p-2  text-red-500 flex items-center gap-2"
//                 onClick={() =>
//                   logoutFromAccount(LOGOUT_URL, setUserData, navigate)
//                 }
//               >
//                 Logout
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/home/jobs"
//                 className="text-orange-600 hover:text-gray-600"
//                 aria-label="Jobs"
//               >
//                 Jobs
//               </Link>
//               <Link
//                 to="/home/browse"
//                 className="text-orange-600 hover:text-gray-600"
//                 aria-label="Browse"
//               >
//                 Browse
//               </Link>
//               <Link
//                 to="/home/profile"
//                 className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
//               >
//                 Profile
//               </Link>
//               <Link
//                 className="p-2 block text-red-500"
//                 onClick={() =>
//                   logoutFromAccount(LOGOUT_URL, setUserData, navigate)
//                 }
//               >
//                 Logout
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



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
