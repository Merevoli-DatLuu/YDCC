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
    BHYT: [{
        "id": 0,
        "name": "",
        "date_of_birth": "",
        "address": "",
        "health_insurance_id": "",
        "licensing_authorities": "",
        "expiry_date": "",
        "picture": "",
        "mi5cy_date": "",
        "qr_code": "",
        "identity_id": "",
        "card_type": "",
        "hospital_id": 0,
        "hospital_name": ""
    }],
    benefit: [{
        "level_1": "",
        "level_2": "",
        "level_3": "",
        "level_4": ""
    }],
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

export const getBHYTInfo = createAsyncThunk(
    'account/getBHYTInfo',
    async (access_token: string) => {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/health_insurance/get_01/", {headers: {
            Authorization: 'Bearer ' + access_token
        }});
        return res.data;
    }
);

export const getBenefit = createAsyncThunk(
    'account/getBenefit',
    async (access_token: string) => {
        const res = await axios.get(" http://127.0.0.1:8000/api/v1/health_insurance/benefit_information/", {headers: {
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
            .addCase(getBHYTInfo.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getBHYTInfo.fulfilled, (state, action) => {
                localStorage.setItem("YDCC_account", JSON.stringify(action.payload));
                return {...state, loading: false, BHYT: action.payload};
            })
            .addCase(getBHYTInfo.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
            .addCase(getBenefit.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getBenefit.fulfilled, (state, action) => {
                localStorage.setItem("YDCC_account", JSON.stringify(action.payload));
                return {...state, loading: false, benefit: action.payload};
            })
            .addCase(getBenefit.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    },
});

export const selectUser = (state: RootState) => state.user.user; 
export const selectBHYT = (state: RootState) => state.user.BHYT; 
export const selectBenefit = (state: RootState) => state.user.benefit; 

export default accountSlice.reducer;