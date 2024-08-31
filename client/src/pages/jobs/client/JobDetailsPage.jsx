import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { APPLY_JOB } from '@/utils/constants';
import { Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function JobDetailsPage({ job, memoizedJobs, setAppliedJobs }) {
    const {
        _id,
        title,
        company,
        location,
        type,
        description,
        budget,
        createdAt,
        category,
        created_by,
        applicantCount,
        skills
    } = job;

    const isApplied = memoizedJobs.includes(_id);

    const handleApply = async () => {
        try {
            const res = await apiClient.post(APPLY_JOB, { jobId: _id });
            console.log(res);

            if (res.status === 200) {
                setAppliedJobs((prev) => {
                    const updatedJobs = [...prev, {job:_id}];
                    return updatedJobs;
                });
                toast.success('Successfully Applied for Job');
            }
        } catch (err) {
            console.log(err);
            toast.error('Error Applying for Job');
        }
    };

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
        <div className="bg-white border rounded-lg shadow-md p-6 m-4">
            {/* Company Details */}
            <div className="flex items-center space-x-2 mb-4">
                {/* Company Logo */}
                {company.logo ? (
                    <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="w-8 h-8 object-contain rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
                        <p className="text-gray-500 text-sm">No Logo</p>
                    </div>
                )}
                <h2 className="text-lg font-bold">{company.name}</h2>
            </div>

            {/* Job Details */}
            <div className="mb-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <div className='flex flex-row gap-1 place-items-center'>
                    <p className="text-xs text-gray-500">{location}</p>
                    &#183;
                    <p className="text-xs text-gray-500">{getTimeSincePosted(createdAt)}</p>
                    &#183;
                    <p className="text-xs text-green-700">{applicantCount} Applicants</p>
                </div>
                <div className='flex flex-row gap-1 place-items-center'>
                    <Briefcase className='h-8'/>
                    <p className="text-sm text-gray-600">${budget}</p>
                    &#183;
                    <p className="text-sm text-gray-600 first-letter:capitalize">{type}</p>
                </div>
                <p className="text-sm text-gray-600">Category: {category}</p>
                <p className="text-sm text-gray-600">Skills: {skills} </p>
            </div>
            <div className='flex gap-2'>
                <Button onClick={handleApply} disabled={isApplied} className='bg-input'>
                    {isApplied ? 'Applied' : 'Apply'}
                </Button>
                {/* <Button className='bg-transparent text-input border border-input'>Save</Button> */}
            </div>
            <div>
                <h3 className='text-lg font-bold border-b mb-2'>About the Job</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Job Poster Details */}
            <a href={`/u/${created_by.userName}`}>
              <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                {/* Poster Profile Image */}
                {created_by.image ? (
                    <img 
                        src={created_by.image} 
                        alt={`${created_by.firstName} ${created_by.lastName}`} 
                        className="w-12 h-12 object-contain rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
                        <p className="text-gray-500 text-sm">No Image</p>
                    </div>
                )}
                {/* Poster Info */}
                <div>
                    <p className="text-lg font-medium">{created_by.firstName} {created_by.lastName}</p>
                    <p className="text-sm text-gray-500">{created_by.headline}</p>
                </div>
              </div>

            </a>
        </div>
    );
}
