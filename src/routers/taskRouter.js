import express from "express";
import {
  deleteManyTasks,
  deleteTaskById,
  getSingleTask,
  getTasks,
  insertTask,
  updateTask,
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

    result?._id
      ? res.json({
          status: "success", // either success or error
          messsage: "The new task has been added",
          result,
        })
      : res.json({
          status: "error", // either success or error
          messsage: "Error, unable to add new task !",
          result,
        });
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { _id, type } = req.body;

    const result = await updateTask(_id, type);
    console.log(result);

    res.json({
      status: "success", // either success or error
      messsage: "return from patch method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:_id", async (req, res, next) => {
router.delete("/", async (req, res, next) => {
  try {
    // const { _id } = req.params;
    const { ids } = req.body;
    // const result = await deleteTaskById(_id);
    const result = await deleteManyTasks(ids);
    console.log(result);

    res.json({
      status: "success", // either success or error
      messsage: "The selected tasks has been deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
