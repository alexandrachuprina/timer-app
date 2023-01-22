import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDivs } from './customizer-slice'
import { selectInputNumber, storeNumber } from '../number/numberSlice'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { dtheme } from '../../styles/DaylineTheme';


export default function Customizer() {
    const number = useSelector(selectInputNumber)
    const dispatch = useDispatch();
    const [toggleCustomizer, setToggleCustomizer] = useState(false);

    const handleToggle = () => {

    }

    return (
        <StyledCustomizer>
            {toggleCustomizer ?
                <StyledLine>
                    <StyldeButton onClick={() => { dispatch(createDivs(0)); setToggleCustomizer(false) }}>Off</StyldeButton>
                    <StyledInput
                        type="range"
                        value={number}
                        onChange={e => {
                            dispatch(storeNumber(e.target.value))
                        }}
                        onMouseUp={() =>
                            dispatch(createDivs(number))
                        }
                        min='24'
                        max='124'
                        step='10' />
                </StyledLine>
                :
                <StyledLine>
                    <StyldeButton onClick={() => { dispatch(createDivs(124)); setToggleCustomizer(true) }}>On</StyldeButton>
                    <p>Turn on dayline!</p>
                </StyledLine>
            }

        </StyledCustomizer>
    )
}

const StyledCustomizer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const StyledLine = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 5vh;

    p {
    opacity: 0.4;
    }

    input {
        color: black;
    }
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
const StyldeButton = styled.button`
    height: 3vh;
    width: 5vh;
    margin-right: 1vw;
    border-radius: 20px;
    border: none;
    background-color: white;
    opacity: 0.4;
`
