import React from 'react';
import { useReducer } from 'react';

import AddTask from './AddTask';
import TasksList from './TasksList';
import { tasksReducer } from './tasksReducer';

import styled from 'styled-components';

const StyledList = styled.div`
    width: 100%;
    height: 20%;
    overflow-y: scroll;
`

export default function List() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        })
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId,
        })
    }

    function handleChangeTask(task) {
        dispatch({
            type: 'changed',
            task: task,
        })
    }

    return (
        <>
            <AddTask handleAddTask={handleAddTask} />
            <StyledList>
                <TasksList tasks={tasks} handleDeleteTask={handleDeleteTask} handleChangeTask={handleChangeTask} />
            </StyledList>
        </>
    )
}

let nextId = 3;
const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
]