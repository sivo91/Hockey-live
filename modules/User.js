import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
       type: Boolean,
       default: false
    },

    

}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)