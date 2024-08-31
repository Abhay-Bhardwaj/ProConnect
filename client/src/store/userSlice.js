import { apiClient } from '@/lib/api-client';
import { LOGOUT_ROUTE } from '@/utils/constants';
import { createSlice, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const initialState = {
  user: null,
  currentChat: null,
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
    setOtherUser: (state, action) => {
      state.currentChat = action.payload?.otherUser;
    },
    removeOtherUser: (state) => {
      state.currentChat = null;
    },

  },
});

export const { setUserInfo, removeUserInfo, setOtherUser, removeOtherUser } = userSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
    Cookies.remove('jwt', { path: '/', secure: true, sameSite:'none'});
    dispatch(removeUserInfo());
    setTimeout(() => {
      toast.success('Logged out successfully');
    }, 1000);
    window.location.reload(false);
    
  } catch (error) {
    console.error('Error logging out', error);
  }
};




export default userSlice.reducer;