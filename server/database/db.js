import mongoose from "mongoose";
const connectToDB = async () => {
    const connectionUrl = "mongodb+srv://anubratachanda:Anubrata3604@cluster0.bgzku.mongodb.net/jobCollections?retryWrites=true&w=majority&appName=Cluster0"

  try {
    await mongoose.connect(connectionUrl);
    console.log("jobCollections Database connection is successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectToDB;
