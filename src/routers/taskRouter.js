import express from "express";
import {
  getSingleTask,
  getTasks,
  insertTask,
} from "../models/task/TaskModel.js";
const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    //query the database and get all the tasks
    const { _id } = req.params;
    const result = _id ? await getSingleTask(_id) : await getTasks();

    res.json({
      status: "success", // either success or error
      messsage: "return from get method",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    // call db query to store data in the db
    const result = await insertTask(req.body);
    console.log(result);

    res.json({
      status: "success", // either success or error
      messsage: "todo",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/", (req, res, next) => {
  try {
    res.json({
      status: "success", // either success or error
      messsage: "return from patch method",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  try {
    res.json({
      status: "success", // either success or error
      messsage: "return from delete method",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
