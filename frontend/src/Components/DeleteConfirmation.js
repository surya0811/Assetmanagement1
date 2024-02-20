import React, { useState } from 'react';

function DeleteConfirmation() {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [variantsData, setVariantsData] = useState([]);

  const handleDeleteVariant = () => {
    // Fetch variants for the selected product
    // ...

    // Update variantsData and selectedVariants
    // ...
  };

  const handleCheckboxChange = (variantId) => {
    // Handle checkbox selection
  };

  const handleDeleteConfirmation = () => {
    // Handle deletion confirmation
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2 text-black text-center">
        Delete Variants
      </h2>
      {variantsData.length > 0 ? (
        <div>
          {variantsData.map((variant) => (
            <label key={variant.id} className="block mt-2 text-black">
              <input
                type="checkbox"
                checked={selectedVariants.includes(variant.id)}
                onChange={() => handleCheckboxChange(variant.id)}
                className="mr-2"
              />
              {variant.variantName}
            </label>
          ))}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteConfirmation}
          >
            Delete Selected Variants
          </button>
        </div>
      ) : (
        <p className="text-red-700">No variants found for deletion.</p>
      )}
    </div>
  );
}

export default DeleteConfirmation;