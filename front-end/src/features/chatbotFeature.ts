import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    rooms: [
        
    ],
    loading: false,
    error: false
};

export const pushRoom = createAsyncThunk(
    'chatbot/push',
    async () => {
        const res = await axios.post("", );
        return res.data;
    }
);

export const popRoom = createAsyncThunk(
    'chatbot/pop',
    async () => {
        const res = await axios.post("", );
        return res.data;
    }
);

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
});

export const selectRooms = (state: RootState) => state.chatbot.rooms;

export default chatbotSlice.reducer;