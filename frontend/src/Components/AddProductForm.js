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
          navigate('/dashboard'); 
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
      <div className="w-1/3 max-w-screen-md mx-auto p-4 bg-white rounded-lg shadow-md text-black border border-purple-900 ">
        <h2 className="text-3xl font-semibold mb-5 text-center uppercase">Add New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <label className=" text-xl block mb-3 ">
            Product Name
            <input
              className="w-full px-5 py-2 border rounded-lg focus:outline-none focus:ring focus:border-red-300 mb-2"
              type="text"
              value={productName}
              placeholder='give your product name '
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <button className="w-full bg-blue-500:hover bg-green-500 text-white py-2 rounded-lg hover:bg-blue-600 uppercase mb-2" type="submit" >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
