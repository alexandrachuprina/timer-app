import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { selectToggle } from '../features/toggle/toggleSlice';
import { useSelector } from 'react-redux';

function Timeline({ toggleAdd }) {
  const [timeNumbers, setTimeNumbers] = useState([]);
  const [timeNumbersInput, setTimeNumbersInput] = useState(4);
  const toggle = useSelector(selectToggle)

  // useEffect(() => {
  //   let allNumbers = [];
  //   for (let i = 0; i < 25; i++) {
  //     allNumbers.push(i)
  //   }
  //   setTimeNumbers(allNumbers);
  //   setTimeNumbersInput(4)
  // }, [toggle])

  const handleFilterTimeNumbers = () => {
    let allNumbers = [];
    for (let i = 0; i < 25; i++) {
      allNumbers.push(i)
    }
    setTimeNumbers(allNumbers);
    let newNumbers = [];
    for (let i = 0; i < 25; i += parseInt(timeNumbersInput)) {
      newNumbers.push(i)
    }
    setTimeNumbers(newNumbers);
  }

  const top = window.innerHeight / 2.3;
  const oneWidthN = 100 / (24 / parseInt(timeNumbersInput));

  return (
    <>
      <StyledEditor toggleAdd={toggleAdd}>
        <StyledInput
          type="range"
          value={timeNumbersInput}
          onChange={e => {
            setTimeNumbersInput(e.target.value)
          }}
          onMouseUp={handleFilterTimeNumbers}
          min='1'
          max='6'
          step='1' />
      </StyledEditor>

      {timeNumbers.map(number => (
        <>
          <TimeNumber
            key={timeNumbers.indexOf(number)}
            top={top}
            oneWidthN={oneWidthN}
            index={timeNumbers.indexOf(number)}>
            {number}:00
          </TimeNumber>
        </>
      ))}

    </>
  )
}

export default Timeline;

const StyledEditor = styled.div`
  display: flex;
  flex-direction: column;
  height: ${p => p.toggleAdd ? '100%' : ''};
  /* padding-bottom: 10vh; */
  margin-top: 1vh;
`

const TimeNumber = styled.div`
  position: absolute;
  top: calc(${props => props.top}px + 21vw);
  left: calc(${props => props.index} * ${p => p.oneWidthN}vw);
  color: white;
  font-family: 'Helvetica'; 
  opacity: 0.3;
  font-weight: 100;
`
const StyledInput = styled.input`
  margin-top: auto;
  /* FOR CHROME  */

  -webkit-appearance: none;
  height: 100%;
  border-radius: 20px;
  width: 20%;
  height: 2vh;
  opacity: 0.2;
  background: transparent;
  border: 1px solid white;

  &::-webkit-slider-runnable-track {
      background: transparent;
  }
  
  &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 2vh;
      width: 2vh;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      /* box-shadow: -0.5vh 0 1vh #827CFF; */
  }
`


