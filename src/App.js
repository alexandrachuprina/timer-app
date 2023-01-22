import Timer from "./components/Timer";
import Dayline from "./components/Dayline";
import Range from "./components/Range";

import styled from "styled-components";
import { useState } from "react";


function App() {
  const [range, setRange] = useState(100)

  const w = window.clientWidth - window.scrollX;
  return (
    <StyledApp range={range} w={w}>
      <Dayline range={range} />
      <Timer />
      {/* <Range range={range} setRange={setRange} /> */}
    </StyledApp>
  );
}

export default App;


const StyledApp = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: ${p => p.range}vw;
  /* width: ${w => w.w}vw; */

  padding: 6vh 10vw 0vh 10vw;

  // BACKGROUND
  background-color:hsla(240,63%,9%,1);
  background-image:
  radial-gradient(at 40% 20%, hsla(240,100%,11%,1) 0px, transparent 50%),
  radial-gradient(at 0% 100%, hsla(237,71%,16%,1) 0px, transparent 50%),
  radial-gradient(at 80% 100%, hsla(240,63%,29%,1) 0px, transparent 50%),
  radial-gradient(at 0% 0%, hsla(243,47%,39%,1) 0px, transparent 50%);
`