import React, { useEffect, useState } from 'react';
import { BsGrid1X2Fill } from 'react-icons/bs';
import "./App1.css";

function ProductCard() {
  const [productCount, setProductCount] = useState(0);

  const fetchProductCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/count');
      if (response.ok) {
        const data = await response.json();
        setProductCount(data.count);
      } else {
        console.error('Failed to fetch product count.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProductCount();
  }, []);

  return (
    <div className='card'>
    <div className='card-inner'>
      <h3>PRODUCTS</h3>
      <BsGrid1X2Fill className='card_iicon' />
    </div>
    <h1>{productCount}</h1>
  </div>
);
}

export default ProductCard;
