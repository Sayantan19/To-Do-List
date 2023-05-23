import React, { useState } from 'react';
import axios from 'axios';

let count = 0;
let taskno = 0;

const UpdateTaskModal = ({ taskIdentifier, showModal, setShowModal, activetasklist }) => {
    // const [taskno, setTaskNo] = useState(0);
    // if (count === 0)
    //     setTaskNo(taskIdentifier)
    //     count++;
    const [updatedTask, setUpdatedTask] = useState({
        task_name: '',
        task_details: '',
        active: true
    });

    const handleClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(taskno)
        e.preventDefault();
        try {
            await axios.post('/tasks/updatetask', { task_no: taskIdentifier, ...updatedTask });
            console.log('Task updated');
            setShowModal(false);
            activetasklist();
        } catch (error) {
            console.log('Error:', error);
        }
    };
    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Task</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="taskName">Task Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="taskName"
                                    name="task_name"
                                    value={updatedTask.task_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDetails">Task Details</label>
                                <textarea
                                    className="form-control"
                                    id="taskDetails"
                                    name="task_details"
                                    value={updatedTask.task_details}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-outline-light">
                                Update Task
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskModal;
