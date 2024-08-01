import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import React, { useRef, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {apiClient} from '../../lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/userSlice';


const Auth = () => {
  const [tabHeight, setTabHeight] = useState('auto');
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('logIn');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const validateSingUp = () => {
    if(!email.length){
        toast.error('Email is required');
        return false;
    }
    if(!password.length){
        toast.error('Password is required');
        return false;
    }
    if(!fullName.length){
        toast.error('Full Name is required');
        return false;
    }
    if(password !== confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }
    return true;
  }

  const validateLogin = () => {
    if(!email.length){
      toast.error('Email is required');
      return false;
    }
    if(!password.length){
        toast.error('Password is required');
        return false;
    }
    return true;
  }
  const handleLogin = async () => {
    if(validateLogin()){
      try{
        const response= await apiClient.post(LOGIN_ROUTE, {
            email,
            password,
        },{
          withCredentials: true
        });
        if(response.data.user.id){
            toast.success('Logged In Successfully');
            dispatch(setUserInfo({user: response.data.user}));
            navigate('/');
        }
      }catch(err){
        console.log(err);
        toast.error(err.response? err.response.data: err.message);
      }
    }
  }
  const handleSignUp = async () => {
    if(validateSingUp()){
      try{
        const response= await apiClient.post(SIGNUP_ROUTE, {
            email,
            password,
            fullName
        },{withCredentials: true});
        if(response.status===201){
            toast.success('Account Created Successfully');
            dispatch(setUserInfo({user: response.data.user}));
            navigate('/');

        }

      }catch(err){
        console.log(err);
        toast.error(err.response.data);
      }
    }
  }


  const updateHeight = () => {
    if (contentRef.current) {
      setTabHeight(`${contentRef.current.scrollHeight}px`);
    }
  };

  useEffect(() => {
    updateHeight();
  }, [activeTab]);

  return (
    <div className='w-full h-[90vh] grid place-items-center p-2'>
      <div className='lg:w-[40vw] md:w-[60vw] sm:w-[70vw] w-[80vw] h-min bg-white rounded-lg p-6 gap-1 flex flex-col shadow-2xl transition-all duration-500'>
        <h1 className='text-2xl font-bold text-foreground'>Welcome</h1>
        {/* <p className='text-foreground'>Start your Professional Journey Here...</p> */}

        <Tabs defaultValue="logIn" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2 transition-all duration-500">
            <TabsTrigger value="logIn" className="data-[state=active]:bg-glow data-[state=active]:text-background transition-all duration-500">Log In</TabsTrigger>
            <TabsTrigger value="signIn" className="data-[state=active]:bg-glow data-[state=active]:text-background transition-all duration-500">Sign Up</TabsTrigger>
          </TabsList>
          <div
            className="transition-all duration-500 overflow-hidden"
            style={{ height: tabHeight }}
          >
            <div ref={contentRef}>
              <TabsContent value='logIn'>
                <div className='flex flex-col gap-2'>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Email</label>
                    <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Password</label>
                    <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <Button onKeyDown={()=>handleSignUp()} onClick={()=>handleLogin()} className="bg-glow my-4">Log In</Button>
                </div>
              </TabsContent>
              <TabsContent value='signIn'>
                <div className='flex flex-col gap-2'>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Full Name</label>
                    <Input type='text' value={fullName} onChange={e=>setFullName(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Email</label>
                    <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Password</label>
                    <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <div>
                    <label className='text-sm font-semibold text-foreground'>Confirm Password</label>
                    <Input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='w-full p-2 border-2 border-gray-200 rounded-md' />
                  </div>
                  <Button onKeyDown={()=>handleSignUp()} onClick={()=>handleSignUp()} className="bg-glow my-2">Sign Up</Button>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
