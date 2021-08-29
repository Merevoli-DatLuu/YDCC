import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
    rooms: [{username: ""}],
    loading: false,
    error: false
};

// export const pushRoom = createAsyncThunk(
//     'chatbot/push',
//     async () => {
//         const res = await axios.post("", );
//         return res.data;
//     }
// );

// export const popRoom = createAsyncThunk(
//     'chatbot/pop',
//     async () => {
//         const res = await axios.post("", );
//         return res.data;
//     }
// );

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        pushRoom: (state, action) => {
            if(state.rooms.length > 0) {
                let index = state.rooms.findIndex((room) => room.username === action.payload.username);
                if(index === -1) state.rooms.push(action.payload);
            }else {
                state.rooms.push(action.payload);
            };
        }
    },
    extraReducers: builder => {}
});

export const {pushRoom} = chatbotSlice.actions;

export const selectRooms = (state: RootState) => state.chatbot.rooms;

export default chatbotSlice.reducer;