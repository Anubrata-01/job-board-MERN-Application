import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      // ref: "Job", // Assuming you have a "Job" model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email validation regex
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    resume: {
      type: String, // Path to the uploaded resume file
      required: true,
    },
    status: { type: String, default: "Pending" },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
