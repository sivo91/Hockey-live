
import mongoose from 'mongoose';

const updateTimeSchema = new mongoose.Schema({
  lastUpdated: {
    type: Date,
    default: Date.now,  
    required: true
  }
});

const UpdateTime = mongoose.model('UpdateTime', updateTimeSchema);
export default UpdateTime;
