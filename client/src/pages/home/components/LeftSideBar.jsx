import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Users, MessageSquare, Briefcase, Settings, User } from 'lucide-react';

export default function LeftSideBar() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: "Profile", path: /u/ },
    { icon: <Users className="w-5 h-5" />, label: "Connections", path: "/connections" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", path: "/chats/threads/" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Jobs", path: "/jobs" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/profile-setting" }
  ];

  return (
    <div className='w-full lg:w-1/5 flex flex-col space-y-4'>
      {/* Profile Card */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='flex flex-col items-center text-center space-y-4'>
          <div className='relative'>
            <img 
              src={user?.image || '/assets/defaultUserDP.jpg'} 
              alt='profile' 
              className='rounded-full h-24 w-24 object-cover border-4 border-white shadow-lg'
            />
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
          </div>
          <div>
            <h2 className='font-bold text-lg text-gray-900'>{user?.firstName} {user?.lastName}</h2>
            <p className='text-sm text-gray-600 mt-1'>{user?.headline || 'Professional'}</p>
            <p className='text-xs text-gray-500 mt-1'>{user?.location || 'Location not set'}</p>
          </div>
          
          <div className='w-full border-t border-gray-200 pt-4'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm text-gray-600'>Connections</span>
              <span className='text-sm font-semibold text-gray-900'>{user?.followers?.length || 0}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-600'>Following</span>
              <span className='text-sm font-semibold text-gray-900'>{user?.following?.length || 0}</span>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/profile-setting')}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white'
            size="sm"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4'>
        <h3 className='font-semibold text-gray-900 mb-4'>Navigation</h3>
        <nav className='space-y-2'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className='w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 transition-colors group'
            >
              <div className='text-gray-500 group-hover:text-blue-600 transition-colors'>
                {item.icon}
              </div>
              <span className='text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4'>
        <h3 className='font-semibold text-gray-900 mb-4'>This Week</h3>
        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>Profile Views</span>
            <span className='text-sm font-semibold text-gray-900'>0</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>New Connections</span>
            <span className='text-sm font-semibold text-gray-900'>0</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>Messages</span>
            <span className='text-sm font-semibold text-gray-900'>0</span>
          </div>
        </div>
      </div>

      {/* ProConnect Premium */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white'>
        <h3 className='font-semibold mb-2'>ProConnect Premium</h3>
        <p className='text-sm opacity-90 mb-3'>
          Unlock advanced features and grow your network faster
        </p>
        <Button 
          variant="secondary" 
          size="sm"
          className='w-full bg-white text-blue-600 hover:bg-gray-100'
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  )
}
