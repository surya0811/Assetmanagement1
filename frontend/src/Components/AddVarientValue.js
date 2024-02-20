import React, { useState, useEffect } from 'react';
import sucessimage from '../images/sucess3.jpg';
import { useNavigate } from 'react-router-dom';

function AddVarientValue({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState([]);
  const [values, setValues] = useState({});
  const [noProductFound, setNoProductFound] = useState(false);
  const [productOptions, setProductOptions] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product names from the backend
    fetch('http://localhost:3000/productsfetch') // Adjust the endpoint accordingly
      .then((response) => response.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProductOptions(data.products);
        }
      })
      .catch((error) => {
        console.error('Error fetching product names:', error);
      });
  }, []);

  // Function to fetch variants based on the selected product
  const fetchVariants = (selectedProduct) => {
    // Make an API call to fetch variants based on the selected product
    // Adjust the endpoint accordingly
    fetch(`http://localhost:3000/variants1?product=${selectedProduct}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.variants && data.variants.length > 0) {
          setVariants(data.variants);
        } else {
          setNoProductFound(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching variants:', error);
      });
  };

  const handleInputChange = (variant, e) => {
    const newValue = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [variant]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const purchaseData = {
      productName,
      variantValues: values,
    };

    // Submit the purchaseData object to the server
    fetch('http://localhost:3000/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Purchase data saved successfully.') {
          alert("Variant values added successfully");
          navigate('/dashboard');
        } else {
          console.log('Error:', data.error || 'Unknown error');
        }
      })
      .catch((error) => {
        console.error('Error submitting purchase:', error);
      });
  };

  return (
    <div className="mt-4" style={{ backgroundImage: `url(${sucessimage})`, backgroundSize: 'cover' }}>
      <h2 className="text-3xl font-bold mb-2 text-black-1000 text-center uppercase"> VARIANT VALUE</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-xl block mb-4 text-black-1000 font-bold border-blue-300 uppercase">
          Select Product:
          <select
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              // Fetch variants based on the selected product
              fetchVariants(e.target.value);
            }}
            required
          >
            <option value="" disabled>Select a product</option>
            {productOptions.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </label>
        <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-20" type="submit">
          Add Variant Value
        </button>
      </form>
      {noProductFound && <p className="mt-2 text-red-700">No product found with the specified name.</p>}
      {variants.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Enter Variant Values</h2>
          {variants.map((variant, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">{variant}:</label>
              <input
                type="text"
                placeholder={`Enter Value for ${variant}`}
                className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                value={values[variant] || ''}
                onChange={(e) => handleInputChange(variant, e)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddVarientValue;