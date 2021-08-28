import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authFeature';
import accountReducer from '../features/accountFeature';
import checkoutReducer from '../features/checkoutFeature';
import chatbotReducer from '../features/chatbotFeature';
import searchReducer from '../features/searchFeature';
import newsReducer from '../features/newsFeature';
import hospitalReducer from '../features/heathRecordsFeature';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: accountReducer,
    checkout: checkoutReducer,
    chatbot: chatbotReducer,
    search: searchReducer,
    news: newsReducer,
    hospital: hospitalReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
