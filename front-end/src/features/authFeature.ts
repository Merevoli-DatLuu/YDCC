import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    register: {
        detail: ""
    },
    login: {
        access_token: "",
        refresh_token: "",
        user: {
            pk: 0,
            username: ""
        },
    },
    // userRegister: {
    //     idBHYT: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     name: "",
    //     dateOfBirth: "",
    //     phone: ""
    // },
    // userLogin: {
    //     username: "",
    //     password: ""
    // },
    loading: false,
    error: false
};

export const authLogin = createAsyncThunk(
    'auth/login',
    async (props: {idBHYT: string, password: string}) => {
        const user = {"username": props.idBHYT, "password": props.password};
        const res = await axios.post("http://127.0.0.1:8000/api/v1/user/login", user);
        return res.data;
    }
);

export const authRegister = createAsyncThunk(
    'auth/register',
    async (props: {
            idBHYT: string, 
            email: string, 
            password: string, 
            confirmPassword: string, 
            name: string, 
            dateOfBirth: string, 
            phone: string
        }) => {
        const newUser = {
            "username": props.idBHYT,
            "email": props.email,
            "password1": props.password,
            "password2": props.confirmPassword,
            "name": props.name,
            "date_of_birth": props.dateOfBirth,
            "phone": props.phone
        };
        const res = await axios.post("http://127.0.0.1:8000/api/v1/user/register", newUser);
        return res.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogout: (state, action) => {
            return {...state, login: action.payload};
        },
    },
    extraReducers: builder => {
        builder
            .addCase(authRegister.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                return {...state, loading: false, register: action.payload};
            })
            .addCase(authRegister.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
            .addCase(authLogin.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                return {...state, loading: false, login: action.payload};
            })
            .addCase(authLogin.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

export const {userLogout} = authSlice.actions;

export const selectAuthLogin = (state: RootState) => state.auth.login;
export const selectAuthRegister = (state: RootState) => state.auth.register;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;