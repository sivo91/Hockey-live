
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

     name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventName: {
        type: String, 
    },
    donation: {
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    payment_id: {
      type: String,
      required: true
    }
    

}, {timestamps: true})

export default mongoose?.models?.Order || mongoose.model("Order", OrderSchema);