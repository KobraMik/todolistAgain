import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type filterType = "All" | "Active" | "Completed"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "JSX", isDone: false},
    ])

    function removeTask(id: string) {
        tasks = tasks.filter(f => f.id !== id);
        setTasks(tasks);
    }

    let [filter, setFilter] = useState<filterType>('All')
    let newTasks = tasks;
    if (filter === 'Active') {
        newTasks = newTasks.filter(f => !f.isDone)

    }
    if (filter === 'Completed') {
        newTasks = newTasks.filter(f => f.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={newTasks}
                      removeTask={removeTask}
                      filter={setFilter}
            />
        </div>
    );
}

export default App;
