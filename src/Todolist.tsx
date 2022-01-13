import React from 'react';
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
}

export function Todolist({title, tasks, removeTask, filter, ...props}: PropsType) {
   function filterTask(value: filterType) {
       filter(value)
   }
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map(m => <li><input type="checkbox"
                                       checked={m.isDone}/>
                <span>{m.title}</span>
                <button onClick={() => {
                    removeTask(m.id)
                }}>X
                </button>
            </li>)}

        </ul>
        <div>
            <button onClick={()=>filterTask("All")}>All</button>
            <button onClick={()=>filterTask("Active")}>Active</button>
            <button onClick={()=>filterTask("Completed")}>Completed</button>
        </div>
    </div>
}
