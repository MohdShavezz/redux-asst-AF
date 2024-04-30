import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";


export const store = configureStore({
    reducer:{
        product:productReducer
    },
},)
// window.__REDUX_DEVTOOLS_EXTENSION__?.()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
