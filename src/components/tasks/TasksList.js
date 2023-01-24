import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
// import { BsFillTrash2Fill } from "@react-icons/all-files/bs/BsFillTrash2Fill";
import { TimerButton } from '../../styles/buttons/TimerButton';

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

  return (
    <StyledTask>
      {/* <StyledCheckbox>
        <input
          type="checkbox"
          checked={task.done}
          onClick={(e) => {
            handleChangeTask({
              ...task,
              done: e.target.checked,
            })
          }} />
      </StyledCheckbox> */}
      <p contenteditable="true">{task.text}</p>
      <SmallButton
        className='btn-delete'
        onClick={() => handleDeleteTask(task.id)}>Done!</SmallButton>
    </StyledTask>
  )
}

const SmallButton = styled(TimerButton)`
  height: 2.5vh;
  width: 8vh;
  font-size: 0.65rem;
  border: 1px solid white;
  margin-left: auto;
`
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
  width: 90%;
  align-items: center;
  color: white;
  font-family: 'Helvetica';
  font-weight: 200;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
  padding: 0 2vh 0.1rem 2vh;
  backdrop-filter: blur(2px);
  height: 4vh;
  border-radius: 40px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  p:focus {
    outline: none;
    outline-offset: none;
    text-decoration: underline;
  }
  p::first-letter {
    text-transform: capitalize;
  }
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
const StyledCheckbox = styled.div`
`
