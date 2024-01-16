
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const PTSSchema = new mongoose.Schema({
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

export default mongoose?.models?.PTS || mongoose.model("PTS", PTSSchema)