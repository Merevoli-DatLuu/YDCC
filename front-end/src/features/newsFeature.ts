import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

const NEWS_API_KEY = "7a79ddfb69a14711b75712c33236e169";

const initialState = {
    news: {
        status: "",
        totalResults: 0,
        articles: [{
            source: {
                id: null,
                name: ""
            },
            author: null,
            title: "",
            description: "",
            url: "",
            urlToImage: "",
            publishedAt: "",
            content: ""
        }]
    },
    loading: false,
    error: false
};

export const getNews = createAsyncThunk(
    'news/getNews',
    async (category: string = "health") => {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`);
        return res.data;
    }
);

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getNews.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getNews.fulfilled, (state, action) => {
                return {...state, loading: false, news: action.payload};
            })
            .addCase(getNews.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

export const selectNews = (state: RootState) => state.news.news;

export default newsSlice.reducer;