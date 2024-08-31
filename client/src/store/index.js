// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    search: searchReducer,
  },
});

export default store;