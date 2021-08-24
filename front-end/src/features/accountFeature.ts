import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    user: {
        "username": "",
        "name": "",
        "date_of_birth": "",
        "email": "",
        "phone": "",
        "picture": null,
        "is_staff": false,
        "date_joined": "",
        "last_login": ""
    },
    loading: false,
    error: false
};

export const getInfo = createAsyncThunk(
    'account/getInfo',
    async (access_token: string) => {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/user/me", {headers: {
            Authorization: 'Bearer ' + access_token
          }});
        return res.data;
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder 
            .addCase(getInfo.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                localStorage.setItem("YDCC_account", JSON.stringify(action.payload));
                return {...state, loading: false, user: action.payload};
            })
            .addCase(getInfo.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    },
});

export const selectUser = (state: RootState) => state.user.user; 

export default accountSlice.reducer;