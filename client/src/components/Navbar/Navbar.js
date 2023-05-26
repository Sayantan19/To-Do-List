import React, { useState } from 'react';
import AddTaskModal from '../AddTask/AddTask';

export default function Navbar() {
    const [showModal, setShowModal] = useState(false);

    const handleAddTask = () => {
        setShowModal(true);
    };

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <span>To-Do List</span>
                    </a>
                    <div id="navcol-5" className="">
                        <ul className="navbar-nav ms-auto">
                            {/* Add other menu items if needed */}
                        </ul>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-light"
                                role="button"
                                onClick={handleAddTask}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <AddTaskModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
