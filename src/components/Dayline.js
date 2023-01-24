import styled from 'styled-components';
import { useColors } from '../hooks/hookChangeColors';
import { selectNumber } from '../features/customizer/customizer-slice';
import { useSelector } from 'react-redux';
import { selectInputNumber } from '../features/number/numberSlice';

function Dayline({ range }) {
  const divsNumber = useSelector(selectNumber)
  const inputNumber = useSelector(selectInputNumber)

  const height = window.innerWidth * 0.2;

  const top = window.innerHeight / 2.3;
  const oneWidth = range / inputNumber;

  const offset = Math.floor(((window.innerWidth * 0.16) / (oneWidth * 12)) / 2);


  const currentDate = new Date();
  const currentHours = currentDate.getHours();

  const indexInTime = Math.floor((inputNumber / 24) * currentHours);


  const [mainColor, secondColor, thirdColor] = useColors({ currentHours });


  return (
    <>
      {divsNumber.map(div => divsNumber.indexOf(div) === indexInTime ||
        divsNumber.indexOf(div) === indexInTime - 1 ||
        divsNumber.indexOf(div) === indexInTime + 1 ?
        <StyledDiv
          key={divsNumber.indexOf(div)}
          index={divsNumber.indexOf(div) - offset}
          height={height}
          top={top}
          oneWidth={oneWidth}
          zIndex={divsNumber.indexOf(div)}
          mainColor={mainColor} />
        :
        null
      )}

      {divsNumber.map(div => divsNumber.indexOf(div) === indexInTime - 2 ||
        divsNumber.indexOf(div) === indexInTime + 2 ||
        divsNumber.indexOf(div) === indexInTime - 3 ||
        divsNumber.indexOf(div) === indexInTime + 3 ?
        <StyledDiv2
          key={divsNumber.indexOf(div)}
          index={divsNumber.indexOf(div) - offset}
          height={height}
          top={top}
          oneWidth={oneWidth}
          zIndex={divsNumber.indexOf(div)}
          secondColor={secondColor} />
        :
        null
      )}

      {divsNumber.map(div => divsNumber.indexOf(div) === indexInTime - 4 ||
        divsNumber.indexOf(div) === indexInTime + 4 ||
        divsNumber.indexOf(div) === indexInTime + 5 ||
        divsNumber.indexOf(div) === indexInTime - 5 ||
        divsNumber.indexOf(div) === indexInTime + 6 ||
        divsNumber.indexOf(div) === indexInTime - 6 ?
        <StyledDiv3
          key={divsNumber.indexOf(div)}
          index={divsNumber.indexOf(div) - offset}
          height={height}
          top={top}
          oneWidth={oneWidth}
          zIndex={divsNumber.indexOf(div)}
          thirdColor={thirdColor} />
        :
        null
      )}

      {divsNumber.map(div => divsNumber.indexOf(div) === indexInTime - 7 ||
        divsNumber.indexOf(div) === indexInTime + 7 ||
        divsNumber.indexOf(div) === indexInTime + 8 ||
        divsNumber.indexOf(div) === indexInTime - 8 ||
        divsNumber.indexOf(div) === indexInTime + 9 ||
        divsNumber.indexOf(div) === indexInTime - 9 ?
        <StyledDiv4
          key={divsNumber.indexOf(div)}
          index={divsNumber.indexOf(div) - offset}
          height={height}
          top={top}
          oneWidth={oneWidth}
          zIndex={divsNumber.indexOf(div)}
          thirdColor={thirdColor} />
        :
        null
      )}

      {divsNumber.map(div => (
        <StyledDivDefault
          key={divsNumber.indexOf(div)}
          index={divsNumber.indexOf(div) - offset}
          height={height}
          top={top}
          oneWidth={oneWidth}
          zIndex={divsNumber.indexOf(div)}
          range={range} />
      ))}
    </>
  )
}

export default Dayline;

const StyledDivDefault = styled.div`
  width: calc(${p => p.range} * 0.2vw); 
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

  z-index: 1;

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

  z-index: 1;

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

  z-index: 1;

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

  z-index: 1;

  opacity: 0.3;
`