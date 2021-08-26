import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const initialState = {
    searchResults: [
        
    ],
    loading: false,
    error: false
};

export const searchItem = createAsyncThunk(
    'search/searchItem',
    async (keyword: string) => {
        const res = await axios.get("");
        return res.data;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(searchItem.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(searchItem.fulfilled, (state, action) => {
                return {...state, loading: false, searchResults: action.payload};
            })
            .addCase(searchItem.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

export const selectSearchResult = (state: RootState) => state.search.searchResults;

export default searchSlice.reducer;