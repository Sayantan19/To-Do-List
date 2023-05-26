const Task = require('../model/tasks');

const retrieveLatesttasknumber = async () => {
  try {
    const latestTask = await Task.findOne({}, 'task_no')
      .sort({ task_no: -1 })
      .lean()
      .exec();

    if (latestTask) {
      const latesttask_no = latestTask.task_no;
      return latesttask_no;
    } else {
      // No existing tasks found, start from task number 1 or any other logic you prefer
      return 0; // Return 0 if no tasks exist yet
    }
  } catch (error) {
    console.error('Error retrieving latest task number:', error);
    throw error;
  }
};

const addTask = async (req, res) => {
  console.log(req.body);
  const newTask = new Task({
    task_no: await retrieveLatesttasknumber() + 1,
    task_name: req.body.task_name,
    task_details: req.body.task_details,
    active: true,
    doc: req.body.doc
  })
  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => console.log(err));
}

const viewActiveTask = (req, res) => {
  Task.find({ active: true })
    .then(activeTasks => {
      console.log('Active tasks:', activeTasks);
      const activeData = JSON.stringify(activeTasks);
      res.send(activeTasks);
    })
    .catch(error => {
      console.log('Error retrieving active tasks:', error);
      res.send('Error retrieving active tasks');
    });
};

const viewInactiveTask = (req, res) => {
  Task.find({ active: false })
    .then(inactiveTasks => {
      console.log('Inactive tasks:', inactiveTasks);
      const inactiveData = JSON.stringify(inactiveTasks);
      res.send(inactiveTasks);
    })
    .catch(error => {
      console.log('Error retrieving inactive tasks:', error);
      res.send('Error retrieving inactive tasks');
    });
};

const completeTask = (req, res) => {
  const task_no = req.body.task_no;
  Task.findOneAndUpdate(
    { task_no: task_no },
    { $set: { active: false } },
    { new: true }
  )
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task deactivated successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while deactivating the task" });
    });

};

const updateTask = async (req, res) => {
  console.log(req.body.task_no)
  try {
    const taskId = req.body.task_no; // Assuming the task ID is passed as a parameter in the request URL

    // Fetch the existing task from the database
    const existingTask = await Task.findOne({ task_no: taskId });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task fields with the new values from the request body
    existingTask.task_name = req.body.task_name || existingTask.task_name;
    existingTask.task_details = req.body.task_details || existingTask.task_details;
    existingTask.active = req.body.active !== undefined ? req.body.active : existingTask.active;
    existingTask.doc = req.body.doc || existingTask.doc;

    // Save the updated task to the database
    const updatedTask = await existingTask.save();

    res.json(updatedTask); // Respond with the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
};



module.exports = { addTask, viewActiveTask, viewInactiveTask, completeTask, updateTask };