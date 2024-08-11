import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function JobList() {
    const [search, setSearch] = useState('');
    const [jobList, setJobList] = useState([]);
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     const getJobs = async () => {
    //         try {
    //             const response = await apiClient.get(GET_JOBS);
    //             if (response.status === 200) {
    //                 console.log('response: ', response);
    //                 setJobList(response.data);
    //             }
    //         }
    //         catch (err) {
    //             console.log('Error Fetching Jobs: ', err.message);

    //         }
    //     }
    //     if (user) {
    //         getJobs();
    //     }
    //     setLoading(false);

    // }, [user]);


  return (
    <div>JobList</div>
  )
}
