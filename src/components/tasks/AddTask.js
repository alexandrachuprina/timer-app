import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledAddForm = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
`
const StyledAdd = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 0.5rem;
`

export default function AddTask({ handleAddTask }) {
    const [text, setText] = useState('');

    return (
        <StyledAddForm>
            <StyledAdd>
                <input
                    id="AddTaskForm"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={() => {
                        setText('');
                        handleAddTask(text)
                    }}
                >Add task</button >
            </StyledAdd>
        </StyledAddForm>
    )
}
