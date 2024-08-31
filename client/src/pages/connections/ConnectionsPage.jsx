import React, { useEffect, useState } from 'react'
import ConnectionOption from './ConnectionOption'
import ConnectionsList from './ConnectionsList'
import { apiClient } from '@/lib/api-client';
import { GET_FOLLOWERS_FOLLOWING } from '@/utils/constants';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ConnectionsPage() {
  const [selectedOption, setSelectedOption]=useState('following');
  const [connections, setConnections]=useState({});
  const [list, setList]=useState([]);
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    const fetchConnections=async()=>{
      try{
        const res=await apiClient.get(GET_FOLLOWERS_FOLLOWING);
        console.log('Connections:', res.data);
        setConnections(res.data.data);

      }catch(err){
        console.log('Error:',err.message);
      }

      setLoading(false);
    }
    fetchConnections();
  },[]);

  useEffect(()=>{
    console.log('Selected Option:', selectedOption);
    if(selectedOption==='following'){
      setList(connections.following);
    }else{
      setList(connections.followers);
    }
    console.log('List:', list);
  }, [selectedOption, connections]);

  if(loading){
    return <Loading/>
  }

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl font-bold'> Your connections</h1>
        <Button onClick={()=>{navigate('/connections/search')}} className='bg-input text-white m-1 h-8'>Add</Button>
      </div>

      <div className='grid gap-1 grid-cols-1 '>
        <div className=''>
          <ConnectionOption setOption={setSelectedOption} selectedOption={selectedOption}/>
        </div>
        <div className='bg-white'>
          <ConnectionsList list={list} />
        </div>
      </div>
    </div>
  )
}
