import Home from './pages/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import { useSelector, useStore } from 'react-redux';
import Profile from './pages/profiles/ProfileSetting';
import AuthHome from './pages/home/AuthHome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_USER_INFO } from './utils/constants';
import axios from 'axios';
import { setUserInfo } from './store/userSlice';
import UserProfile from './pages/profiles/UserProfile';
import Loading from './components/Loading';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;
  return isAuthenticated ? children : <Navigate to='/auth' />;
}

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;
  return isAuthenticated ? <Navigate to='/' /> : children;
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.user.id) {
          dispatch(setUserInfo(response.data));
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (err) {
        dispatch(setUserInfo(undefined));
        console.log('error: ', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (!user) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) {
    return <Loading/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <AuthHome /> : <Home />} />
        <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path='/profile-setting' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='u/:userName' element={<UserProfile />} />
        <Route path='/loading' element={<Loading/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
