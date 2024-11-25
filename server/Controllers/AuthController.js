import User from "../models/userSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JobPost from "../models/jobSchema.js";


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

        // Set tokens as cookies
        res.cookie("jwt_access_token", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 2*24 * 60* 60 * 1000, // 15 minutes
            
        });
        res.cookie("jwt_refresh_token", refreshAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).send({
            message: "User created successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                profileType:profileType
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

// Signin function
export const SignIn = async (req, res, next) => {
    try {
        const { email, password,profileType } = req.body;
        if (!email || !password || !profileType) {
            return res.status(400).send("Email and password, profileType are required!");
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                message: "Invalid email or password!"
            });
        }

        // profileType Check
        if (user.profileType !== profileType) {
            return res.status(403).send({
                message: "Profile type mismatch! Please choose the correct profile type."
            });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid email or password!"
            });
        }

        // Create tokens
        const accessToken = createAccessToken(user.email, user._id);
        const refreshAccessToken = createRefreshAccessToken(user.email, user._id);

        // Set tokens as cookies
        res.cookie("jwt_access_token", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 2 *24 *60 * 60 * 1000, // 15 minutes
        });
        res.cookie("jwt_refresh_token", refreshAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).send({
            message: "User signed in successfully",
            user: {
                username: user.username,
                email: user.email,
                profileType:profileType
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
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

export const logout = async (req, res, next) => {
    try {
      res.clearCookie('jwt_access_token', { path: '/', secure: true, sameSite: 'None' });
      res.clearCookie('jwt_refresh_token', { path: '/', secure: true, sameSite: 'None' });
      return res.status(200).send("Logout successful");
    } catch (error) {
      console.error({ error });
      return res.status(500).send("Internal server error");
    }
  };



  export const jobPost = async (req, res, next) => {
    try {
      const { companyName, region, role, description, numberOfPositions, jobType, salary, jobId } = req.body;
  
      if (!companyName || !region || !role || !description || !numberOfPositions || !jobType || !salary || !jobId) {
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
    
      };
  
      console.log("Job Posted:", jobPostData);
      const existingJob=await JobPost.findOne({jobId});
      if(existingJob){
        return res.status(409).send({
            message:"job is already Present!"
        })
      }
      const newJob = await JobPost.create({ companyName,region,role,description,numberOfPositions,jobType,salary,jobId });
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
      // Fetch all jobs from the database
      const jobs = await JobPost.find();
  
      // Check if there are any jobs
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
  