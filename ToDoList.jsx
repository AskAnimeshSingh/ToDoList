
import React, { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [currentTaskText, setCurrentTaskText] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function startEditing(index) {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setCurrentTaskText(tasks[index]);
    }

    function handleEditChange(event) {
        setCurrentTaskText(event.target.value);
    }

    function saveEdit() {
        const updatedTasks = tasks.map((task, index) => index === currentTaskIndex ? currentTaskText : task);
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
        setCurrentTaskText("");
    }

    return (
        <>
            <div className="To-do-list">
                <h1>To-do List</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <button className="Add-btn" onClick={addTask}>
                        Add Task
                    </button>
                </div>
                <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            {isEditing && currentTaskIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={currentTaskText}
                                        onChange={handleEditChange}
                                    />
                                    <button className="Save-btn" onClick={saveEdit}>
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text">{task}</span>
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteTask(index)}
                                    >
                                        Delete
                                    </button>
                                    <button className="Edit-btn" onClick={() => startEditing(index)}>
                                        Edit
                                    </button>
                                    <button className="Move-Up" onClick={() => moveTaskUp(index)}>
                                        Move Up
                                    </button>
                                    <button className="Move-Down" onClick={() => moveTaskDown(index)}>
                                        Move Down
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default ToDoList;
