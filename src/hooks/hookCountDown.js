import { useState, useEffect } from "react";

const useCountdown = ({
    countDownStarted,
    timeInSec
}) => {

    console.log(`       NEW         `)
    console.log(`timeInSec ${timeInSec}`)

    // const CountDown = new Date().getTime() + timeInMilliSec;
    const [countdownInSec, setCountdownInSec] = useState(timeInSec);

    // console.log(`CountDown ${CountDown}`)
    console.log(`countdownInSec ${countdownInSec}`)

    useEffect(() => {
        let interval;
        if (timeInSec > 0) {
            let currentTime = timeInSec - 1000;

            console.log(`currentTime ${currentTime}`)

            interval = setInterval(() => {
                setCountdownInSec(currentTime)
            }, 1000);
        } else if (!countDownStarted) {
            clearInterval(interval);
            setCountdownInSec(0)
        }
        return () => clearInterval(interval);
    }, [])

    const minutes = Math.floor(countdownInSec / 60);
    const seconds = parseInt((countdownInSec % (60 * 1000)));

    return [minutes, seconds];
}

export { useCountdown };