import React, { useEffect, useState } from 'react'
import JobsCard from './JobsCard'

export default function JobList({jobList, setSelectedJob, selectedJob}) {

  function handleClick(job) {
      console.log('job', job);
      setSelectedJob(job);
  }

  return (
    <div className='w-full'>
            <div className='flex flex-col gap-2 w-full'>
              {
                jobList.map((job) => (
                  <div onClick={()=>handleClick(job)} key={job._id}>
                    <JobsCard job={job}/>
                  </div>
                ))
              }
            </div>
    </div>
  )
}
