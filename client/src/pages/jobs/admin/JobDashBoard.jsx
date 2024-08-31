import { apiClient } from '@/lib/api-client';
import { GET_POSTED_JOBS } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import JobAdminCard from './JobAdminCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function JobDashBoard() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await apiClient.get(GET_POSTED_JOBS);
                console.log(res);
                if (res.status === 200) {
                    setJobs(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchJobs();
    },[]);
  return (
    <div className='p-2'>
        <div className='bg-white p-2 rounded-md'>
            <div className='flex flex-col sm:flex-row justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>Job Dashboard</h1>
                    <p className='text-gray-600'>Welcome to the job dashboard</p>
                </div>
                <div>
                    <Button onClick={()=>navigate('/talent/post-a-job')} className='bg-input text-white text-sm h-8 w-20'>Post a Job</Button>
                </div>
            </div>
            <div>
                <h2 className='text-xl font-semibold text-gray-700'>Postions your are Hiring </h2>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    {
                        jobs.map((job) => (
                            <JobAdminCard job={job} key={job._id}/>
                        ))
                    }
                </div>
            </div>

            
        </div>
        
    </div>
  )
}
