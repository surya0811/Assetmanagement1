import React, { useEffect, useState } from 'react';
import { BsGrid1X2Fill } from 'react-icons/bs';
import "./App1.css";

function VarientCard() {
  const [varientcount, setvarientCount] = useState(0);

  const fetchvarientCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/varient/count');
      if (response.ok) {
        const data = await response.json();
        setvarientCount(data.count);
      } else {
        console.error('Failed to fetch product count.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchvarientCount();
  }, []);

  return (
    <div className='card'>
    <div className='card-inner'>
      <h3><em>VARIANTS</em></h3>
      <BsGrid1X2Fill className='card_iicon' />
    </div>
    <h1>{varientcount}</h1>
  </div>
);
}

export default VarientCard;
