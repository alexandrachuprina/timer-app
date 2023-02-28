import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useCountdown } from '../hooks/hookCountDown';
import theme from '../styles/Theme';
import Customizer from '../features/customizer/Customizer';
import Timeline from './Timeline';
import List from '../components/tasks/List';
import { useSelector, useDispatch } from 'react-redux';
import { selectToggle } from '../features/toggle/toggleSlice';
import { MainInput } from '../styles/input/MainInput';
import { TimerButton } from '../styles/buttons/TimerButton';

const Timer = () => {
  const toggle = useSelector(selectToggle);

  const [firstButton, setFirstButton] = useState(true);
  const [secondButton, setSecondButton] = useState(false);
  const [thirdButton, setThirdButton] = useState(false);
  const [timeInput, setTimeInput] = useState(0);
  const timeInputRef = useRef();

  const [toggleAdd, setToggleAdd] = useState(true); // for Timeline

  // CURRENT TIME
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  // TO SET TIMER 
  const handleToggleSet = () => {
    setFirstButton(false);
    setSecondButton(true);
  }

  const handleSaveInput = () => {
    const newInput = parseInt(timeInputRef.current.value);
    setTimeInput(newInput);
    setSecondButton(false);
    setThirdButton(true);
  }

  const [countDownStarted, setCountDownStarted] = useState(false); // to toggle start-stop
  const [timeInSec, setTimeInSec] = useState(0);
  const [animation, setAnimation] = useState(false); // to toggle animation

  // TO START/ TO STOP TIMER
  const timeInputInSec = timeInput * 60;

  const handleStartTimer = () => {
    setCountDownStarted(true);

    setTimeInSec(timeInputInSec);
    setAnimation(!animation);
  }

  const handleStopTimer = () => {
    setCountDownStarted(false);
    setTimeInSec(0);
    setAnimation(false);

    setFirstButton(true);
    setSecondButton(false);
    setThirdButton(false);
    setAnimation(!animation)
  }

  const [minutes, seconds] = useCountdown({
    countDownStarted,
    timeInSec,
    setTimeInSec,
    setCountDownStarted,
    setFirstButton,
    setSecondButton,
    setThirdButton,
    setAnimation,
    animation
  })

  // PARAMS FOR STYLING
  const top = window.innerHeight / 2.3;
  const oneWidth = window.innerWidth / 24;
  const height = window.innerWidth * 0.2;
  const halfOfTimeInput = timeInputInSec / 2;

  return (
    <StyledPage>
      <StyledTimer>
        <header>
          <h1 contenteditable="true">Your pomodoro timer</h1>
        </header>
        <Customizer />

        <StyledCount>
          {minutes < 10 ? <h1>0{minutes}:</h1> : <h1>{minutes}:</h1>}
          {seconds < 10 ? <h1>0{seconds}</h1> : <h1>{seconds}</h1>}
        </StyledCount>

        <StyledButtons>

          {firstButton ?
            <TimerButton onClick={handleToggleSet}>Set</TimerButton>
            : null}
          {secondButton ?
            <>
              <TimerButton onClick={handleSaveInput}>Save</TimerButton>
              <MainInput type='text' ref={timeInputRef} />
            </>
            : null}
          {thirdButton ?
            <>
              {countDownStarted ?
                <>
                  <TimerButton onClick={handleStopTimer}>Stop</TimerButton>
                </>
                :
                <>
                  <TimerButton onClick={handleStartTimer}>Start</TimerButton>
                </>
              }
            </>
            : null}
        </StyledButtons>
      </StyledTimer>

      <StyledLog>
        <header>
          <h2 contenteditable="true">Your today's tasks </h2>
          <p>{time}</p>
        </header>

        <List toggleAdd={toggleAdd} setToggleAdd={setToggleAdd} />

        {toggle ?
          <Timeline toggleAdd={toggleAdd} />
          : null}
      </StyledLog>

      {animation ?
        <Circle top={top} oneWidth={oneWidth} height={height}>
          <PgwidgetBarL height={height}>
            <PgwidgetProgressLeft halfOfTimeInput={halfOfTimeInput} height={height} />
          </PgwidgetBarL>
          <PgwidgetBarR height={height}>
            <PgwidgetProgressRight halfOfTimeInput={halfOfTimeInput} height={height} />
          </PgwidgetBarR>
        </Circle>
        : null}
    </StyledPage>
  )
}

export default Timer;

const Left = keyframes`
  0% {transform: rotate(0deg) }
  50% {transform: rotate(90deg) }
  100% { transform: rotate(180deg) }
`
const PgwidgetProgressLeft = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  clip: rect(0px, 10vw, 20vw, 0px);
  border-radius: 100%;
  opacity: 0.1;
  animation-name: ${Left}; 
  animation-timing-function: linear;
  animation-duration: ${p => p.halfOfTimeInput}s; 
  animation-fill-mode: forwards;
  `
const PgwidgetProgressRight = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  clip: rect(0px, 10vw, 20vw, 0px);
  border-radius: 100%;
  opacity: 0.1;
  
  animation-name: ${Left}; 
  animation-duration: ${p => p.halfOfTimeInput}s; 
  animation-delay: ${p => p.halfOfTimeInput}s; 
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  `
const Circle = styled.div`
  position: absolute; 
  top: ${p => p.top}px;
  left: 15.25vw;
  width: 20vw;
  height: ${p => p.height}px;
`
const PgwidgetBarL = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0, 20vw, 20vw, 10vw);
  border-radius: 100%;
  z-index: 1;
`
const PgwidgetBarR = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0, 20vw, 20vw, 10vw);
  border-radius: 100%;
  z-index: 1;
  transform: rotate(180deg);
`
const StyledPage = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 100%;
  
  h1 {
    text-transform: uppercase;
    font-size: 4.5rem;
    font-weight: normal;
    font-family: 'Helvetica', sans-serif;
    padding: 0;
    margin: 0;
    color: white;

    &:focus {
    outline: none;
    outline-offset: none;
  }
}
  h2 {
    font-size: 2rem;
    font-family: 'Helvetica', sans-serif;
    font-weight: 200;
    padding: 0;
    margin: 0;
    color: white;

    &:focus {
    outline: none;
    outline-offset: none;
  }
}
  p {
    font-size: 1rem;
    font-family: 'Helvetica', sans-serif;
    font-weight: 200;
    color: white;

    &:focus {
    outline: none;
    outline-offset: none;
  }
}
`
const StyledTimer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35vw;
  margin: 0 10vh 0 0;
  justify-content: space-between;

  header {
    height: 36%;
  }
`
const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`
const StyledCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 3vh 0vw 9vh 0vw;
  
  height: ${theme.cizes.d};
  width: 100%;
`
const StyledLog = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 100%;

  header {
    display: flex;
    flex-direction: column;

    &:focus {
      outline: none;
      outline-offset: none;
      text-decoration: underline;
    }
  }
`




