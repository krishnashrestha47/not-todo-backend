import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const MONGO_CLIENT = "mongodb://localhost/task_list";
    const connection = mongoose.connect(MONGO_CLIENT);
    connection && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
