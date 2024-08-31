import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedThread: null,
        chat: [],
    },
    reducers: {
       
        selectThread: (state, action) => {
            state.selectedThread = action.payload;
        },
        setMessages: (state, action) => {
            state.chat = action.payload;
        },
        addMessage: (state, action) => {
            state.chat.push(action.payload);
        },
    },
});

export const { selectThread, setMessages, addMessage} = chatSlice.actions;

export default chatSlice.reducer;