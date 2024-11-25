import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfPositions: {
      type: Number,
      required: true,
      min: 1,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Intern", "Contract"],
    },
    salary: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[0-9]+[kK|lL]?$/.test(value),
        message: "Salary must be a valid number, e.g., 25L or 500K.",
      },
    },
    jobId: {
      type: Number,
      unique: true,
      required: true,
    },
    
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps automatically
  }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
