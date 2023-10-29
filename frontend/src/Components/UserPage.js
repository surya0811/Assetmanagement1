import React, { useState, useEffect } from 'react';import './App1.css';

function UserPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productVariants, setProductVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [variantValues, setVariantValues] = useState([]);

  const handleSearch = async () => {
    try {
      // Make an API request to your backend to perform the search
      const response = await fetch(`http://localhost:3000/search?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);

        // Automatically select the first product in the search results and fetch its variants and values
        if (data.results.length > 0) {
          handleProductClick(data.results[0]);
        }
      } else {
        console.error('Search request failed.');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleProductClick = async (product) => {
    // When a product is clicked, fetch its variants and values
    try {
      const response = await fetch(`http://localhost:3000/product/${product.productid}/variants`);
      if (response.ok) {
        const data = await response.json();
        setProductVariants(data.variants);
        setSelectedProduct(product);

        // Automatically select the first variant for the selected product and fetch its values
        if (data.variants.length > 0) {
          handleVariantSelect(data.variants[0]);
        }
      } else {
        console.error('Fetching variants failed.');
      }
    } catch (error) {
      console.error('Error fetching product variants:', error);
    }
  };

  const handleVariantSelect = async (variant) => {
    setSelectedVariant(variant);
    try {
      const response = await fetch(`http://localhost:3000/variants/${variant}/values`);
      if (response.ok) {
        const data = await response.json();
        setVariantValues(data.values);
      } else {
        console.error('Fetching variant values failed.');
      }
    } catch (error) {
      console.error('Error fetching variant values:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
   <header className="bg-blue-500 p-4 text-white">
      <h1 className="text-4xl font-bold text-uppercase">ASSET MANAGEMENT SYSTEM</h1>
    </header> 
    
    <div className="container mx-auto py-4 ">
      <div className="flex flex-col">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-1/5 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 mt-2 rounded-lg hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Search Results:</h2>
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(result)}
                className="w-1/4 mb-4 cursor-pointer border p-2 my-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{result.productName}</h3>
                  <p className="text-gray-700">{result.productid}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedProduct && (
          <div className="w-1/4 mb-6">
            <h2 className="text-xl font-semibold">Variants for {selectedProduct.productName}:</h2>
            <table className="table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Variant</th>
                </tr>
              </thead>
              <tbody>
                {productVariants.map((variant, index) => (
                  <tr
                    key={index}
                    onClick={() => handleVariantSelect(variant)}
                    className={
                      selectedVariant === variant
                        ? 'text-blue-500 cursor-pointer bg-gray-200'
                        : 'cursor-pointer hover:bg-gray-100 transition-colors'
                    }
                  >
                    <td className="border px-4 py-2">{variant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
        )}
        {selectedVariant && (
          <div >
            <h2 className="text-xl font-semibold">Values for {selectedVariant}:</h2>
            <table className="table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-5 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {variantValues.map((value, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
  
  )};  

export default UserPage;