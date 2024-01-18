


import mongoose from "mongoose";

export default function connectDB() {
  try {
    mongoose.connect(process.env.mongodb);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connection Successfull");
    });

    connection.on("error", (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}



/* 
import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.mongodb);
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}
 */