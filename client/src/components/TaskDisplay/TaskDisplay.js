import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateTask from '../UpdateTask/UpdateTask';

export default function TaskDisplay() {
    const [showModal, setShowModal] = useState(false);
    const [activeContent, setactiveContent] = useState(null);
    const [inactiveContent, setinactiveContent] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);

    async function activetasklist() {
        try {
            const response = await axios.get('/tasks/viewactivetask');
            console.log('content found');
            setactiveContent(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    async function inactivetasklist() {
        try {
            const response = await axios.get('/tasks/viewinactivetask');
            console.log('content found');
            setinactiveContent(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        activetasklist();
        inactivetasklist();
    }, []);


    const handleUpdateTask = (index) => {
        setActiveTaskIndex(index);
        setShowModal(true);
    };

    const handleDoneTask = async (taskId) => {
        console.log("Task completed no:",taskId)
        try {
            // Perform the complete task logic here
            await axios.post('/tasks/completetask',{task_no: taskId});
            console.log('Task completed');
            activetasklist();
            inactivetasklist();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <div className="container my-4" id="task-table">
                <h2>Active Tasks</h2>
                <div id="tasks" className="table-responsive">
                    <table className="table table-light table-bordered">
                        <thead id="table-heading">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Task Name</th>
                                <th scope="col">Task Details</th>
                                <th scope="col">Date for Completion (MM/DD/YYYY)</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {activeContent && activeContent.length > 0 ? (
                                activeContent.map((item, index) => (
                                    <>
                                        <tr key={item.task_no}>
                                            <td>{index + 1}</td>
                                            <td>{item.task_name}</td>
                                            <td>{item.task_details}</td>
                                            <td>{new Date(item.doc).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-dark btn-sm me-2"
                                                    onClick={() => handleUpdateTask(item.task_no)}
                                                >
                                                    Update Task
                                                </button>
                                                <button
                                                    className="btn btn-outline-dark btn-sm m-2"
                                                    onClick={() => handleDoneTask(item.task_no)}
                                                >
                                                    Done
                                                </button>
                                            </td>
                                        </tr>
                                        {showModal && (
                                            <UpdateTask
                                                taskIdentifier={activeTaskIndex}
                                                showModal={showModal}
                                                setShowModal={setShowModal}
                                                activetasklist={activetasklist}
                                            />
                                        )}
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Active Tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container my-4" id="task-table">
                <h2>Completed Tasks</h2>
                <div id="tasks" className="table-responsive">
                    <table className="table table-light table-bordered" id="score">
                        <thead id="table-heading">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Task Name</th>
                                <th scope="col">Task Details</th>
                                <th scope="col">Date for Completion (MM/DD/YYYY)</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {inactiveContent && inactiveContent.length > 0 ? (
                                inactiveContent.map((item, index) => (
                                    <tr key={item.task_no}>
                                        <td>{index + 1}</td>
                                        <td>{item.task_name}</td>
                                        <td>{item.task_details}</td>
                                        <td>{new Date(item.doc).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Inactive Tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
