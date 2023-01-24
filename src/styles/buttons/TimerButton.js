import styled from "styled-components";

export const TimerButton = styled.button`
margin: 0;
  border: 2px solid white;
  background-color: transparent;
  border-radius: 30px;
  color: white;
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
  opacity: 0.3;

  height: 40px;
  width: 10vw;

  :hover {
      opacity: 0.7;
  }
`