import React, {useState, ChangeEvent, KeyboardEvent,} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (addTitle: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {
    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(false)
    }
    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            if(inputValue.trim() !== '') {
                props.addTask(inputValue)
                setInputValue('')
                // setError(false)
            } else {
                setError(true)
                setInputValue('')
            }
        }
    }
    const onAddNewTask = () => {
        if(inputValue.trim() !== '') {
            props.addTask(inputValue)
            setInputValue('')
            // setError(false)
        } else {
            setError(true)
            setInputValue('')
        }
    }
    const onAllFilter = () => props.changeFilter('all')
    const onActiveFilter = () => props.changeFilter('active')
    const onCompletedFilter = () => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={
                        error ? 'error' : ''
                    }
                    value={inputValue}
                    onChange={onChangeHandler}
                    onKeyPress={onPressKeyHandler}
                />
                <button onClick={onAddNewTask}>+</button>
                {error ? <div>Title is required!</div> : null}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveTask = () => {props.removeTask(t.id)}
                        const onChangeCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)}

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeCheckboxStatus}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickRemoveTask}>X
                            </button>
                        </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}