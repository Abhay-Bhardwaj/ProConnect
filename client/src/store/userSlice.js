import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload?.user;    },
    removeUserInfo: (state) => {
      state.user = null;
      Cookies.remove('jwt', { path: '/' });
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;