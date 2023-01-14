import React from 'react';

export default function UsedTimers({ timeInputs }) {
    const dateWithouthSecond = new Date();
    const log = dateWithouthSecond.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        timeInputs.map(input => {
            return <div key={input}><p>You worked for {input === 1 ? <>{input} minute</> : <>{input} minutes</>} {log}</p></div>;
        })
    )
}
