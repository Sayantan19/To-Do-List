import React, { useState } from 'react';
import axios from 'axios';

const AddTaskModal = ({ showModal, setShowModal }) => {
    const [newTask, setNewTask] = useState({
        task_name: '',
        task_details: '',
        doc: ''
    });

    const handleClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/tasks/addtask', newTask);
            console.log('New task added');
            setShowModal(false);
        } catch (error) {
            console.log('Error:', error);
        }
        window.location.href = '/';
    };

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Task</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="taskName" className="form-label">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="taskName"
                                    name="task_name"
                                    value={newTask.task_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDetails" className="form-label">
                                    Task Details
                                </label>
                                <textarea
                                    className="form-control"
                                    id="taskDetails"
                                    name="task_details"
                                    value={newTask.task_details}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDate" className="form-label">
                                    Date for Completion
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="taskDate"
                                    name="doc"
                                    value={newTask.doc}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-outline-dark">
                                Add Task
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
