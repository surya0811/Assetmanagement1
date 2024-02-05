import React, { useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import './App1.css';

function UserCard() {
  const [userCount, setUserCount] = useState(0);

  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/count'); // Adjust the API endpoint
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.count);
      } else {
        console.error('Failed to fetch user count.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <div className='card'>
      <div className='card-inner'>
        <h3><em>USERS</em></h3>
        <BsPersonFill className='card_iicon' />
      </div>
      <h1>{userCount}</h1>
    </div>
  );
}

export default UserCard;
