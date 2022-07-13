import express from "express";
const router = express.Router();

let fakeDb = [
  { _id: 1, task: "watching TV", hr: 40 },
  { _id: 2, task: "shoping TV", hr: 30 },
  { _id: 3, task: "clining TV", hr: 20 },
  { _id: 4, task: "studying TV", hr: 20 },
  { _id: 5, task: "eating TV", hr: 20 },
];

router.get("/:_id?", (req, res, next) => {
  try {
    //query the database and get all the task
    const { _id } = req.params;
    let data = fakeDb;

    if (_id) {
      data = fakeDb.filter((itme) => itme._id === +_id);
    }

    res.json({
      status: "success", // either success or error
      messsage: "return from get method",
      data,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    console.log(req.body);

    // call db query to store data in the db
    fakeDb.push(req.body);

    res.json({
      status: "success", // either success or error
      messsage: "return from post method",
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
    const { _id } = req.body;
    console.log(_id);
    //db query to delete data
    const filteredArg = fakeDb.filter((itme) => itme._id !== +_id);
    fakeDb = filteredArg;
    res.json({
      status: "success", // either success or error
      messsage: "return from delete method",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
