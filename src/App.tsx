import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterType = "All" | "Active" | "Completed"
export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}

function App() {

    function changeFilter (value: filterType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: "What to learn", filter: "Active"},
        {id: v1(), title: "What to buy", filter: "All"},
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "JSX", isDone: false},
    ])

    function changeCheked(id: string, isDone: boolean) {
        let task = tasks.find(f => f.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    function removeTask(id: string) {
        tasks = tasks.filter(f => f.id !== id);
        setTasks(tasks);
    }

    function addTask(value: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let newTasks = tasks;
                    if (tl.filter === 'Active') {
                        newTasks = newTasks.filter(f => !f.isDone)

                    }
                    if (tl.filter === 'Completed') {
                        newTasks = newTasks.filter(f => f.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={newTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheked={changeCheked}
                        activeFilter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
