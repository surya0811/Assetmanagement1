import React, { useState, useEffect } from 'react';

function PurchaseForm({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState([]);
  const [variantValues, setVariantValues] = useState(
    variants.reduce((acc, variant) => {
      acc[variant] = '';
      return acc;
    }, {})
  );
  
  const [noProductFound, setNoProductFound] = useState(false);
  

  useEffect(() => {
    // Fetch variants and their values from the backend when the productName changes
    if (productName) {
      fetch(`http://localhost:3000/product/variants/${productName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.variants && data.variants.length > 0) {
            setVariants(data.variants);
            setNoProductFound(false);

            // Fetch variant values for each variant
            const fetchVariantValues = async () => {
              const valuePromises = data.variants.map((variant) =>
                fetch(`http://localhost:3000/variant/values/${variant}`)
                  .then((response) => response.json())
                  .then((valuesData) => ({
                    variant,
                    values: valuesData.values || [], // Ensure values is an array
                  }))
              );

              const variantValueData = await Promise.all(valuePromises);

              const valueMap = {};
              variantValueData.forEach((item) => {
                valueMap[item.variant] = item.values;
              });
              setVariantValues(valueMap);
            };

            fetchVariantValues();
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
    setVariantValues((prevValues) => ({
      ...prevValues,
      [variant]: newValue,
    }));

  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form with the values
    // onSubmit(productName, variantValues);

    const purchaseData = {
      productName,
      variantValues,
    };

    // Send the purchaseData object to the server
    fetch('http://localhost:3000/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Purchase data saved successfully.') {
         alert('Purchase data saved successfully.')
        } else {
          
        }
      })
      .catch((error) => {
        console.error('Error submitting purchase:', error);
      });
  };

  return (
    <div className="mt-4">
      <h2 className="text-4xl font-bold mb-2 text-black text-center">Purchase Product</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-black">
          Product Name:
          <input
            className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
      </form>
      {noProductFound && <p className="mt-2 text-red-700">No product found with the specified name.</p>}
      {variants.length > 0 && (
        <div className="mt-4">
          <p className="text-3xl font-bold mb-2 text-black text-center text-uppercase">Product Variants</p>
          <form onSubmit={handleSubmit}>
          {variants.map((variant, index) => (
 <div key={index} className="mb-4 flex items-center mb-2">
 <label className="block mb-2 text-black font-bold mr-2">{variant}:</label>
 <select
   className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
   value={variantValues[variant]}
   onChange={(e) => handleInputChange(variant, e)}
 >
   <option value="">Select a value</option>
   {Array.isArray(variantValues[variant]) &&
     variantValues[variant].map((value, valueIndex) => (
       <option key={valueIndex} value={value}>
         {value}
       </option>
     ))}
 </select>
 {variantValues[variant] && (
   <p className="mt-2 text-green-700 mr-2">
     Selected: {variantValues[variant]}
   </p>
 )}
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

export default PurchaseForm;