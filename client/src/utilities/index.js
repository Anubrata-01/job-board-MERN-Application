


export const handleSignup = async (
    SIGNUP_URL,
    signupData,
    navigate,
    setUserData
    
  ) => {
    if (signupData.password !== signupData.confirmPassword) {
      return alert("Passwords do not match!");
    }
  
    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Signup successful", data);
        setUserData(data.user)
        // setUserInfo(data); // Store user info
        if(data?.user?.profileType==="recruiter"){
          navigate("/recruiter")
        }
        else if(data?.user?.profileType==="student"){
          navigate("/home");
        }
        else{
          alert("Please select profileType")
        }
        
      } else if (response.status === 401) {
        // If token expires, attempt to refresh it
        // await refreshAccessToken(navigate, setUserInfo);
      } else {
        console.error("Signup failed", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
//   export const SignInFunction=async(signInData,SIGNIN_URL,navigate,setUserData)=>{
//     if(signInData){
//         try{
//             const response = await fetch(SIGNIN_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(signInData),
//                 credentials: "include",
//               });
//             const data=await response.json();
//             if(response.ok){
//                 console.log("signin successfull",data)
//                 setUserData(data.user)
//                 if(data?.user?.profileType==="recruiter"){
//                   navigate("/recruiter")
//                 }
//                 else if(data?.user?.profileType==="student"){
//                   navigate("/home");
//                 }
//                 else{
//                   alert("Please select profileType")
//                 }

//             }
//             else{
//                 console.error("Login failed", data);
//             }
//         }catch(err){
//             console.error("Error during login:", err);
//         }
//     }else{
//         alert("Please fill the form")
//     }
// }


export const SignInFunction = async (signInData, SIGNIN_URL, navigate, setUserData) => {
  if (signInData) {
    try {
      const response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Signin successful", data);
        setUserData(data.user);
        // localStorage.setItem("userData", JSON.stringify(data)); // Save to localStorage
        if (data?.user?.profileType === "recruiter") {
          navigate("/recruiter");
        } else if (data?.user?.profileType === "student") {
          navigate("/home");
        } else {
          alert("Please select profileType");
        }
      } else {
        console.error("Login failed", data);
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  } else {
    alert("Please fill the form");
  }
};


export const getUserInfo = async (INFO_URL, setUserData) => {
  try {
    const response = await fetch(INFO_URL, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok && data?.user) {
      setUserData(data.user);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching user info:", error.message);
  }
};




export const logoutFromAccount = async (LOGOUT_URL, setUserData, navigate) => {
  try {
    const response = await fetch(LOGOUT_URL, {
      method: "POST",
      credentials: "include", // Ensure cookies are sent with the request
    });
    if (response.status === 200) {
      setUserData(null); // Clear user data from state
      // localStorage.removeItem("userData");
      navigate("/"); // Redirect to the home page
    } else {
      console.error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};


// jobpost function

export const postJob = async (JOBPOST_URL, formData,setFormData,initialFormData) => {
  if (!formData) {
    console.error("Please provide valid form data.");
    return;
  }

  try {
    const response = await fetch(JOBPOST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Job posted successfully:", data);
      setFormData(initialFormData)
      return data;
    } else {
      console.error("Error posting job:", data.message || "Unknown error.");
    }
  } catch (err) {
    console.error("Error in posting job:", err);
  }
};

export const getAppliedJobs = async (APPLIED_JOBS_URL, userData) => {
  if (!userData || !userData.email) {
    console.error("Please provide valid user data with an email.");
    return;
  }

  try {
    const queryParams = new URLSearchParams({ email: userData.email }).toString();
    const response = await fetch(`${APPLIED_JOBS_URL}?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Assuming `data.jobs` contains the applied jobs array.
    } else {
      console.error("Failed to fetch applied jobs:", data.message);
    }
  } catch (err) {
    console.error("Error in fetching applied jobs:", err);
  }
};


export const getPostedJobsByRecruiter = async (POSTED_JOBS_URL, userData) => {
  if (!userData || !userData.username) {
    console.error("Please provide valid user data with a username.");
    return;
  }

  try {
    const queryParams = new URLSearchParams({ username: userData.username }).toString();
    const response = await fetch(`${POSTED_JOBS_URL}?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
     return data // Assuming `data.jobs` contains the applied jobs array.
    } else {
      console.error("Failed to fetch applied jobs:", data.message);
    }
  } catch (err) {
    console.error("Error in fetching applied jobs:", err);
  }
};


export const updateApplicationStatusClient = async (applicationId, newStatus, API_URL) => {
  console.log("Sending request to:", API_URL);
  console.log("Payload:", { applicationId, newStatus });

  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ applicationId, status: newStatus }),
      credentials: "include",

    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to update status: ${response.statusText}`);
    }

    const updatedApplication = await response.json();
    console.log("Updated application:", updatedApplication);
    return updatedApplication;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};
