import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVariantForm({ productId, onVariantAdded }) {
  const [variantDescriptions, setVariantDescriptions] = useState([]);
  const [newVariantDescription, setNewVariantDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/addvariants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          variantDescriptions: variantDescriptions,
        }),
      });

      if (response.ok) {
        onVariantAdded();
        window.alert("Variants added successfully");

        // Redirect to AddVariantValue component
        navigate('/addvarientvalue');
      } else {
        console.error('Failed to add variants.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the form
    setVariantDescriptions([]);
    setNewVariantDescription('');
  };

  const addNewVariant = () => {
    if (newVariantDescription.trim() !== '') {
      setVariantDescriptions([...variantDescriptions, newVariantDescription]);
      setNewVariantDescription('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 p-4 rounded shadow">
      <h2 className="text-xl text-black font-semibold mb-4 uppercase">Add Variants for Product ID: {productId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter Variant Name For Product"
            className="w-1/2 border p-2 rounded-l focus:outline-none focus:ring focus:border-blue-300 text-black"
            value={newVariantDescription}
            onChange={(e) => setNewVariantDescription(e.target.value)}
          />
          <button
            type="button"
            className="w-1/6 bg-blue-500 text-white p-3 rounded-r hover:bg-purple-700 focus:outline-none text-black ml-5"
            onClick={addNewVariant}
          >
            Add
          </button>
        </div>
        {variantDescriptions.map((description, index) => (
          <div key={index} className="mb-2 text-black">
            <span className="mr-2">&#8226;</span>
            {description}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600  text-black py-2 px-4 mt-4 rounded font-bold"
        >
          Add Variants
        </button>
      </form>
    </div>
  );
}

export default AddVariantForm;
