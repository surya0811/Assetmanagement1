import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { emailOrPhone } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reset-password', {
        emailOrPhone,
        newPassword,
        confirmPassword,
      });

      const data = response.data;

      if (data.success) {
        // Password reset successful
        setSuccessMessage('Password reset successful! You can now log in with your new password.');
        setErrorMessage('');
      } else {
        // Handle errors
        setErrorMessage(`Password reset failed: ${data.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('An error occurred while resetting the password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        {/* Your form UI with input fields for new password and confirm password */}
        <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-3 focus:outline-none focus:border-blue-500"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-3 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleResetPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Reset Password
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
