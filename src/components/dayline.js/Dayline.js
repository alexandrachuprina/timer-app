import { useState, useRef } from 'react';
import styled from 'styled-components';
import { dtheme } from '../../styles/DaylineTheme';

function Dayline() {
    const [divs, setDivs] = useState([]);
    const [divsInTime, setDivsInTime] = useState([])
    const refNumberOfDivs = useRef();
    const [inputNumber, setInpitNumber] = useState(0)

    const createDivsInTime = () => {
        setDivsInTime([]);
        const number = refNumberOfDivs.current.value;
        setInpitNumber(refNumberOfDivs.current.value);
        for (let i = 0; i < number; i++) {
            setDivsInTime(prev => [
                ...prev, { id: 1 }
            ])
        }
    }

    const createDivs = () => {
        setDivs([]);
        const number = refNumberOfDivs.current.value;
        setInpitNumber(refNumberOfDivs.current.value);
        for (let i = 0; i < number; i++) {
            setDivs(prev => [
                ...prev, { id: i }
            ])
        }
        createDivsInTime();
    }

    const height = (window.innerWidth / 24) * 5;
    const top = window.innerHeight / 2.3;
    const oneWidth = 100 / inputNumber;

    const offset = Math.floor(((window.innerWidth * 0.16) / (oneWidth * 12)) / 2);

    // console.log(`offset = ${offset}`)

    const currentDate = new Date();
    const currentHours = currentDate.getHours();

    console.log(currentHours)

    const indexInTime = Math.floor((inputNumber / 24) * currentHours);
    // const newDivs = divs.copyWithin(19, 19);
    // console.log(newDivs)
    // setDivsInTime(newDivs);

    let mainColor;
    let secondColor;
    let thirdColor;

    if (currentHours === 0 || currentHours === 1 || currentHours === 2 || currentHours === 3 || currentHours === 4) {
        mainColor = dtheme.dayMode.colors04.main;
        secondColor = dtheme.dayMode.colors04.second;
        thirdColor = dtheme.dayMode.colors04.third;
    } else if (currentHours === 5 || currentHours === 6 || currentHours === 7 || currentHours === 8) {
        mainColor = dtheme.dayMode.colors48.main;
        secondColor = dtheme.dayMode.colors48.second;
        thirdColor = dtheme.dayMode.colors48.third;
    } else if (currentHours === 9 || currentHours === 10 || currentHours === 11 || currentHours === 12) {
        mainColor = dtheme.dayMode.colors812.main;
        secondColor = dtheme.dayMode.colors812.second;
        thirdColor = dtheme.dayMode.colors812.third;
    } else if (currentHours === 13 || currentHours === 14 || currentHours === 15 || currentHours === 16) {
        mainColor = dtheme.dayMode.colors1216.main;
        secondColor = dtheme.dayMode.colors1216.second;
        thirdColor = dtheme.dayMode.colors1216.third;
    } else if (currentHours === 17 || currentHours === 18 || currentHours === 19 || currentHours === 20) {
        mainColor = dtheme.dayMode.colors1620.main;
        secondColor = dtheme.dayMode.colors1620.second;
        thirdColor = dtheme.dayMode.colors1620.third;
    } else if (currentHours === 21 || currentHours === 22 || currentHours === 23) {
        mainColor = dtheme.dayMode.colors2024.main;
        secondColor = dtheme.dayMode.colors2024.second;
        thirdColor = dtheme.dayMode.colors2024.third;
    }

    console.log(mainColor)

    return (
        <>
            <input type="number" required ref={refNumberOfDivs} />
            <button onClick={createDivs}>Set</button>

            {divs.map(div => divs.indexOf(div) === indexInTime ||
                divs.indexOf(div) === indexInTime - 1 ||
                divs.indexOf(div) === indexInTime + 1 ?
                <StyledDiv
                    key={divs.indexOf(div)}
                    index={divs.indexOf(div) - offset}
                    height={height} top={top}
                    oneWidth={oneWidth}
                    zIndex={divs.indexOf(div)}
                    mainColor={mainColor} />
                :
                null
            )}

            {divs.map(div => divs.indexOf(div) === indexInTime - 2 ||
                divs.indexOf(div) === indexInTime + 2 ||
                divs.indexOf(div) === indexInTime - 3 ||
                divs.indexOf(div) === indexInTime + 3 ?
                <StyledDiv2
                    key={divs.indexOf(div)}
                    index={divs.indexOf(div) - offset}
                    height={height} top={top}
                    oneWidth={oneWidth}
                    zIndex={divs.indexOf(div)}
                    secondColor={secondColor} />
                :
                null
            )}

            {divs.map(div => divs.indexOf(div) === indexInTime - 4 ||
                divs.indexOf(div) === indexInTime + 4 ||
                divs.indexOf(div) === indexInTime + 5 ||
                divs.indexOf(div) === indexInTime - 5 ||
                divs.indexOf(div) === indexInTime + 6 ||
                divs.indexOf(div) === indexInTime - 6 ?
                <StyledDiv3
                    key={divs.indexOf(div)}
                    index={divs.indexOf(div) - offset}
                    height={height} top={top}
                    oneWidth={oneWidth}
                    zIndex={divs.indexOf(div)}
                    thirdColor={thirdColor} />
                :
                null
            )}

            {divs.map(div => divs.indexOf(div) === indexInTime - 7 ||
                divs.indexOf(div) === indexInTime + 7 ||
                divs.indexOf(div) === indexInTime + 8 ||
                divs.indexOf(div) === indexInTime - 8 ||
                divs.indexOf(div) === indexInTime + 9 ||
                divs.indexOf(div) === indexInTime - 9 ?
                <StyledDiv4
                    key={divs.indexOf(div)}
                    index={divs.indexOf(div) - offset}
                    height={height} top={top}
                    oneWidth={oneWidth}
                    zIndex={divs.indexOf(div)}
                    thirdColor={thirdColor} />
                :
                null
            )}

            {divsInTime.map(div => (
                <StyledDivDefault key={divsInTime.indexOf(div)} index={divsInTime.indexOf(div) - offset} height={height} top={top} oneWidth={oneWidth} zIndex={divsInTime.indexOf(div)} />
            ))}


        </>
    )
}

export default Dayline;

const StyledDivDefault = styled.div`
    width: 20vw; 
    height: ${props => props.height}px;
    border-radius: 50%;
    background-color: none;

    position: absolute;
    top: ${props => props.top}px;
    left: calc(${props => props.index} * ${p => p.oneWidth}vw); 

    z-index: 1;

    border: 1px solid white; // variable
    opacity: 0.04;
`

const StyledDiv = styled.div`
    border: 1px solid ${p => p.mainColor};

    width: 20vw; 
    height: ${props => props.height}px;
    border-radius: 50%;
    background-color: none;

    position: absolute;
    top: ${props => props.top}px;
    left: calc(${props => props.index} * ${p => p.oneWidth}vw); 

    z-index: ${p => p.zIndex};

    opacity: 0.9;
`
const StyledDiv2 = styled.div`
    border: 1px solid ${p => p.secondColor};

    width: 20vw; 
    height: ${props => props.height}px;
    border-radius: 50%;
    background-color: none;

    position: absolute;
    top: ${props => props.top}px;
    left: calc(${props => props.index} * ${p => p.oneWidth}vw); 

    z-index: ${p => p.zIndex};

    opacity: 0.7;
`

const StyledDiv3 = styled.div`
    border: 1px solid ${p => p.thirdColor};

    width: 20vw; 
    height: ${props => props.height}px;
    border-radius: 50%;
    background-color: none;

    position: absolute;
    top: ${props => props.top}px;
    left: calc(${props => props.index} * ${p => p.oneWidth}vw); 

    z-index: ${p => p.zIndex};

    opacity: 0.5;
`
const StyledDiv4 = styled.div`
    border: 0.7px solid ${p => p.thirdColor};

    width: 20vw; 
    height: ${props => props.height}px;
    border-radius: 50%;
    background-color: none;

    position: absolute;
    top: ${props => props.top}px;
    left: calc(${props => props.index} * ${p => p.oneWidth}vw); 

    z-index: ${p => p.zIndex};

    opacity: 0.3;
`