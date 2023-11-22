import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/check-user', {
        emailOrPhone,
      });

      const data = response.data;

      if (data.success) {
        // User exists, navigate to ResetPasswordForm
        navigate(`/reset-password/${emailOrPhone}`);
      } else {
        setErrorMessage('User not found. Please check your email/phone number.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setErrorMessage('An error occurred while checking the user.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        {/* Your form UI with input field for email/phone */}
        <label className="block text-gray-700 text-sm font-bold mb-2">Email or Phone:</label>
        <input
          type="text"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-3 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleCheckUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Check User
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
