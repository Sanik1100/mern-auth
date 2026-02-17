import React, { useContext } from 'react'
import { assets } from '../assets/assets.js';
import {useNavigate} from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate= useNavigate()
  const {userData, backendUrl, setUserData,setIsLoggedin}=useContext(AppContent);
  const [showMenu, setShowMenu]=useState(false);

  const sendVerificationOtp=async () => {
    try {
      axios.defaults.withCredentials=true;
      const {data}=await axios.post(backendUrl + '/api/auth/send-verify-otp');

      if(data.success){
        toast.success(data.message);
        navigate('/email-verify');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const logout=async () => {
    try {
      axios.defaults.withCredentials= true;
      const {data}=await axios.post(backendUrl + '/api/auth/logout');

      if(data.success){
        setIsLoggedin(false);
        setUserData(null);
        navigate('/login');
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 bg-white shadow-md fixed top-0 left-0 z-50'>
      <img 
      onClick={()=> navigate('/')}
      src={assets.logo} 
      alt="Logo"
      className='w-28 sm:w-32 cursor-pointer' 
       />

      {userData ? (
        <div className='relative'>
          <div
          onClick={()=> setShowMenu(!showMenu)}
          className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold cursor-pointer'
          >
            {userData.name[0].toUpperCase()}
          </div>

          {showMenu && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50'>
              <p className='px-4 py-2 text-gray-700 font-medium border-b'>
                {userData.name}
              </p>

              {!userData.isAccountVerified && (
                <button
                onClick={()=>{
                  sendVerificationOtp();
                  setShowMenu(false);
                }}
                className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all'
                >
                  Verify Email
                </button>
              )}

              <button
              onClick={()=>{
                logout();
                setShowMenu(false);
              }}
              className='w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-all'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )
      :
      (
      <button onClick={()=>navigate('/login')}
       className='flex items-center gap-2 border border-gray-500 rounded-full px-6  py-2 text-gray-800 hover:bg-gray-100 transition-all'>
       Login
        <img src={assets.arrow_icon} alt="" />
      </button>
)}
</div>
  );
};

export default Navbar;
