import React from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (titleInput: string, id: string) => void
    changeCheked: (id: string, isDone: boolean, todolistID: string) => void
    filter: filterType
    removeTodolist: (id: string) => void
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask, changeCheked, filter, ...props}: PropsType) {
    function filterTask(value: filterType) {
        changeFilter(value, props.id)
    }
    function removeTodolist() {
        props.removeTodolist(props.id)
    }
    function addTaskHandler(title: string) {
        addTask(title, props.id)
    }


    return <div>
        <h3>{title}
            <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {tasks.map((m) => {

                function changeChekedHandler(e: React.ChangeEvent<HTMLInputElement>) {
                    changeCheked(m.id, e.currentTarget.checked, props.id)
                }

                return (
                    <li className={m.isDone ? "isDone" : ""}><input type="checkbox"
                                                                    checked={m.isDone}
                                                                    onChange={changeChekedHandler}
                    />
                        <span>{m.title}</span>
                        <button onClick={() => {
                            removeTask(m.id, props.id)
                        }}>X
                        </button>
                    </li>)
            })}

        </ul>
        <div>
            <button className={filter === "All" ? "activeFilter" : ""} onClick={() => filterTask("All")}>All</button>
            <button className={filter === "Active" ? "activeFilter" : ""} onClick={() => filterTask("Active")}>Active
            </button>
            <button className={filter === "Completed" ? "activeFilter" : ""}
                    onClick={() => filterTask("Completed")}>Completed
            </button>
        </div>
    </div>
}

