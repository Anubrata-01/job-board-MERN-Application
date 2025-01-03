// const express = require('express');
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/route.js";
import connectToDB from "./database/db.js";
import cookieParser from 'cookie-parser';
import path from "path"

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log(__dirname)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// const corsOptions = {
//   origin: (origin, callback) => {
//       const allowedOrigins = process.env.NODE_ENV === 'production'
//           ? [process.env.CORS_ORIGIN]
//           : [process.env.LOCAL_ORIGIN, undefined]; // undefined for same-origin in dev

//       if (allowedOrigins.includes(origin)) {
//           callback(null, true);
//       } else {
//           callback(new Error('Not allowed by CORS'));
//       }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//   credentials: true,
// };
// app.use(cors({
//     origin: process.env.NODE_ENV === 'production'
//       ? process.env.CORS_ORIGIN
//       : process.env.LOCAL_ORIGIN,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   }))

const corsOptions = {
  origin: (origin, callback) => {
      const allowedOrigins = process.env.NODE_ENV === 'production'
          ? [process.env.CORS_ORIGIN] // Single allowed origin in production
          : [process.env.LOCAL_ORIGIN, 'null']; // Include 'null' for file-based or same-origin requests

      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          console.error(`Blocked by CORS: ${origin}`);
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Ensure headers include what you need
  exposedHeaders: ['Authorization'], // Expose headers if required
  credentials: true, // Allows cookies to be sent
};

app.use(cors(corsOptions))
app.use("/api/auth",router)
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  connectToDB()
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//   const {filename}=import.meta
// console.log(filename)