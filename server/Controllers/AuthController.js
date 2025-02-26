import User from "../models/userSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JobPost from "../models/jobSchema.js";
import Application from "../models/applicationSchema.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create access token
const createAccessToken = (email, userId) => {
    try {
        return jwt.sign(
            { email, userId },
            process.env.JWT_KEY,
            { expiresIn: '2d' }
        );
    } catch (error) {
        console.error('Error creating access token:', error);
        throw new Error('Token creation failed');
    }
};

// Create refresh token
const createRefreshAccessToken = (email, userId) => {
    try {
        return jwt.sign(
            { email, userId },
            process.env.REFRESH_JWT_KEY,
            { expiresIn: "7d" }
        );
    } catch (error) {
        console.error('Error creating refresh token:', error);
        throw new Error('Token creation failed');
    }
};

// Signup function
export const SignUp = async (req, res, next) => {
    try {
        const { username, email, password,profileType } = req.body;
        if (!username || !email || !password || !profileType) {
            return res.status(400).send("Username, email, and password. profileType are required!");
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                message: "Email address is already present!"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, password: hashedPassword, username,profileType });
        await newUser.save();
        console.log("Original password:", password);
        console.log("Hashed password:", hashedPassword);

        // Create tokens
        const accessToken = createAccessToken(newUser.email, newUser._id);
        const refreshAccessToken = createRefreshAccessToken(newUser.email, newUser._id);
        const domain =
        process.env.NODE_ENV === 'production'
          ? new URL(process.env.CORS_ORIGIN).hostname // Extract hostname from URL
          : 'localhost';
        // Set tokens as cookies
        res.cookie('jwt_access_token', accessToken, {
          httpOnly: true, // Important for security
          secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
          sameSite:  'None' ,
          domain: `.${domain}`,
          maxAge: 2 * 24 * 60 * 60 * 1000,
          path:'/'

      });
      res.cookie('jwt_refresh_token', refreshAccessToken, {
          httpOnly: true, // Important for security
          secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
          // sameSite: 'Strict', // Recommended for security
          sameSite:'None',
          domain: `.${domain}`,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path:'/'
      });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                profileType:profileType
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to sign up.",error:error });
    }
};

// Signin function
export const SignIn = async (req, res, next) => {
  try {
    const { email, password, profileType } = req.body;

    // Input Validation (Important!)
    if (!email || !password || !profileType) {
      return res.status(400).json({ message: "Email, password, and profileType are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Profile Type Check
    if (user.profileType !== profileType) {
      return res.status(403).json({ message: "Profile type mismatch! Please choose the correct profile type." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Create tokens (Assuming these functions are defined elsewhere)
    const accessToken = createAccessToken(user.email, user._id);
    const refreshAccessToken = createRefreshAccessToken(user.email, user._id);

    // Set the domain for cookies based on environment
    const domain = process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : 'localhost';

    // Set tokens as cookies with secure options for production
    res.cookie('jwt_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: `.${new URL(domain).hostname}`, // Extract hostname and prepend dot for subdomains
      path: '/',
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.cookie('jwt_refresh_token', refreshAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: `.${new URL(domain).hostname}`, // Extract hostname and prepend dot for subdomains
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user: {
        username: user.username,
        email: user.email,
        profileType: user.profileType,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error); // Log the full error object
    if (error.name === 'ValidationError') { // Example Mongoose validation error
      return res.status(400).json({ message: "Validation Error", details: error.errors });
    }
    if(error.name === 'CastError'){
      return res.status(400).json({message:"Invalid input"})
    }
    return res.status(500).json({ message: "Failed to sign in.", error: error.message }); // Send error message to client
  }
};
export const getUserInfo = async (req, res) => {
    try {
        const user = req.user; 

        if (!user) {
            return res.status(404).send("User not found!");
        }
        
        return res.status(200).json({
            message: "User information retrieved successfully",
            user: { _id: user._id, email: user.email,username:user.username,profileType:user.profileType }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

// export const logout = async (req, res, next) => {
//     try {
//       res.clearCookie('jwt_access_token', { path: '/', secure: true, sameSite: 'None' });
//       res.clearCookie('jwt_refresh_token', { path: '/', secure: true, sameSite: 'None' });
//       return res.status(200).send("Logout successful");
//     } catch (error) {
//       console.error({ error });
//       return res.status(500).send("Internal server error");
//     }
//   };

export const logout = async (req, res, next) => {
  try {
      const cookieOptions = {
          path: '/',
          secure: process.env.NODE_ENV === 'production', // Secure only in production
          sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Lax in dev, None in prod
      };

      // Clear cookies
      res.clearCookie('jwt_access_token', cookieOptions);
      res.clearCookie('jwt_refresh_token', cookieOptions);

      return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};




  export const jobPost = async (req, res, next) => {
    try {
      const { companyName, region, role, description, numberOfPositions, jobType, salary, jobId,PostedBy } = req.body;
  
      if (!companyName || !region || !role || !description || !numberOfPositions || !jobType || !salary || !jobId ||!PostedBy) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Simulate saving the job post to the database
      const jobPostData = {
        companyName,
        region,
        role,
        description,
        numberOfPositions,
        jobType,
        salary,
        jobId,
        PostedBy
      };
  
      console.log("Job Posted:", jobPostData);
      const existingJob=await JobPost.findOne({jobId});
      if(existingJob){
        return res.status(409).send({
            message:"job is already Present!"
        })
      }
      const newJob = await JobPost.create({ companyName,region,role,description,numberOfPositions,jobType,salary,jobId,PostedBy });
      await newJob.save();
      // Respond with success
      res.status(201).json({ message: "Job posted successfully.", job: newJob });
    } catch (err) {
      console.error("Error posting job:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  

  export const getAllJobs = async (req, res, next) => {
    try {
    
      const jobs = await JobPost.find();

      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: "No job postings found." });
      }
  
      // Respond with the list of jobs
      res.status(200).json({ message: "Jobs retrieved successfully.", jobs });
    } catch (err) {
      console.error("Error retrieving jobs:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  


  export const getJobDetails = async (req, res, next) => {
    const { jobId } = req.params;
    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format. It must be a number." });
    }
  
    try {
      const job = await JobPost.findOne({ jobId: Number(jobId) });
  
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }
  
      res.status(200).json({ message: "Job details retrieved successfully.", job });
    } catch (err) {
      console.error("Error retrieving job details:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "./uploads/resumes";
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /pdf|doc|docx/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      if (extName) {
        return cb(null, true);
      } else {
        cb(new Error("Only .pdf, .doc, or .docx files are allowed!"));
      }
    },
  }).single("resume"); 
  

  export const submitApplication = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err.message);
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const { jobId } = req.params;
        const { name, email } = req.body;
  
        // Validate job existence
        const job = await JobPost.findOne({ jobId: Number(jobId) });
        if (!job) {
          return res.status(404).json({ message: "Job not found." });
        }
  
        // Check if the resume was uploaded
        const resumePath = req.file?.path;
        console.log(resumePath)
        if (!resumePath) {
          return res.status(400).json({ message: "Resume file is required." });
        }
  
        // Create new application
        const application = new Application({
          jobId,
          name,
          email,
          resume: resumePath,
        });
  
        await application.save();
  
        res.status(201).json({
          message: "Application submitted successfully!",
          application,
        });
      } catch (error) {
        console.error("Error submitting application:", error.message);
        res.status(500).json({ message: "Failed to submit application." });
      }
    });
  };




  export const appliedJobs = async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required to fetch applied jobs." });
    }
  
    try {
      // Fetch applications by the user's email
      const appliedJobs = await Application.find({ email: String(email) });
      const jobIds = appliedJobs.map((job) => Number(job.jobId)).filter((id) => !isNaN(id));
  
      if (jobIds.length === 0) {
        return res.status(404).json({ message: "No jobs found for the applied jobs." });
      }
      const extractJobs = await JobPost.find({ jobId: { $in: jobIds } });
  
      res.status(200).json({ jobs: extractJobs });
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
      res.status(500).json({ message: "Server error while fetching applied jobs." });
    }
  };
  
  export const applicantsForPerJobs = async (req, res) => {
    try {
        const jobs = await JobPost.find();
        const applications = await Application.find();

        const jobApplicantCounts = jobs.map(job => {
            const applicants = applications.filter(application => application.jobId === job.jobId);
            return {
              job:job,
              applicantCount: applicants.length,
              jobTitle: job.title, // Uncomment this line to include job title
            };
        });

        res.status(200).json(jobApplicantCounts);
    } catch (err) {
        console.error(err); // Use console.error for errors
        res.status(500).json({ message: "Error fetching applicant counts" }); // Send an error response
    }
};

  export const postedJobsByRecruiter = async (req, res) => {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required to fetch posted jobs." });
    }
  
    try {
      const postedJobs = await JobPost.find({ PostedBy: String(username) });

      const jobsId = postedJobs
      .map((job) => Number(job?.jobId))
      .filter((id) => !isNaN(id));
      if (jobsId.length === 0) {
        return res.status(404).json({ message: "No jobs found for the applicants." });
      }
      const applicantForJobs = await Application.find({ jobId: { $in: jobsId} });
      // console.log("Extracted Jobs:", applicantForJobs);

    res.status(200).json({ jobs: postedJobs, applications: applicantForJobs });
    } catch (err) {
      console.error("Error fetching posted jobs:", err);
      res.status(500).json({ message: "Server error while fetching posted jobs." });
    }
  };
  
  
  export const updateApplicationStatusServer = async (req, res) => {
    try {
      const { applicationId, status } = req.body;
  
      if (!applicationId || !status) {
        return res.status(400).json({ message: "Application ID and status are required." });
      }
  
      const application = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
      );
  
      if (!application) {
        return res.status(404).json({ message: "Application not found." });
      }
  
      const job = await JobPost.findOne({ jobId: application.jobId });
  
      if (!job) {
        return res.status(404).json({ message: "Associated job not found." });
      }
  
      const jobWithStatus = {
        ...job.toObject(),
        applicationStatus: application.status,
      };
  
      res.status(200).json({
        message: "Application status updated successfully.",
        application,
        job: jobWithStatus,
      });
      
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  