import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useCountdown } from '../hooks/hookCountDown';
import theme from '../styles/Theme';

const Timer = () => {
    const [buttonSet, setButtonSet] = useState(false); // to toggle set-save
    const [timeInputs, setTimeInputs] = useState([]);
    const [count, setCount] = useState(0); // to track current timeInput
    const timeInputRef = useRef();

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

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

    const [animation, setAnimation] = useState(false);
    const [animationtime, setANimationTime] = useState(0)

    // TO START/ TO STOP TIMER
    const startTimer = () => {
        setCountDownStarted(true);
        const index = count - 1;
        // console.log(`index ${index}`)
        let timeInput = timeInputs[index];
        if (count !== 0) {
            setTimeInSec(timeInput * 60);
            setANimationTime(timeInput * 60 * 3);
            setAnimation(true)
            // console.log(`timeInput true ${timeInput}`)
        } else if (count === 0) {
            timeInput = timeInputs[0];
            setTimeInSec(timeInput * 60);
            setANimationTime(timeInput * 60 * 3);
            setAnimation(true)
            // console.log(`timeInput false ${timeInput}`)
        }
    }

    // console.log(`timeInSec ${timeInSec}`)
    // console.log(`antime ${animationTime}`)

    const stopTimer = () => {
        setCountDownStarted(false);
        setTimeInSec(0);
        setAnimation(false)
    }

    const [minutes, seconds] = useCountdown({
        countDownStarted,
        timeInSec,
        setTimeInSec,
        setCountDownStarted,

    })

    const top = window.innerHeight / 2.3;

    return (
        <StyledPage>
            <StyledTimer>
                <h1>Your pomodoro timer</h1>

                {animation ?
                    <>
                        <TrueCircle animationtime={animationtime}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={theme.cizes.cize} height={theme.cizes.cize}>
                                <circle cx={theme.cizes.cx} cy={theme.cizes.cy} r={theme.cizes.r} animationtime={animationtime}> top={top}</circle>
                            </svg>
                        </TrueCircle>

                    </>
                    :
                    null}

                <StyledCount>
                    {minutes < 10 ? <h1>0{minutes}:</h1> : <h1>{minutes}:</h1>}
                    {seconds < 10 ? <h1>0{seconds}</h1> : <h1>{seconds}</h1>}
                </StyledCount>

                <StyledButtons>

                    {buttonSet ?
                        <>
                            <StyledButtonStart onClick={saveInput}>Save</StyledButtonStart>
                            <StyledInput type='text' ref={timeInputRef} />
                        </>
                        :
                        <>
                            <StyledButtonStart onClick={handleToggleSet}>Set</StyledButtonStart>
                            {countDownStarted ?
                                <StyledButtonStart onClick={() => stopTimer()}>Stop</StyledButtonStart>
                                :
                                <StyledButtonStart onClick={() => startTimer()}>Start</StyledButtonStart>}
                        </>}

                </StyledButtons>
            </StyledTimer>

            <StyledLog>
                <header>
                    <h2>Your today's tasks </h2>
                    <p>{time}</p>
                </header>
            </StyledLog>

        </StyledPage>
    )
}

export default Timer;

const StyledPage = styled.div`

    display: flex;
    flex-direction: row;
    box-sizing: border-box;

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
    justify-content: center;
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

