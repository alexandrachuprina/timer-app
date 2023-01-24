import React from 'react';
import { useReducer, useState } from 'react';
import { IoIosAddCircleOutline } from "@react-icons/all-files/io/IoIosAddCircleOutline"
import { AiOutlineMinusCircle } from "@react-icons/all-files/ai/AiOutlineMinusCircle"
import AddTask from './AddTask';
import TasksList from './TasksList';
import { tasksReducer } from './tasksReducer';
import styled from 'styled-components';
import { TimerButton } from '../../styles/buttons/TimerButton';

export default function List({ toggleAdd, setToggleAdd }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: text,
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
      {toggleAdd ?
        <SmallButton onClick={() => setToggleAdd(!toggleAdd)}> Show tasks</SmallButton>
        :
        <>
          <SmallButton onClick={() => setToggleAdd(!toggleAdd)}> Hide tasks </SmallButton>
          <AddTask handleAddTask={handleAddTask} />
          <StyledList>
            <TasksList tasks={tasks} handleDeleteTask={handleDeleteTask} handleChangeTask={handleChangeTask} />
          </StyledList>
        </>}
    </>
  )
}

const SmallButton = styled(TimerButton)`
  height: 3vh;
  width: 12vh;
  font-size: 0.65rem;
  border: 1px solid white;
`
const StyledList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 2;

  &:before {
		/* position: absolute; */
		z-index: -1; /* put it *behind* parent */
		/* go outside padding-box by 
		 * a border-width ($b) in every direction */
		top: -$b; right: -$b; bottom: -$b; left: -$b;
		border: inherit;
		border-color: transparent;
		background: inherit;
		background-clip: border-box;
  }
`
const StyledIconBig = styled.div`
  display: flex;
  flex-direction: row;
  
  width: 4vh; 
  height: 4vh;
  color: white;
  opacity: 0.4;
  margin: 0;
  padding: 0;

  &:hover {
      opacity: 1;
  }
`

