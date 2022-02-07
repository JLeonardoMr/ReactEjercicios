import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
    "products",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const res = await fetch(payload);
        if (!res.ok) return rejectWithValue(res)
        let data = await res.json();
        return data
    }
)
export const fetchCart = createAsyncThunk(
    "cart",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const res = await fetch(payload);
        if (!res.ok) return rejectWithValue(res)
        let data = await res.json();
        return data
    }
)
export const setItemToCart = createAsyncThunk(
    "setItemToCart",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const headers = { 'Content-type': 'application/json; charset=UTF-8' };
        const res = await fetch("http://localhost:5000/cart/");
        if (!res.ok) return rejectWithValue(res);
        let data = await res.json();
        const isProduct = data.find(el => el.id === payload.id);
        if (isProduct) {
            let options = {
                method: 'PUT',
                body: JSON.stringify({
                    id: isProduct.id,
                    title: isProduct.title,
                    quantity: isProduct.quantity + 1
                }),
                headers
            };
            let setProductIs = await fetch(`http://localhost:5000/cart/${isProduct.id}`, options);
            if (!setProductIs.ok) return rejectWithValue(setProductIs);
            let setProductIsOk = await setProductIs.json();
            return { setProductIsOk, data }
        } else {
            let options = {
                method: 'POST',
                body: JSON.stringify({
                    id: payload.id,
                    title: payload.title,
                    quantity: 1
                }),
                headers
            };
            let setProductIs = await fetch("http://localhost:5000/cart/", options);
            if (!setProductIs.ok) return rejectWithValue(setProductIs);
            let NewProductIsOk = await setProductIs.json();
            return { NewProductIsOk, data }
        }
    }
)
export const deleteItemToCart = createAsyncThunk(
    "deleteItemToCart",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const headers = { 'Content-type': 'application/json; charset=UTF-8' };
        const res = await fetch("http://localhost:5000/cart/");
        if (!res.ok) return rejectWithValue(res);
        let data = await res.json();
        const isProduct = data.find(el => el.id === payload.id);
        if (isProduct.quantity > 1) {
            let options = {
                method: 'PUT',
                body: JSON.stringify({
                    id: isProduct.id,
                    title: isProduct.title,
                    quantity: isProduct.quantity - 1
                }),
                headers
            };
            let setProductIs = await fetch(`http://localhost:5000/cart/${isProduct.id}`, options);
            if (!setProductIs.ok) return rejectWithValue(setProductIs);
            let setProductIsOk = await setProductIs.json();
            return { setProductIsOk, data }
        } else {
            let options = { method: 'DELETE' };
            let setProductIs = await fetch(`http://localhost:5000/cart/${isProduct.id}`, options);
            if (setProductIs.ok) return { payload, data }
            return rejectWithValue(setProductIs);
        }
    }
)
export const deleteItemCart = createAsyncThunk(
    "deleteItemCart",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const res = await fetch("http://localhost:5000/cart/");
        if (!res.ok) return rejectWithValue(res);
        let data = await res.json();
        const isProduct = data.find(el => el.id === payload.id);
        if (isProduct) {
            let options = { method: 'DELETE' };
            let setProductIs = await fetch(`http://localhost:5000/cart/${isProduct.id}`, options);
            if (setProductIs.ok) return { payload, data }
            return rejectWithValue(setProductIs);

        }
    }
)