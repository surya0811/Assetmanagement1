import React, { useState } from 'react';
import backgroundImage from '../images/register.jpg'
import { useNavigate } from 'react-router-dom';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your server with the formData
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('User registered sucessfully')
      
        navigate("/")
  
      
    } else {
      // Registration failed, handle accordingly
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity:'6',
      }}
      >

        <h1 className="text-6xl font-bold text-black-uppercase mb-center-50">Registration Form</h1>
     
         <div className="flex justify-center items-center h-screen p-5">
      <form className="w-1/3 " onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
          className="w-full p-2 my-2 border border-black-400 rounded-md p-4 text-center"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full p-2 my-2 border border-black-400 rounded-md p-4 text-center"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phoneNumber}
          required
          className="w-full p-2 my-2 border border-black-400 rounded-md p-4 text-center"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          required
          className="w-full p-2 my-2 border border-black-400 rounded-md p-4 text-center"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className="w-full p-2 my-2 border border-black-400 rounded-md p-4 text-center"
        />
        <button
          type="submit"
          className="text-2xl bg-green-500  font-bold text-black-400 p-2 rounded hover:bg-white-800 w-full border border-black-400 rounded-md p-4 text-center"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
