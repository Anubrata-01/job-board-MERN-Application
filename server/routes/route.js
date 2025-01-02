import {Router} from "express"
import { applicantsForPerJobs, appliedJobs, getAllJobs, getJobDetails, getUserInfo, jobPost, logout, postedJobsByRecruiter, SignIn, SignUp, submitApplication, updateApplicationStatusServer } from "../Controllers/AuthController.js";
import authenticate from "../Middleware/index.js";
const router=Router();
router.post("/signup",SignUp);
router.post("/signin",SignIn);
router.get("/userinfo",authenticate,getUserInfo);
router.post("/logout",authenticate,logout);
router.post("/postjob",authenticate,jobPost);
router.get("/getjobs",getAllJobs)
router.get("/jobs/:jobId", getJobDetails);
router.post("/aply/:jobId",authenticate,submitApplication);
router.get("/applied-jobs",authenticate,appliedJobs);
router.get("/posted-jobs",authenticate,postedJobsByRecruiter)
router.get("/numberofapplicantperjobs",applicantsForPerJobs)
router.put("/application-status", authenticate, updateApplicationStatusServer);



export default router;