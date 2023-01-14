import { useState, useEffect } from "react";

const useCountdown = ({
    countDownStarted,
    timeInSec,
    setTimeInSec,
    setCountDownStarted
}) => {

    // console.log(`       HOOK         `)
    // console.log(`timeInSec ${timeInSec}`)

    const [countdownInSec, setCountdownInSec] = useState(0);

    // console.log(`countdownInSec ${countdownInSec}`)

    useEffect(() => {
        let interval;
        if (timeInSec > 0) {
            let currentTime = timeInSec - 1;

            // console.log(`currentTime ${currentTime}`)

            interval = setInterval(() => {
                setCountdownInSec(currentTime);
                setTimeInSec(timeInSec - 1)
                // alert('Hi')
            }, 1000);
        } else if (!countDownStarted) {
            clearInterval(interval);
            setCountdownInSec(0)
        } else if (timeInSec === 0) {
            setCountDownStarted(!countDownStarted)
        }
        return () => clearInterval(interval);
    }, [countdownInSec, countDownStarted])


    const minutes = Math.floor(countdownInSec / 60);
    const seconds = parseInt((countdownInSec % 60));

    return [minutes, seconds];
}

export { useCountdown };