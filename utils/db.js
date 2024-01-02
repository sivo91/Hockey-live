


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

