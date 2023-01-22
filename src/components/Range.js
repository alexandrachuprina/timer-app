import React from 'react';

function Range({ setRange, range }) {
    return (
        <div>
            <input type="range" value={range} onChange={(e) => setRange(e.target.value)} />
        </div>
    )
}

export default Range