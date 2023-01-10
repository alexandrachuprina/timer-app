import React, { useState, memo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import UsedTimers from './UsedTimers';
import { useCountdown } from '../hooks/hookCountDown';

const Timer = () => {
    const [buttonSet, setButtonSet] = useState(false); // to toggle set-save
    const [timeInputs, setTimeInputs] = useState([]);
    const [count, setCount] = useState(0); // to track current timeInput
    const timeInputRef = useRef();

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
    const startTimer = () => {
        setCountDownStarted(true);
        if (count) {
            const index = count - 1;
            const timeInput = timeInputs[index];
            setTimeInSec(timeInput * 60)
        } const timeInput = timeInputs[0];
        setTimeInSec(timeInput * 60)
    }

    const stopTimer = () => {
        setCountDownStarted(false);
        setTimeInSec(0)
    }

    const [minutes, seconds] = useCountdown({
        countDownStarted,
        timeInSec,
    })

    return (
        <StyledTimer>
            <h1>Timer</h1>
            <StyledCount>{minutes} {seconds}</StyledCount>

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
`

const StyledCount = styled.div`
    display: flex;
    flex-direction: column;
    background-color: red;
    height: 100px;
    width: 100%;
`

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
`

const StyledButtonStart = styled.button`
    width: 100%;
    margin: 1%;
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
        'list .'
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
