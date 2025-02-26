import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
 const authenticate = async (req, res, next) => {
    try {
      const token = req.cookies.jwt_access_token || req.cookies.jwt_refresh_token;
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }
  
      const isAccessToken = req.cookies.jwt_access_token;
      const secretKey = isAccessToken ? process.env.JWT_KEY : process.env.REFRESH_JWT_KEY;
  
      const decoded = jwt.verify(token, secretKey);
  
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
  
      const user = await User.findById(decoded.userId).select('-password');
  
      if (!user) {
        return res.status(401).json({ error: 'User not found.' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      console.error('Authentication error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 
  export default authenticate;

//   import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/resumes"); // Directory to store uploaded resumes
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /pdf|doc|docx/;
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     if (extName) {
//       return cb(null, true);
//     } else {
//       cb(new Error("Only .pdf, .doc, or .docx files are allowed!"));
//     }
//   },
// });


