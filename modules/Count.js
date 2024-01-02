import mongoose from "mongoose";

const totalCounts = new mongoose.Schema({

    totalDonations: {
        type: Number,
        required: true
    },
    totalTransactions: {
        type: Number,
        required: true
    }

}, {timestamps: true})

export default mongoose?.models?.Counts || mongoose.model("Counts", totalCounts);