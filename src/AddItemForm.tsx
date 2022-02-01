import React, {useState} from "react";
import {Button, TextField, IconButton} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

type AddItemFormType = {
    addItem: (titleInput: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [titleInput, setTitleInput] = useState('');
    let [error, setError] = useState<string | null>(null)

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.currentTarget.value)
        setError("")
    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        addTaskHandler()
    }

    function addTaskHandler() {
        if (titleInput.trim() !== "") {
            props.addItem(titleInput)
            setTitleInput("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       className={error ? "error" : ""}
                       value={titleInput}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
            <IconButton onClick={onClickHandler} color="primary">
                <AddBox />
            </IconButton>

            {error ? <div className="error-message">{error}</div> : null}
        </div>
    )
}