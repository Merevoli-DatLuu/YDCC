import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
    phone: "",
    idBHYT: "",
    password: ""
};

export const authLogin = createAsyncThunk(
    'auth/login',
    async (props: {idBHYT: string, password: string}) => {
        console.log(props.idBHYT + " - " + props.password);
    }
);

export const authRegister = createAsyncThunk(
    'auth/register',
    async (props: {phone: string, idBHYT: string, password: string}) => {
        console.log(props.phone + " - " + props.idBHYT + " - " + props.password);
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;