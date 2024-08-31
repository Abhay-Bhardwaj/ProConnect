import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '',
        searchResults: [],
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
    },
});

export const { setSearchTerm, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;