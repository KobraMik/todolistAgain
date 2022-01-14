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

    function changeFilter(value: filterType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to buy", filter: "All"},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "JSX", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Solt", isDone: false},
        ]
    })


    function changeCheked(id: string, isDone: boolean, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(f => f.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTask(id: string, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t=>t.id!== id);
        setTasks({...tasks})
    }

    function addTask(value: string, todolistID: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let taskForTodolist = allTodolistTasks;

                    if (tl.filter === 'Active') {
                        taskForTodolist = allTodolistTasks.filter(f => !f.isDone)

                    }
                    if (tl.filter === 'Completed') {
                        taskForTodolist = allTodolistTasks.filter(f => f.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
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
