import { configureStore } from "@reduxjs/toolkit";
import divsReducer from '../features/customizer/customizer-slice'
import numberReducer from "../features/number/numberSlice";

export default configureStore({
    reducer: {
        divs: divsReducer,
        number: numberReducer,
    },
});