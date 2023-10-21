import React, { useState, useEffect } from 'react';

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
      } else {
        console.error('Fetching variants failed.');
      }
    } catch (error) {
      console.error('Error fetching product variants:', error);
    }
  };

  const handleVariantSelect = async (variant) => {
    // When a variant is selected, fetch its values
    setSelectedVariant(variant); // Set the selected variant
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
      {/* ... Header ... */}
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-4xl font-bold">User Page</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto py-4">
        <div className="flex">
          {/* Search Bar */}
          <div className="flex items-center justify-end mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-2 hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </button>
            </div>

          {/* Search Results */}
          <div className="w-1/2 p-4">
            {searchResults.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Search Results:</h2>
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} onClick={() => handleProductClick(result)}>
                      {result.productid} - {result.productName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Product Variants and Values */}
          <div className="w-1/2 p-4">
            {selectedProduct && (
              <div>
                <h2 className="text-xl font-semibold">Variants for {selectedProduct.productName}:</h2>
                <ul>
                  {productVariants.map((variant, index) => (
                    <li
                      key={index}
                      onClick={() => handleVariantSelect(variant)}
                      className={selectedVariant === variant ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}
                    >
                      {variant}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedVariant && (
              <div>
                <h2 className="text-xl font-semibold">Values for {selectedVariant}:</h2>
                <ul>
                  {variantValues.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
