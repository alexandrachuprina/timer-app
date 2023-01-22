import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import { BsFillTrash2Fill } from "@react-icons/all-files/bs/BsFillTrash2Fill";
import { FaSave } from "@react-icons/all-files/fa/FaSave";

export default function TasksList({ tasks, handleDeleteTask, handleChangeTask }) {
    return (
        <StyledtTasksList>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task
                        task={task}
                        handleDeleteTask={handleDeleteTask}
                        handleChangeTask={handleChangeTask}
                    />
                </li>

            ))}
        </StyledtTasksList>
    )
}

function Task({ task, handleDeleteTask, handleChangeTask }) {
    const [isEditing, setEditing] = useState(false);

    return (
        <StyledTask>
            <StyledCheckbox
                type="checkbox"
                checked={task.done}
                onClick={(e) => {
                    handleChangeTask({
                        ...task,
                        done: e.target.checked,
                    })
                }} />
            <p contenteditable="true">{task.text}</p>
            <StyledIcon>
                <BsFillTrash2Fill
                    className='btn-delete'
                    onClick={() => handleDeleteTask(task.id)} />
            </StyledIcon>
        </StyledTask>
    )
}

const StyledtTasksList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`

const StyledTask = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    font-family: 'Helvetica';
    font-weight: 200;

    p {
    &:focus {
        outline: none;
        outline-offset: none;
        text-decoration: underline;
    }}
`

const StyledIcon = styled.div`
    padding-left: 10px;
    color: white;
    opacity: 0.4;
    margin-left: auto;
    margin-right: 2%;

    &:hover {
        opacity: 1;
    }
`

const StyledCheckbox = styled.input`
   .round {
    position: relative;
  }

   .round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    width: 28px;
    display: block;
  }

  .round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 8px;
    opacity: 0;
    position: absolute;
    top: 9px;
    transform: rotate(-45deg);
    width: 12px;
  }

  .round input[type="checkbox"] {
    visibility: hidden;
    display: none;
    opacity: 0;
  }

   .round input[type="checkbox"]:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
  }

   .round input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`
