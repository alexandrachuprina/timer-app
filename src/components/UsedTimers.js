import React from 'react';

export default function UsedTimers({ timeInputs }) {
    return (

        timeInputs.map(input => {
            return <div key={input}>{input} minutes</div>;
        })
    )
}
