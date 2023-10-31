import React, { useState } from 'react';
import { HiOutlineUser,HiOutlineUserGroup} from 'react-icons/hi'; // Import icons accordingly
import { RiLockPasswordFill} from 'react-icons/ri';
import sucessimage from '../images/sucess1.jpg'; // Update the image path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [usertype, setusertype]= useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginform', {
        usertype,
        username,
        password,
      });
      
      const data = response.data;
    
      setMessage(data.message);
      if (data.message === 'Login successful') {
        alert("Login successful"); 
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
  // const handleUserTypeChange = (event) => {
  //   setusertype(event.target.value);
  // };

  


  return (
    <div
      className='flex h-screen justify-center items-center'
      style={{
        backgroundImage: `url(${sucessimage})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='flex flex-col gap-4 border-2 border-slate-300  rounded-md p-6 bg-white'>
        <div className='grid justify-items-center '>
          <HiOutlineUserGroup className='w-40 h-20' />
        </div>
        <p style={{textAlign:'center'}}>{message}</p>

        <div className='flex items-center rounded-full bg-zinc-400'>
          <HiOutlineUser className='w-10 h-6 border-r-2 border-blue' />
          <select
            id="user-type"
            value={usertype}
            onChange={(e) => setusertype(e.target.value)}
            className="outline-none bg-zinc-400 p-1 w-100"
          >
            <option>Select user type</option> 
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className='flex items-center rounded-full bg-zinc-400'>
          <HiOutlineUser className='w-10 h-6 border-r-2 border-blue' />
          
          <input
            type='text'
            placeholder='username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className='outline-none bg-zinc-400 p-1 w-70'
          />
        </div>
        
        <div className='flex items-center rounded-full bg-zinc-400'>
          <RiLockPasswordFill className='w-10 h-6 border-r-2 border-blue' />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none bg-zinc-400 p-1 w-80'
          />
        </div>
        <button
          style={{ backgroundImage: 'linear-gradient(to right,green,red)' }}
          className='text-white text-lg rounded-full'
          onClick={handleLogin} // Trigger the login function
        >
          LOGIN
        </button>

        <button
          style={{ backgroundImage: 'linear-gradient(to right,green,red)' }}
          className='text-white text-lg rounded-full'
          onClick={handleSignup} // Trigger the login function
        >Sign up 
        </button>

       
        
      
      </div>
    </div>

    
  );
};

export default LoginForm;
