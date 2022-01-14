import React, {useState} from 'react';
import {filterType} from "./App";
import './App.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (titleInput: string, todolistID: string) => void
    changeCheked: (id: string, isDone: boolean, todolistID: string) => void
    activeFilter: filterType
    id: string
    deleteTodolist: (id: string) => void
}

export function Todolist({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeCheked,
                             activeFilter,
                             deleteTodolist,
                             ...props
                         }: PropsType) {
    let [error, setError] = useState<string | null>(null)

    function filterTask(value: filterType, todolistID: string) {
        changeFilter(value, todolistID)
    }

    let [titleInput, setTitleInput] = useState('');

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.currentTarget.value)
        setError("")
    }

    function addTaskHandler() {
        if (titleInput.trim() !== "") {
            addTask(titleInput, props.id)
            setTitleInput("")
        } else {
            setError("This pole is required")
        }
    }

    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        addTaskHandler()
    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}
            <button onClick={() => {
                deleteTodolist(props.id)
            }}>X
            </button>
        </h3>
        <div>
            <input className={error ? "error" : ""}
                   value={titleInput}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}
            >+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {tasks.map((m) => {

                function changeChekedHandler(e: React.ChangeEvent<HTMLInputElement>) {
                    changeCheked(m.id, e.currentTarget.checked, props.id)
                }

                return (
                    <li className={m.isDone ? "isDone" : ""}>
                        <input
                            type="checkbox"
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
            <button className={activeFilter === "All" ? "activeFilter" : ""}
                    onClick={() => filterTask("All", props.id)}>All
            </button>
            <button className={activeFilter === "Active" ? "activeFilter" : ""}
                    onClick={() => {
                        filterTask("Active", props.id)
                    }}>Active
            </button>
            <button className={activeFilter === "Completed" ? "activeFilter" : ""}
                    onClick={() => filterTask("Completed", props.id)}>Completed
            </button>
        </div>
    </div>
}
