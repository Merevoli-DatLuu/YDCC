import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../app/store';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51JS26KKs4ktnTfQveIZvVtgDG6P7sX57szVRH3ZIVmtKIcSlKG3OADWbtIWJXqxJTZfiBVh2p7b6lGkmmtntULbp00SFW0XneC");

const initialState = {
    // id: "",
    loading: false,
    error: false
};

export const processToCheckOut = createAsyncThunk(
    'checkout/checkout',
    async (props: {username: string, name: string, date_of_birth: string, email: string, phone: string, cash: number}) => {
        const stripe = await stripePromise;
        // let result = {sessionId: ""};
        const checkoutSession = await axios.post("http://localhost:8000/api/v1/payment/create-checkout-session", {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: props.username
                },
                unit_amount: props.cash
            },
            description: props.name,
            quantity: 1
        },)
            // .then(res => {
            //     result = res.data;
            // })
            // .catch(error => console.log(error.message));
        const resultCheckout = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.sessionId
        });
        return resultCheckout;
    }
);

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(processToCheckOut.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(processToCheckOut.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(processToCheckOut.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

// export const selectCheckout = (state: RootState) => state.checkout.id;

export default checkoutSlice.reducer;