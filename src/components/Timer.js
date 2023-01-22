import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useCountdown } from '../hooks/hookCountDown';
import theme from '../styles/Theme';
import Customizer from '../features/customizer/Customizer';
import Timeline from './Timeline';
import List from '../components/tasks/List'

const Timer = () => {
    const [firstButton, setFirstButton] = useState(true);
    const [secondButton, setSecondButton] = useState(false);
    const [thirdButton, setThirdButton] = useState(false);
    const [timeInput, setTimeInput] = useState(0);
    const timeInputRef = useRef();

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

    const top = window.innerHeight / 2.3;
    const oneWidth = window.innerWidth / 24;
    const height = window.innerWidth * 0.2;
    const halfOfTimeInput = timeInputInSec / 2;
    console.log(`halfOfTimeInput ${halfOfTimeInput}`)

    return (
        <StyledPage>
            <StyledTimer>
                <h1 contenteditable="true">Your pomodoro timer</h1>

                <Customizer />

                <StyledCount>
                    {minutes < 10 ? <h1>0{minutes}:</h1> : <h1>{minutes}:</h1>}
                    {seconds < 10 ? <h1>0{seconds}</h1> : <h1>{seconds}</h1>}
                </StyledCount>

                <StyledButtons>

                    {firstButton ?
                        <StyledButtonStart onClick={handleToggleSet}>Set</StyledButtonStart>
                        : null}
                    {secondButton ?
                        <>
                            <StyledButtonStart onClick={handleSaveInput}>Save</StyledButtonStart>
                            <StyledInput type='text' ref={timeInputRef} />
                        </>
                        : null}
                    {thirdButton ?
                        <>
                            {countDownStarted ?
                                <>
                                    <StyledButtonStart onClick={handleStopTimer}>Stop</StyledButtonStart>
                                </>
                                :
                                <>
                                    <StyledButtonStart onClick={handleStartTimer}>Start</StyledButtonStart>
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

                <List />
                <Timeline />
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
`;

const PgwidgetProgressLeft = styled.div`
    position: absolute;
    /* top: ${p => p.top}px; */
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
  `;

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
  `;

const Circle = styled.div`
    /* background-color: red; */
    position: absolute; 
    top: ${p => p.top}px;
    left: calc(${p => p.oneWidth}px * 3.65);
    width: 20vw;
    height: ${p => p.height}px;
`;

const PgwidgetBarL = styled.div`
    /* background-color: blue; */
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0, 20vw, 20vw, 10vw);
    border-radius: 100%;
    z-index: 1;
`;

const PgwidgetBarR = styled.div`
    /* background-color: red; */
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0, 20vw, 20vw, 10vw);
    border-radius: 100%;
    z-index: 1;
    transform: rotate(180deg);
`;

const StyledPage = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    height: 100%;

    h1 {
        font-size: 4.5rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
        color: white;
    }

    h2 {
        font-size: 2rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: 200;
        padding: 0;
        margin: 0;
        color: white;
    }

    p {
        font-size: 1rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: 200;
        color: white;
    }
`
const StyledTimer = styled.div`
    display: flex;
    flex-direction: column;
    width: 35vw;
    /* justify-content: center; */
    margin-right: 20vw;
`
const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Animating = keyframes`
    100% {
        stroke-dashoffset: 0;
    }
`
const TrueCircle = styled.div`
    transform: rotate(-90deg);

    position: absolute;
    z-index: 1;
    top: 41vh; // -0.3 
    left: 12vw; // +0.14

    circle {
    fill: none;
    /* stroke: ${theme.colors.tangerine}; */
    stroke: white;
    stroke-width: 4;
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation-duration: ${props => props.animationtime}s;
    animation-name: ${Animating};

    opacity: 0.6;
}
`
const StyledCount = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 3vh 0vw 3vh 0vw;
    
    height: ${theme.cizes.d};
    width: 100%;
`
const StyledButtonStart = styled.button`
    border: 2px solid white;
    /* background-color: ${theme.colors.lightGrey}; */
    background-color: transparent;
    border-radius: 30px;
    color: white;
    /* opacity: 0.3; */
    box-sizing: border-box;
    font-family: 'Helvetica', sans-serif;
    font-weight: 200;
    font-size: 1.5rem;
    cursor: pointer;
    display: inline-block;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;

    height: 40px;
    width: 10vw;

:hover {
    background-color: black;
    border: 2px solid black;
    color: ${theme.colors.lightGrey};
    opacity: 1;
}
`
const StyledInput = styled.input`
     -webkit-appearance: none;
    -moz-appearance:none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;

    /* display: flex; */
    border-radius: 30px;
    /* flex-direction: row; */
    box-sizing: border-box;
    margin-left: 20px;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 1rem;
    text-transform: uppercase;
    border: 2px solid ${theme.colors.basicGrey};
    text-align: center;
    background-color: ${theme.colors.basicGrey};
    opacity: 0.2;

    &:hover {
        opacity: 1;
        border: 2px solid black;
        background-color: black;
    }

    &:focus {
        opacity: 1;
        border: 2px solid black;
        background-color: black;
        color: ${theme.colors.lightGrey};
        outline: none;
    }
`

const StyledLog = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;

    header {
        display: flex;
        flex-direction: column;
        
    }
`


