import Timer from "./components/Timer";
import Dayline from "./components/dayline.js/Dayline";

import styled from "styled-components";


function App() {

  return (
    <StyledApp>
      <Dayline />
      <Timer />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;

  padding: 6vh 10vw 2vh 10vw;

  // BACKGROUND
  background-color:hsla(240,63%,9%,1);
  background-image:
  radial-gradient(at 40% 20%, hsla(240,100%,11%,1) 0px, transparent 50%),
  radial-gradient(at 0% 100%, hsla(237,71%,16%,1) 0px, transparent 50%),
  radial-gradient(at 80% 100%, hsla(240,63%,29%,1) 0px, transparent 50%),
  radial-gradient(at 0% 0%, hsla(243,47%,39%,1) 0px, transparent 50%);
`