import mongoose from "mongoose";
const userschema= new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    username: {
        type: String,
        required: [true,"Username is required"]
        
    },
    profileType:{
        type:String,
        required:[true,"Type is required"]
    },
    
})
const User= mongoose.model("users", userschema )
export default User;