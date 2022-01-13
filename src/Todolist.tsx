import React, {useState} from 'react';
import {filterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filter: (value: filterType) => void
    addTask: (titleInput: string) => void
    changeCheked: (id: string, isDone: boolean) => void
}

export function Todolist({title, tasks, removeTask, filter, addTask,changeCheked, ...props}: PropsType) {
    function filterTask(value: filterType) {
        filter(value)
    }

    let [titleInput, setTitleInput] = useState('');

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.currentTarget.value)
    }

    function addTaskHandler () {
        addTask(titleInput)
        setTitleInput("")
    }

    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        addTaskHandler()
    }

    function onKeyPressHandler (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={titleInput}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}
            >+
            </button>
        </div>
        <ul>
            {tasks.map((m)=> {

                function changeChekedHandler (e: React.ChangeEvent<HTMLInputElement>) {
                     changeCheked(m.id, e.currentTarget.checked)
                }

                return(
                    <li><input type="checkbox"
                           checked={m.isDone}
                           onChange={changeChekedHandler}
                />
                    <span>{m.title}</span>
                    <button onClick={() => {
                        removeTask(m.id)
                    }}>X
                    </button>
                </li>)
            })}

        </ul>
        <div>
            <button onClick={() => filterTask("All")}>All</button>
            <button onClick={() => filterTask("Active")}>Active</button>
            <button onClick={() => filterTask("Completed")}>Completed</button>
        </div>
    </div>
}
