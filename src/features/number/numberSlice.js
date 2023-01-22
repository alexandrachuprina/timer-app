import { createSlice } from "@reduxjs/toolkit";

const NumberSlice = createSlice({
    name: 'number',
    initialState: {
        value: 124
    },
    reducers: {
        storeNumber: (state, action) => {
            state.value = 0;
            state.value = parseInt(action.payload)
        }
    }
})

export const selectInputNumber = (state) => state.number.value;
export const { storeNumber } = NumberSlice.actions;
export default NumberSlice.reducer;