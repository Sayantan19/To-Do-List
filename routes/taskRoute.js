const express = require('express');
const { addTask, completeTask, updateTask, viewActiveTask, viewInactiveTask } = require('../controller/taskController');
const router = express.Router();

router.post("/addtask", addTask);
router.get("/viewactivetask", viewActiveTask);
router.get("/viewinactivetask", viewInactiveTask);
router.post("/completetask", completeTask);
router.post("/updatetask", updateTask);

module.exports = router;
