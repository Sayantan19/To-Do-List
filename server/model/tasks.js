const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    task_no: {type: Number, required: true},
    task_name: { type: String, required: true},
    task_details: { type: String, required: true},
    active: {type: Boolean, default: true},
    doc: {type: Date, default: '01-01-2000', required: true}
})

module.exports = mongoose.model('tasks', task);