import React, {useState, ChangeEvent} from "react";

type EditableSpan = {
    title: string
    onChangeEditableSpan: (input: string) => void
}

export function EditableSpan(props: EditableSpan) {
    const [editMode, setEditMode] = useState(false)
    const [input, setInput] = useState(props.title)

    function editModeView() {
        setEditMode(true)
        setInput(props.title)
    }

    function editModeHide() {
        setEditMode(false)
        props.onChangeEditableSpan(input)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={input}
                     onChange={onChangeHandler}
                     autoFocus
                     onBlur={editModeHide}
            />
            : <span onDoubleClick={editModeView}>
                {props.title}
        </span>
    )

}