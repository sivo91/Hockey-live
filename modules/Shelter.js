
import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema({
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
    stripeID: {
        type: String
    },
    shelterName: {
        type: String,
        required: true
    },
    shelterCity: {
        type: String,
        required: true
    },
    shelterState: {
        type: String,
        required: true
    },
    shelterDonation: {
        type: Number,
        required: true
    }

    

}, {timestamps: true})

export default mongoose?.models?.Shelter || mongoose.model("Shelter", ShelterSchema)