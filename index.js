const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const { addTask } = require('./controller/taskController');
const taskRoute = require('./routes/taskRoute')
const db = process.env.MONGODB_URI;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use('/tasks', taskRoute);
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server running on port", port));
