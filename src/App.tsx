import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';

export type filterType = "All" | "Active" | "Completed"
type TodolistsType = { id: string, title: string, filter: filterType }
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to buy", filter: "All"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "JSX", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bobs", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ],
    })

    function changeCheked(id: string, isDone: boolean, todolistID: string) {
        let todolistTask = tasks[todolistID]
        let task = todolistTask.find(f => f.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTask(id: string, todolistID: string) {
        let task = tasks[todolistID]
        tasks[todolistID] = task.filter(f => f.id !== id);
        setTasks({...tasks});
    }

    function addTask(value: string, todolistID: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    function changeFilter(value: filterType, todolistID: string) {
        let todolist = todolists.find(f => f.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist (id: string) {
        setTodolists(todolists.filter(f=>f.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map(tl => {
                let newTasks = tasks[tl.id];
                if (tl.filter === 'Active') {
                    newTasks = newTasks.filter(f => !f.isDone)

                }
                if (tl.filter === 'Completed') {
                    newTasks = newTasks.filter(f => f.isDone)
                }

                return (<Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={newTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeCheked={changeCheked}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />)
            })}

        </div>
    );
}

export default App;