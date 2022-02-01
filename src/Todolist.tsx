import React from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox, Container, Grid,} from '@material-ui/core';
import {Delete, FavoriteBorder, Favorite,} from '@material-ui/icons';

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
    onChange: (taskID: string, input: string, todolistID: string) => void
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
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {tasks.map((m) => {

                function changeChekedHandler(e: React.ChangeEvent<HTMLInputElement>) {
                    changeCheked(m.id, e.currentTarget.checked, props.id)
                }

                function onChangeEditableSpan(input: string) {
                    props.onChange(m.id, input, props.id)
                }

                return (
                    <li className={m.isDone ? "isDone" : ""}>
                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} checked={m.isDone}
                                  onChange={changeChekedHandler}/>

                        <EditableSpan title={m.title} onChangeEditableSpan={onChangeEditableSpan}/>
                        <IconButton aria-label="delete" onClick={() => {
                            removeTask(m.id, props.id)
                        }}> <Delete/></IconButton>
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

