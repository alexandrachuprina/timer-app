import styled from "styled-components";

export const MainInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance:none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  border-radius: 30px;
  box-sizing: border-box;
  margin-left: 2vh;
  width: 40%;
  height: 110%;
  border: 2px solid white;
  outline: none;
  outline-offset: none;
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.2;

  &:hover {
      opacity: 0.5;
  }

  &:focus {
      opacity: 0.7;
      color: black;
      outline: none;
      outline-offset: none;
  }
`