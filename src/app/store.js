import { configureStore } from "@reduxjs/toolkit";
import divsReducer from '../features/customizer/customizer-slice'
import numberReducer from "../features/number/numberSlice";
import toggleReducer from '../features/toggle/toggleSlice'

export default configureStore({
    reducer: {
        divs: divsReducer,
        number: numberReducer,
        toggle: toggleReducer,
    },
});

