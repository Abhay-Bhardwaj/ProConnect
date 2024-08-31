import { apiClient } from '@/lib/api-client';
import { GET_ALL_USERS } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddConnections() {
    const { searchTerm } = useSelector((state) => state.search);
    const {user}= useSelector((state)=>state.user);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    console.log('User:', user);
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await apiClient.get(GET_ALL_USERS);
                console.log('Connections:', res.data);
                setUsers(res.data);
            } catch (err) {
                console.log('Error:', err.message);
            }
        };
        fetchConnections();
    }, []);

    useEffect(() => {
        console.log('Search:', searchTerm);
        if (searchTerm) {
            const filtered = users.filter(item =>
                (item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchTerm.toLowerCase())) && (user && item._id!==user.id)
            );
            setFilteredUsers(filtered);
        } else {
            const filtered = users.filter(item =>
                item._id!==user.id
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    return (
        <div className='p-2'>
            <div className='max-w-3xl bg-white mx-auto rounded-lg p-2'>
                <p>Total Results: {filteredUsers.length}</p>
                <hr />
                <div>
                    {filteredUsers.map((user, index) => (
                        <div key={index} className='flex items-center justify-between p-2 border-b-2'>
                            <a href={`/u/${user.userName}`} title='View Profile'>
                                <div className='flex items-center'>
                                    <img src={user.image} alt='profile' className='w-10 h-10 rounded-full' />
                                    <div className='ml-2'>
                                        <h1 className='font-bold'>{`${user.firstName} ${user.lastName}`}</h1>
                                        <p>{user.headline}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}