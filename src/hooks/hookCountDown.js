import { useState, useEffect } from "react";

const useCountdown = ({
    countDownStarted,
    timeInMilliSec
}) => {

    // console.log(`       NEW         `)
    // console.log(`timeInMilliSec ${timeInMilliSec}`)

    // const CountDown = new Date().getTime() + timeInMilliSec;
    const [countdownInMilliSec, setCountdownInMillisec] = useState(CountDown - new Date().getTime());

    // console.log(`CountDown ${CountDown}`)
    // console.log(`countdownInMilliSec ${countdownInMilliSec}`)

    useEffect(() => {
        let interval;
        if (timeInMilliSec > 0) {
            let currentTime = CountDown - new Date().getTime();
            // console.log(`currentTime ${currentTime}`)
            interval = setInterval(() => {
                setCountdownInMillisec(currentTime)
            }, 1000);
        } else if (!countDownStarted) {
            clearInterval(interval);
            setCountdownInMillisec(0)
        }
        return () => clearInterval(interval);
    }, [countDownStarted, timeInMilliSec, CountDown, countdownInMilliSec])

    const minutes = Math.floor(countdownInMilliSec / (60 * 1000));
    const seconds = parseInt(((countdownInMilliSec % (60 * 1000)) / 1000));

    return [minutes, seconds];
}

export { useCountdown };