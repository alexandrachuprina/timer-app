import Timer from "./components/Timer";
import styled from "styled-components";
import Pointer from "./components/Pointer";
import CurrentTime from './components/CurrentTime'

function App() {
  return (
    <StyledApp>
      <Pointer />
      {/* <CurrentTime /> */}
      <Timer />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;

    padding: 20vh 40vw 20vh 40vw;
`