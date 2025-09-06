import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Users, MessageSquare, Briefcase, TrendingUp, Calendar, Bell } from 'lucide-react';
import LeftSideBar from './components/LeftSideBar';

export default function AuthHome() {
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();

    const quickActions = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Find Connections",
            description: "Connect with professionals in your field",
            action: () => navigate('/connections/search'),
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: "Browse Jobs",
            description: "Discover new opportunities",
            action: () => navigate('/jobs'),
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Messages",
            description: "Chat with your connections",
            action: () => navigate('/chats/threads/'),
            color: "bg-purple-500 hover:bg-purple-600"
        }
    ];


    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='flex flex-col lg:flex-row gap-6 p-4'>
                <LeftSideBar/>
                
                <main className='flex-1 lg:w-3/5 space-y-6'>
                    {/* Welcome Section */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-900'>
                                    Welcome back, {user?.firstName}! 
                                </h1>
                                <p className='text-gray-600 mt-1'>
                                    Here's what's happening in your professional network today
                                </p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Button variant="outline" size="sm">
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notifications
                                </Button>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                            <div className='bg-blue-50 rounded-lg p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-blue-600 font-medium'>Connections</p>
                                        <p className='text-2xl font-bold text-blue-900'>{user?.followers?.length || 0}</p>
                                    </div>
                                    <Users className='w-8 h-8 text-blue-500' />
                                </div>
                            </div>
                            <div className='bg-green-50 rounded-lg p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-green-600 font-medium'>Following</p>
                                        <p className='text-2xl font-bold text-green-900'>{user?.following?.length || 0}</p>
                                    </div>
                                    <TrendingUp className='w-8 h-8 text-green-500' />
                                </div>
                            </div>
                            <div className='bg-purple-50 rounded-lg p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-purple-600 font-medium'>Profile Views</p>
                                        <p className='text-2xl font-bold text-purple-900'>0</p>
                                    </div>
                                    <Calendar className='w-8 h-8 text-purple-500' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-4'>Quick Actions</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className={action.color + ' text-white rounded-lg p-4 text-left transition-all duration-200 hover:shadow-md'}
                                >
                                    <div className='mb-2'>{action.icon}</div>
                                    <h3 className='font-semibold mb-1'>{action.title}</h3>
                                    <p className='text-sm opacity-90'>{action.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Network Insights */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-4'>Network Insights</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white'>
                                <h3 className='font-semibold mb-2'>Grow Your Network</h3>
                                <p className='text-sm opacity-90 mb-4'>
                                    Connect with 5 new professionals this week to expand your reach
                                </p>
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => navigate('/connections/search')}
                                    className='bg-white text-blue-600 hover:bg-gray-100'
                                >
                                    Find Connections
                                </Button>
                            </div>
                            <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white'>
                                <h3 className='font-semibold mb-2'>Update Your Profile</h3>
                                <p className='text-sm opacity-90 mb-4'>
                                    Keep your profile fresh with recent achievements and skills
                                </p>
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => navigate('/profile-setting')}
                                    className='bg-white text-green-600 hover:bg-gray-100'
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
                
                <div className='lg:w-1/5 hidden lg:block space-y-6'>
                    {/* Right Sidebar Content */}
                    

                    
                </div>
            </div>
        </div>
    )
}
