

import connectDB from "@/utils/db";
import UpdateTime from "@/modules/UpdateTime";
import axios from "axios";

export default async function handler(req, res) {
  await connectDB();

  try {
    
    let updateTime = await UpdateTime.findOne();
    const currentTime = new Date().getTime();

    if (!updateTime) {
     
      updateTime = new UpdateTime({ lastUpdated: new Date() });
      await updateTime.save();
    }

    const lastUpdated = new Date(updateTime.lastUpdated).getTime();
   

    if (currentTime - lastUpdated > 86400000) {
      
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get('/api/Update/update', config);
  

 
      updateTime.lastUpdated = new Date();
      await updateTime.save();

      res.status(200).json({ message: "Data updated successfully", data: response.data });
    } else {
      console.log("Less than 24 hours since last update, no update needed.");
      res.status(200).json({ message: "No update needed" });
    }
  } catch (error) {
    console.error('Error in update check:', error);
    res.status(500).json({ message: "Error checking update", error: error.message });
  }
}
