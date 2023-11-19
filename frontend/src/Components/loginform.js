import React, { useState, useEffect} from 'react';
import { HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sucessimage from '../images/loginback.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';


const LoginForm = () => {
  const [usertype, setusertype] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [userEnteredCaptcha, setUserEnteredCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async () => {
    try {
    
      const response = await axios.post('http://localhost:3000/loginform', {
        usertype,
        username,
        password,
        userEnteredCaptcha,
      });

      const data = response.data;

      setMessage(data.message);
      if (data.message === 'Login successful') {
        alert('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred while logging in.');
    }
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSignup = () => {
    navigate('/registration');
  };

  const fetchCaptchaText = async () => {
    try {
      const response = await axios.get('http://localhost:3000/captcha');
      const captcha = response.data.captcha;
      setCaptchaText(captcha);
    } catch (error) {
      console.error('Error fetching CAPTCHA text:', error);
    }
  };

  useEffect(() => {
    fetchCaptchaText();
  }, []); 


  return (
    <div className='relative'>
    <video autoPlay loop muted className='fixed object-cover w-full h-full z-[-1]'>
      <source src={sucessimage} type='video/mp4' />
    </video>

    <div className='flex h-screen justify-center items-center relative z-10'>
      <div className='flex flex-col gap-4 border-2 border-slate-300 rounded-md p-6 bg-blue'>  
        <div className='grid justify-items-center  '>
          <HiOutlineUserGroup className='w-40 h-20' />
        </div>
        <p style={{ textAlign: 'center', color:'red' , font:'14px' , fontFamily:'bold'}}>{message}</p>

        <div className='flex items-center rounded-full bg-zinc-400'>
          <HiOutlineUser className='w-10 h-6 border-r-2 border-blue' />
          <select
            id='user-type'
            value={usertype}
            onChange={(e) => setusertype(e.target.value)}
            className='outline-none bg-zinc-400 p-1 w-100'
          >
            <option>Select user type</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <div className='flex items-center rounded-full bg-zinc-400'>
          <HiOutlineUser className='w-10 h-6 border-r-2 border-blue' />

          <input
            type='text'
            placeholder=' enter username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className='outline-none bg-zinc-400 p-1 w-70 text-black-800 font-bold white-placeholder'
          />
        </div>

        <div className='flex items-center rounded-full bg-zinc-400'>
            <RiLockPasswordFill className='w-10 h-6 border-r-2 border-blue' />
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              placeholder=' enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='outline-none bg-zinc-400 p-1 w-70 text-black-800 font-bold white-placeholder'
            />
            <div
              className='cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className='w-6 h-6' />
              ) : (
                <AiOutlineEye className='w-6 h-6' />
              )}
            </div>
          </div>

         <div className='flex items-center justify-center text-white text-xl font-line-through'>
          <p>{captchaText}</p>
          <button
            onClick={fetchCaptchaText}
            className='ml-2 bg-black-300 px-2 py-1 rounded-md'
          >
            <FontAwesomeIcon icon={faArrowsRotate} fade size="3xs"  className='mr-1 bg-black-200' />
            
          </button>
        </div>
        <div className='flex items-center rounded-full bg-zinc-400'>
          <HiOutlineUser className='w-10 h-6 border-r-2 border-blue' />
        <input
                type='text'
                placeholder='Enter CAPTCHA'
                value={userEnteredCaptcha}
                onChange={(e) => setUserEnteredCaptcha(e.target.value)}
                className='outline-none bg-zinc-400 p-1 w-80  align-center text-black-800 font-bold  white-placeholder'
            />
          </div>
        <button
          style={{ backgroundImage: 'linear-gradient(to right,green,red)' }}
          className='text-white text-lg rounded-full'
          onClick={handleLogin}
        >
          LOGIN
        </button>

        <button
          style={{ backgroundImage: 'linear-gradient(to right,green,red)' }}
          className='text-white text-lg rounded-full'
          onClick={handleSignup}
        >
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
