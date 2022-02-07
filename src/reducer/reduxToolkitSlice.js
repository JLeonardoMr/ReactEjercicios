import { createSlice } from "@reduxjs/toolkit";
import { deleteItemCart, deleteItemToCart, fetchCart, fetchProduct, setItemToCart } from '../action/reduxToolkitAction';

//? Creo el slice y le doy un nombre
const useSliceProduct = createSlice({
    //* OJO Sin un nombre no funciona
    name: "product",
    //? luego coloco el initial state y dentro coloco el objeto que contendra la promesa
    initialState: {},
    //? aqui estaran las action en forma de funciones
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.productList = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCart.pending, (state, action) => {
            state.loadingCart = true;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartList = action.payload;
            state.loadingCart = false;
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.error = action.payload;
            state.loadingCart = false;
        })
        builder.addCase(setItemToCart.pending, (state, action) => {
            state.loadingCart = true;
        })
        builder.addCase(setItemToCart.fulfilled, (state, action) => {
            const { data, setProductIsOk, NewProductIsOk } = action.payload;
            const Item = NewProductIsOk
                ? [...data, { ...NewProductIsOk }]
                : data.map(el =>
                    el.id === setProductIsOk.id
                        ? { ...el, quantity: el.quantity + 1 }
                        : el)
            state.cartList = Item;
            state.loadingCart = false;
        })
        builder.addCase(setItemToCart.rejected, (state, action) => {
            state.error = action.payload;
            state.loadingCart = false;
        })
        builder.addCase(deleteItemToCart.pending, (state, action) => {
            state.loadingCart = true;
        })
        builder.addCase(deleteItemToCart.fulfilled, (state, action) => {
            const { data, setProductIsOk, payload } = action.payload;
            const Item = payload
                ? data.filter(el => el.id !== payload.id)
                : data.map(el =>
                    el.id === setProductIsOk.id
                        ? { ...el, quantity: el.quantity - 1 }
                        : el)
            state.cartList = Item
            state.loadingCart = false;
        })
        builder.addCase(deleteItemToCart.rejected, (state, action) => {
            state.error = action.payload;
            state.loadingCart = false;
        })
        builder.addCase(deleteItemCart.pending, (state, action) => {
            state.loadingCart = true;
        })
        builder.addCase(deleteItemCart.fulfilled, (state, action) => {
            const { data, payload } = action.payload;
            state.cartList = data.filter(el => el.id !== payload.id)
            state.loadingCart = false;
        })
        builder.addCase(deleteItemCart.rejected, (state, action) => {
            state.error = action.payload;
            state.loadingCart = false;
        })
    }
})
//! Exporto el slice para mandarlo a store y actions
export default useSliceProduct;

// //* handling pending state
// [fetchData.pending]:(state,action)=>{
//     state.loading = true;
// },
// //* handling fuldilled
// [fetchData.fulfilled]:(state,action)=>{
//     state.productList = action.payload;
//     state.loading = false;
// },
// //* handling rejectin
// [fetchData.rejected]:(state,action)=>{
//     state.error = action.payload;
//     state.loading = false;
// },

// getProductList: (state, action) => {
//     state.products = action.payload;
// },
// getCartList: (state, action) => {
//     state.cart = action.payload;
// },
// setItem: (state, action) => {
//     console.log(state.cart, action.payload);
//     return state.cart
// }