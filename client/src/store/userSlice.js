import { LOGOUT_ROUTE } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload?.user;    
    },
    removeUserInfo: (state) => {
      state.user = null;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    await axios.post(LOGOUT_ROUTE, {}, { withCredentials: true });
    Cookies.remove('jwt', { path: '/', secure: true, sameSite:'none'});
    dispatch(removeUserInfo());
  } catch (error) {
    console.error('Error logging out', error);
  }
};




export default userSlice.reducer;