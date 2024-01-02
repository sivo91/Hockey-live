
import mongoose from "mongoose";

const NewEventSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    amountNeeded: {
        type: Number,
        required: true
    },
    amountDonated: {
        type: Number,
        required: true
    },
    animalType: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    urgent: {
        type : Boolean,
        required: true
    }
   

}, {timestamps: true})

export default mongoose?.models?.NewEvent || mongoose.model("NewEvent", NewEventSchema);
