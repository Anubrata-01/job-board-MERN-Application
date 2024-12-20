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
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//   const {filename}=import.meta
// console.log(filename)