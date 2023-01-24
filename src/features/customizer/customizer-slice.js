import { createSlice } from "@reduxjs/toolkit";

const DivsSlice = createSlice({
    name: 'divs',
    initialState: {
        value: [],
    },
    reducers: {
        createDivs: (state, action) => {
            state.value = [];
            for (let i = 0; i < action.payload; i++) {
                state.value.push({ id: i })
            }
        }
    }
})

export const selectNumber = (state) => state.divs.value;

export const { createDivs } = DivsSlice.actions;

export default DivsSlice.reducer;

