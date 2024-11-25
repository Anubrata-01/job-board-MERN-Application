// const express = require('express');
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/route.js";
import connectToDB from "./database/db.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN
      : process.env.LOCAL_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
app.use("/api/auth",router)
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  connectToDB()
  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//   const {filename}=import.meta
// console.log(filename)