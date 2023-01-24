import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainInput } from '../../styles/input/MainInput';
import { TimerButton } from '../../styles/buttons/TimerButton'

export default function AddTask({ handleAddTask }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setText(event.target.value);
        handleAddTask(text);
        setText('');
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [text]);

  return (
    <StyledAdd>
      <SmallInput
        id="AddTaskForm"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <SmallButton
        onClick={() => {
          setText('');
          handleAddTask(text);
        }}
        type="submit"
      >Add task</SmallButton >
    </StyledAdd>
  )
}

const SmallButton = styled(TimerButton)`
  height: 100%;
  width: 20%;
  font-size: 1rem;
`
const SmallInput = styled(MainInput)`
  margin: 0 2vh 0 0;
  border: none;
  width: 50%;
  text-transform: none;
`
const StyledAdd = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.5rem;
  margin-bottom: 0.6rem;
  margin-top: 1rem;
`