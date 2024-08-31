import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import { useSelector, useStore } from 'react-redux';
import Profile from './pages/profiles/ProfileSetting';
import AuthHome from './pages/home/AuthHome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_USER_INFO } from './utils/constants';
import { setUserInfo } from './store/userSlice';
import UserProfile from './pages/profiles/UserProfile';
import Loading from './components/Loading';
import ChatsContainer from './pages/chats/ChatsContainer';
import { apiClient } from './lib/api-client';
import JobCreate from './pages/jobs/admin/JobCreate';
import ImageEdit from './components/ImageEdit';
import JobDashBoard from './pages/jobs/admin/JobDashBoard';
import JobsPage from './pages/jobs/client/JobsPage';
import JobDetailsAdmin from './pages/jobs/admin/JobDetailsAdmin';
import ConnectionsPage from './pages/connections/ConnectionsPage';
import AddConnections from './pages/connections/AddConnections';

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
        const response = await apiClient.get(GET_USER_INFO);
        if (response.status === 200 && response.data.user.id) {
          dispatch(setUserInfo(response.data));
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (err) {
        dispatch(setUserInfo(undefined));
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
      <Routes>
        <Route path='/' element={<PrivateRoute> <Profile/></PrivateRoute>} />
        <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path='/profile-setting' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='u/:userName' element={<UserProfile />} />
        <Route path='/chats/threads/' element={<PrivateRoute><ChatsContainer/></PrivateRoute>} />
        <Route path='/chats/threads/:id' element={<PrivateRoute><ChatsContainer/></PrivateRoute>} />
        <Route path='/jobs/' element={<JobsPage/>}/>
        <Route path='/talent/post-a-job' element={<PrivateRoute><JobCreate/></PrivateRoute>}/>
        <Route path='/talent/dashboard' element={<PrivateRoute><JobDashBoard/></PrivateRoute>}/>
        <Route path='/image' element={<ImageEdit/>}/>
        <Route path='/talent/dashboard' element={<JobDashBoard/>}/>
        <Route path='/talent/dashboard/jobdetail/:id' element={<JobDetailsAdmin/>}/>
        <Route path='/connections' element={<ConnectionsPage/>}/>
        <Route path='/connections/search' element={<AddConnections/>}/>
        {/* <Route path='*' element={<Navigate to='/' />} /> */}
      </Routes>
  );
}

export default App;
