import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import UsedTimers from './UsedTimers';
import { useCountdown } from '../hooks/hookCountDown';

const Timer = () => {
    const [buttonSet, setButtonSet] = useState(false); // to toggle set-save
    const [timeInputs, setTimeInputs] = useState([]);
    const [count, setCount] = useState(0); // to track current timeInput
    const timeInputRef = useRef();

    // console.log(`       NEW        `)
    // console.log(`count ${count}`)

    // TO SET TIMER 
    const handleToggleSet = () => {
        setButtonSet(!buttonSet)
    }

    const saveInput = () => {
        const newInput = parseInt(timeInputRef.current.value);
        if (!isNaN(newInput)) {
            setTimeInputs(prev => {
                return [...prev, newInput]
            });
            handleToggleSet();
            setCount(count + 1);
        } handleToggleSet();
    }

    const handleClearInputs = () => {
        setTimeInputs(prev => {
            return []
        });
    }

    const [countDownStarted, setCountDownStarted] = useState(false); // to toggle start-stop
    const [timeInSec, setTimeInSec] = useState(0);



    // TO START/ TO STOP TIMER
    let circle;
    const startTimer = () => {
        setCountDownStarted(true);
        const index = count - 1;
        // console.log(`index ${index}`)
        let timeInput = timeInputs[index];
        if (count !== 0) {
            setTimeInSec(timeInput * 60);
            circle = timeInput * 60;
            // console.log(`timeInput true ${timeInput}`)
        } else if (count === 0) {
            timeInput = timeInputs[0];
            setTimeInSec(timeInput * 60);
            circle = timeInput * 60;
            // console.log(`timeInput false ${timeInput}`)
        }
    }

    // console.log(`timeInSec ${timeInSec}`)

    const stopTimer = () => {
        setCountDownStarted(false);
        setTimeInSec(0)
    }

    const [minutes, seconds] = useCountdown({
        countDownStarted,
        timeInSec,
        setTimeInSec,
        setCountDownStarted
    })

    return (
        <StyledTimer timeInSec={timeInSec} circle={circle}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" timeInSec={timeInSec} circle={circle} />
            </svg>

            <h2>Your pomodoro timer</h2>

            <StyledCount>
                {minutes < 10 ? <h1>0{minutes}:</h1> : <h1>{minutes}:</h1>}
                {seconds < 10 ? <h1>0{seconds}</h1> : <h1>{seconds}</h1>}
            </StyledCount>


            {countDownStarted ?
                <StyledButtonStart onClick={() => stopTimer()}>Stop</StyledButtonStart>
                :
                <StyledButtonStart onClick={() => startTimer()}>Start</StyledButtonStart>}

            {buttonSet ?
                <>
                    <StyledButtonStart onClick={saveInput}>Save</StyledButtonStart>
                    <StyledInput type='text' placeholder='Enter time' ref={timeInputRef} />
                </>
                :
                <StyledButtonStart onClick={handleToggleSet}>Set</StyledButtonStart>}


            <StyledLog>
                <Text>Used timers</Text>
                <StyledButtonClear onClick={handleClearInputs}>Clear</StyledButtonClear>
                <StyledList>
                    <UsedTimers timeInputs={timeInputs} />
                </StyledList>
            </StyledLog>
        </StyledTimer>
    )
}

export default Timer;

const StyledTimer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    circle {
    fill: none;
    stroke: red;
    stroke-width: 2;
    stroke-dasharray: ${props => props.circle};
    stroke-dashoffset: ${props => props.circle};
    animation: animating ${props => props.circle}s ease-out both;
}

@keyframes animating{
    to {
        stroke-dashoffset: 0;
    }
}
`

const StyledCount = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* align-self: center; */
    height: 100px;
    width: 100%;
`

const StyledButtonStart = styled.button`
    width: 100%;
    margin: 3% 0% 3% 0%;
`

const StyledInput = styled.input`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    margin: 4% 0px;
`

const StyledLog = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    grid-template-areas:
        'text button'
        'list .';
    align-items: center;
`
const Text = styled.p`
    grid-area: 'text';
`
const StyledList = styled.ul`
    list-style: none;
    grid-area: 'list';
    padding: 0;
    margin: 0;

`
const StyledButtonClear = styled.button`
    grid-area: 'button';
    height: 100%;
`
