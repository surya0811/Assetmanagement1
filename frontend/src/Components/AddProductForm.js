import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductForm() {

  const [productName, setProductName] = useState('');
  const navigate=useNavigate();

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (productName.trim() !== '') {
      try {
        const productResponse = await fetch('http://localhost:3000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productName }),
        });

        if (productResponse.ok) {
          // Product added successfully
          window.alert('product added successfully');
          setProductName(''); // Clear the input field
          navigate('/producttable'); 
        } else {
          console.error('Failed to add product.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-md mx-auto p-4 bg-white rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-semibold mb-5 text-center uppercase">Add New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <label className="block mb-2 ">
            Product Name:
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 uppercase" type="submit" >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
