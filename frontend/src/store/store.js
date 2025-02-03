import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../slice/stockSlice"

export default configureStore({
    reducer: {
        stock: stockReducer,
    }
})