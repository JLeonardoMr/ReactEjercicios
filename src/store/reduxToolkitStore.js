import { configureStore } from "@reduxjs/toolkit";
import product from "../reducer/reduxToolkitSlice";

export default configureStore({
    reducer:{
        product:product.reducer
    }
});