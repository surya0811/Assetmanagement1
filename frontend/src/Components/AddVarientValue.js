import React, { useState, useEffect } from 'react';

function AddVarientValue({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState([]);
  const [values, setValues] = useState({});
  const [noProductFound, setNoProductFound] = useState(false);

  useEffect(() => {
    // Fetch variants from the backend when the productName changes
    if (productName) {
      fetch(`http://localhost:3000/product/variants/${productName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.variants && data.variants.length > 0) {
            setVariants(data.variants);
            setNoProductFound(false);
          } else {
            setNoProductFound(true);
            setVariants([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching variants:', error);
        });
    }
  }, [productName]);

  const handleInputChange = (variant, e) => {
    const newValue = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [variant]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form with the values
    // onSubmit(productName, values);
    const purchaseData = {
      productName,
      variantValues: values, // Correct the object key to match the server
    };
    
    // Send the purchaseData object to the server
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
            alert("Varient values added sucessfully");
        } else {
          console.log('Error:', data.error || 'Unknown error');
        }
      })
      .catch((error) => {
        console.error('Error submitting purchase:', error);
      });
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2 text-black text-center">Purchase Product</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-black">
          Product Name:
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          AddVarientValue
        </button>
      </form>
      {noProductFound && <p className="mt-2 text-red-700">No product found with the specified name.</p>}
      {variants.length > 0 && (
        <div className="mt-4">
          <p className="text-xl font-bold mb-2 text-black text-center">Product Variants</p>
          <form onSubmit={handleSubmit}>
            {variants.map((variant, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-black">{variant}:</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
                  value={values[variant] || ''}
                  onChange={(e) => handleInputChange(variant, e)}
                />
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit" 
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddVarientValue;
