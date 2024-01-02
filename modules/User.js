import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
   participant: {
        type: String,
        required: true
    },
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
    wishlist: [{
        type: ObjectId,
        ref: "NewEvent"
    }],
    

}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)