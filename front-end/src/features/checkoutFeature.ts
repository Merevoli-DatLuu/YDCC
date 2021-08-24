import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    checkout: {
        "username": "",
        "name": "",
        "date_of_birth": "",
        "email": "",
        "phone": "",
        "cash": 0
    },
    loading: false,
    error: false
};

export const processToCheckOut = createAsyncThunk(
    'checkout/checkout',
    async (props: {username: string, name: string, date_of_birth: string, email: string, phone: string, cash: number}) => {
        const formatCheckout = {
            "username": props.username, 
            "name": props.name, 
            "date_of_birth": props.date_of_birth, 
            "email": props.email, 
            "phone": props.phone, 
            "cash": props.cash
        }
        console.log(formatCheckout);
        // const res = await axios.post("", formatCheckout);
        // return res.data;
    }
);

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // builder
        //     .addCase(processToCheckOut.pending, (state) => {
        //         return {...state, loading: true};
        //     })
        //     .addCase(processToCheckOut.fulfilled, (state, action) => {
        //         return {...state, loading: false, checkout: action.payload};
        //     })
        //     .addCase(processToCheckOut.rejected, (state) => {
        //         return {...state, loading: false, error: true};
        //     })
    }
});

export const selectCheckout = (state: RootState) => state.checkout.checkout;

export default checkoutSlice.reducer;