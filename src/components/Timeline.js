import React, { useState } from 'react';
import styled from 'styled-components';

function Timeline() {
    const [timeNumbers, setTimeNumbers] = useState([]);
    const [timeNumbersInput, setTimeNumbersInput] = useState(0);

    const handleFilterTimeNumbers = () => {
        // console.log(`timeNumbersInput ${timeNumbersInput}`)

        let allNumbers = [];
        for (let i = 0; i < 25; i++) {
            allNumbers.push(i)
        }

        // console.log(`allNumbers ${allNumbers}`)

        setTimeNumbers(allNumbers);
        let newNumbers = [];
        for (let i = 0; i < 25; i += parseInt(timeNumbersInput)) {
            newNumbers.push(i)
        }

        // console.log(`newNumbers ${newNumbers}`)

        setTimeNumbers(newNumbers);
    }

    const top = window.innerHeight / 2.3;
    const oneWidthN = 100 / (24 / parseInt(timeNumbersInput));
    // const oneWidthN = window.innerWidth / (Math.floor(24 / parseInt(timeNumbersInput)));

    // console.log(`oneWidthN ${oneWidthN}`)
    // console.log(`top ${top}`)

    return (
        <>
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


const TimeNumber = styled.div`
    position: absolute;
    top: calc(${props => props.top}px + 21vw);
    /* left: ${props => props.index}px; */
    left: calc(${props => props.index} * ${p => p.oneWidthN}vw);
    color: white;
    font-family: 'Helvetica'; 
    opacity: 0.3;
    font-weight: 100;


`

const StyledInput = styled.input`
    /* FOR CHROME  */
    -webkit-appearance: none;
    height: 100%;
    border-radius: 20px;
    width: 30%;
    height: 2.5vh;
    opacity: 0.4;
    background: transparent;
    border: 1px solid white;

    &::-webkit-slider-runnable-track {
        background: transparent;
    }
    
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 2.5vh;
        width: 2.5vh;
        border-radius: 50%;
        background: white;
        cursor: pointer;
        /* box-shadow: -0.5vh 0 1vh #827CFF; */
    }
`


