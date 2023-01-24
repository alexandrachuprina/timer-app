import { createSlice } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        value: false,
    },
    reducers: {
        toggleCustomizer: (state, action) => {
            state.value = !state.value
        }
    }
})

export const selectToggle = (state) => state.toggle.value;

export const { toggleCustomizer } = ToggleSlice.actions;

export default ToggleSlice.reducer; 