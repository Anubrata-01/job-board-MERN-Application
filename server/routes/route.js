import {Router} from "express"
import { getAllJobs, getUserInfo, jobPost, logout, SignIn, SignUp } from "../Controllers/AuthController.js";
import authenticate from "../Middleware/index.js";
const router=Router();
router.post("/signup",SignUp);
router.post("/signin",SignIn);
router.get("/userinfo",authenticate,getUserInfo);
router.post("/logout",authenticate,logout);
router.post("/postjob",authenticate,jobPost);
router.get("/getjobs",authenticate,getAllJobs)


export default router;