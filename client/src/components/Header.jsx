import React, { useContext } from 'react';
import {assets} from '../assets/assets';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const {userData,backendUrl}=useContext(AppContent);
  const navigate=useNavigate();

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      
      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };
 
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
        <img src={assets.header_img} alt="" className="w-36 h-36 rounded-full mb-6" />

        <h1 className='flex items-center gap-2 text-xl sm:text-3x1 font-medium mb-2'>Hey {userData ? userData.name : 'Developer'}!
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
        </h1>

        {userData && !userData.isAccountVerified && (
        <div className='mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg'>
          <p className='text-yellow-800 text-sm mb-2'>
            ⚠️ Your email is not verified yet
          </p>
          <button
            onClick={sendVerificationOtp}
            className='text-blue-600 underline text-sm font-medium hover:text-blue-800'
          >
            Click here to verify your email
          </button>
        </div>
      )}

      {userData && userData.isAccountVerified && (
        <div className='mb-4 p-3 bg-green-100 border border-green-400 rounded-lg'>
          <p className='text-green-800 text-sm flex items-center justify-center gap-2'>
            ✅ Email Verified
          </p>
        </div>
      )}

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>
        Let's start with a quick product tour and we will have you up and running in no time!
      </p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
        Get Started
      </button>
    </div>
  );
};
export default Header;