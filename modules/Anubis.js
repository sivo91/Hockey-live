import mongoose from "mongoose";

const donationForAnubis = new mongoose.Schema({

    totalDonations: {
        type: Number,
        required: true
    },
    totalTransactions: {
        type: Number,
        required: true
    }

}, {timestamps: true})

export default mongoose?.models?.Anubis || mongoose.model("Anubis", donationForAnubis);