import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    hospitalList: [],
    hospitalInfo: {
        "id": 0,
        "name": "",
        "address": "",
        "license_id": "",
        "license_date": "",
        "status": "",
        "type": "",
        "head_certificate": "",
        "x_pos": 0,
        "y_pos": 0
    },
    loading: false,
    error: false
};

export const getHospitals = createAsyncThunk(
    'hospital/getHospitals',
    async (access_token: string) => {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/health_insurance/healthy_record/", {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
        return res.data;
    }
);

export const getHospital = createAsyncThunk(
    'hospital/getHospital',
    async (props: {access_token: string, id: string}) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/health_insurance/hospital/${props.id}`, {
            headers: {
                Authorization: 'Bearer ' + props.access_token
            }
        });
        return res.data;
    }
);

export const hospitalSlice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getHospitals.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getHospitals.fulfilled, (state, action) => {
                return {...state, loading: false, hospitalList: action.payload};
            })
            .addCase(getHospitals.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
            .addCase(getHospital.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getHospital.fulfilled, (state, action) => {
                return {...state, loading: false, hospitalInfo: action.payload};
            })
            .addCase(getHospital.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

export const selectHospitals = (state: RootState) => state.hospital.hospitalList;
export const selectHospital = (state: RootState) => state.hospital.hospitalInfo;

export default hospitalSlice.reducer;