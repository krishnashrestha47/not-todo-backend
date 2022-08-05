import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

const PORT = 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

//data base setup
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "You have reached not to do api",
  });
});

app.use((error, req, res, next) => {
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running at http://localhost:${PORT}`);
});
