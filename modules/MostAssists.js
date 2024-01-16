

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const AssistsSchema = new mongoose.Schema({
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

export default mongoose?.models?.Assists || mongoose.model("Assists", AssistsSchema)