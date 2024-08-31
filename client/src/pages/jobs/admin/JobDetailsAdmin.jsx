import Loading from '@/components/Loading';
import { apiClient } from '@/lib/api-client';
import { GET_JOB_BY_ID } from '@/utils/constants';
import { Briefcase } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function JobDetailsAdmin() {
    const {id}=useParams();
    const [loading, setLoading] = useState(true);
    const [jobdetails, setJobDetails] = useState({});
    const [applicants, setApplicants] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchJobDetails = async () => {
            try {
                const res = await apiClient.get(`${GET_JOB_BY_ID}/${id}`);
                console.log(res);
                setJobDetails(res.data.data.job);
                const temp=res.data.data.applicants.map((app)=>{
                    return app.applicant
                })
                setApplicants(temp);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchJobDetails();
    
    }, [id]);
    if(loading){
        <Loading/>
    }
    const getTimeSincePosted = (date) => {
        const now = new Date();
        const posted = new Date(date);
        const diff = now - posted;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));

        if (days === 0) {
            if (hours === 0) {
                return `${minutes} minutes ago`;
            } else {
                return `${hours} hours ago`;
            }
        } else if (days === 1) {
            return "yesterday";
        } else {
            return `${days} days ago`;
        }
    };

  return (
    <div>
        <div className='bg-white p-2 rounded-md'>
            <h1 className='text-3xl font-bold text-gray-800'>Job Details</h1>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className="m-2">
                    <h3 className="text-xl font-semibold">{jobdetails.title}</h3>
                    <div className='flex flex-row gap-1 place-items-center'>
                        <p className="text-xs text-gray-500">{jobdetails.location}</p>
                        &#183;
                        <p className="text-xs text-gray-500">{getTimeSincePosted(jobdetails.createdAt)}</p>
                        &#183;
                        <p className="text-xs text-green-700">{jobdetails?.applicants?.length} Applicants</p>
                    </div>
                    <div className='flex flex-row gap-1 place-items-center'>
                        <Briefcase className='h-8'/>
                        <p className="text-sm text-gray-600">${jobdetails.budget}</p>
                        &#183;
                        <p className="text-sm text-gray-600 first-letter:capitalize">{jobdetails.type}</p>
                    </div>
                    <p className="text-sm text-gray-600">Category: {jobdetails.category}</p>
                    <p className="text-sm text-gray-600">Skills: {jobdetails.skills} </p>
                    <div>
                        <h3 className='text-lg font-bold border-b mb-2'>About the Job</h3>
                        <p className="text-sm text-gray-600">{jobdetails.description}</p>
                    </div>
                </div>
                
                <div>
                    <h2 className='text-xl font-semibold text-gray-700'>Applicants</h2>
                    <div className='bg-gray-100 p-2 flex flex-col rounded-md gap-2'>
                        {
                            applicants.map((applicant) => (
                                <a key={applicant._id} href={`/u/${applicant.userName}`}>
                                    <div className='flex items-center bg-white p-2 gap-2'>
                                        <img 
                                        src={applicant.image} 
                                        alt={`${applicant.firstName} avatar`} 
                                        className='w-12 h-12 object-cover rounded-full'
                                        />
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-800'>{`${applicant.firstName} ${applicant.lastName}`}</h3>
                                            <p className='text-sm text-gray-600'>{applicant.headline}</p>
                                        </div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
