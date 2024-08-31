import React, { useEffect, useMemo, useState } from 'react';
import JobList from './JobList';
import { useSelector } from 'react-redux';
import { apiClient } from '@/lib/api-client';
import { GET_ALL_JOBS, GET_APPLIED_JOBS } from '@/utils/constants';
import Loading from '@/components/Loading';
import JobFilters from './JobFilters';
import JobDetailsPage from './JobDetailsPage';

export default function JobsPage() {
    const {searchTerm: search} = useSelector((state) => state.search);
    const [jobList, setJobList] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        category: '',
        type: ''
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await apiClient.get(GET_APPLIED_JOBS);
                setAppliedJobs(res.data.data);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        };

        fetchAppliedJobs();
    }, []); 
    const memoizedJobs = useMemo(() => {
        return appliedJobs.map(job => job.job);
    }, [appliedJobs]);

    useEffect(() => {
        const getJobs = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(GET_ALL_JOBS);
                if (response.status === 200) {
                    setJobList(response.data.data);
                    setFilteredJobs(response.data.data);  // Initialize filteredJobs with all jobs
                }
            } catch (err) {
                console.error('Error Fetching Jobs: ', err.message);
            } finally {
                setLoading(false);  // Ensure loading is set to false after fetching
            }
        };
        if (user) {
            getJobs();
        }
    }, [user]);

    useEffect(() => {
      console.log('search', search);
      console.log('filterOptions', filterOptions);
        const applyFilters = () => {
            let filtered = jobList;

            // Apply search filter
            if (search) {
                filtered = filtered.filter((job) =>
                    job.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Apply category and type filters
            if (filterOptions.category) {
                filtered = filtered.filter((job) => job.category === filterOptions.category);
            }
            if (filterOptions.type) {
                filtered = filtered.filter((job) => job.type === filterOptions.type);
            }
            console.log('filtered', filtered);
            setFilteredJobs(filtered);
        };

        applyFilters();
    }, [search, filterOptions, jobList]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col h-screen m-2'>
            {/* Filter Section */}
            <div className=' bg-white p-2 mb-2'>
                <JobFilters filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            </div>
            {/* Job List and Details Section */}
            <div className='flex-1 flex overflow-hidden'>
                {/* Job List */}
                <div className='w-full md:w-1/3 h-full overflow-y-auto'>
                    <JobList jobList={filteredJobs} setSelectedJob={setSelectedJob} selectedJob={selectedJob} />
                </div>
                {/* Job Details */}
                <div className='w-full md:w-2/3 h-full overflow-y-auto'>
                    {selectedJob && (
                        <JobDetailsPage memoizedJobs={memoizedJobs} job={selectedJob} setAppliedJobs={setAppliedJobs} />
                    )}
                </div>
            </div>
        </div>
    );
}
