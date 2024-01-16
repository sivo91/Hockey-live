
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const GoalsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    gp: {
        type: String,
    },
    assists: {
       type: String,
    },
    goals: {
       type: String,
    },
    pts: {
       type: String,
    },
    pim: {
       type: String,
    },
}, {timestamps: true})

export default mongoose?.models?.Goals || mongoose.model("Goals", GoalsSchema)