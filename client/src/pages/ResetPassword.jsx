import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const ResetPassword = () => {
  const navigate=useNavigate();
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

  const [email, setEmail]=useState('');
  const [otp,setOtp]=useState('');
  const [newPassword, setNewPassword]=useState('');
  const [isOtpSent, setIsOtpSent]=useState(false);

  axios.defaults.withCredentials=true;

  const onSubmitEmail=async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(backendUrl + '/api/auth/send-reset-otp',{email});
      if(data.success){
        toast.success(data.message);
        setIsOtpSent(true);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const onSubmitNewPassword=async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(backendUrl + '/api/auth/reset-password',{
        email,
        otp,
        newPassword
      });

      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }    
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
      onClick={()=> navigate('/')}
      src={assets.logo}
      alt=''
      className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      {/* Email Input Form */}
      {!isOtpSent ? (
        <form
        onSubmit={onSubmitEmail}
        className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'
        >
          <h2 className='text-3xl font-semibold text-white text-center mb-3'>Reset Password</h2>
          <p className='text-center text-sm mb-6'>Enter your registered email address</p>  

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt='' />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none w-full'
              type="email"
              placeholder='Email address'
              required
            />
          </div>

          <button 
            type='submit'
            className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'
          >
            Send OTP
          </button>

           <p className='text-gray-400 text-center text-xs mt-4'>
            Remember your password?{' '}
            <span 
              onClick={() => navigate('/login')} 
              className='text-blue-400 cursor-pointer underline'
            >
              Login here
            </span>
          </p>
        </form>
      ):(
         /* OTP and New Password Form */
        <form 
          onSubmit={onSubmitNewPassword} 
          className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'
        >
          <h2 className='text-3xl font-semibold text-white text-center mb-3'>
            Reset Password
          </h2>
          <p className='text-center text-sm mb-6'>
            Enter the OTP sent to your email and new password
          </p>

           <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt='' />
            <input
              value={email}
              readOnly
              className='bg-transparent outline-none w-full text-gray-500'
              type="email"
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt='' />
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className='bg-transparent outline-none w-full'
              type="text"
              placeholder='OTP'
              required
              maxLength="6"
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt='' />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className='bg-transparent outline-none w-full'
              type="password"
              placeholder='New Password'
              required
            />
          </div>

           <button 
            type='submit'
            className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'
          >
            Reset Password
          </button>

          <p className='text-gray-400 text-center text-xs mt-4'>
            Didn't receive OTP?{' '}
            <span 
              onClick={() => setIsOtpSent(false)} 
              className='text-blue-400 cursor-pointer underline'
            >
              Resend OTP
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;