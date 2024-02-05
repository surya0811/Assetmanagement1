// AddProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

const AddProductForm = () => {
  const [step, setStep] = useState(1);
  // eslint-disable-next-line 
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productid:'',
    productName: '',
    productImage: '',
    productDescription: '',
    variants: [],
    variantValues: '',
  });

  const handleNextStep = (data) => {
    setProductData({ ...productData, ...data });
    setStep(step + 1);
  };
  const productImageURL = productData.productImage ? URL.createObjectURL(productData.productImage) : '';

  const handleAddValues = (values) => {
    console.log('handleAddValues called with values:', values);

    // Update variantValues with the correct variant and its values
    setProductData((prevData) => {
      const updatedVariantValues = [...prevData.variantValues, values];

      console.log('Updated Data:', {
        ...prevData,
        variantValues: updatedVariantValues,
      });

      return {
        ...prevData,
        variantValues: updatedVariantValues,
      };
    });
  };

 // ...

 const handleNext = () => {
  setLoading(true);

  const formData = new FormData();
  formData.append('productid', productData.productid);
  formData.append('productName', productData.productName);
  formData.append('productDescription', productData.productDescription);
  formData.append('variants',JSON.stringify(productData.variants));
  formData.append('variantValues', JSON.stringify(productData.variantValues));

  // Append productImage only if it exists
  if (productData.productImage) {
    formData.append('productImage', productData.productImage);
  }

  axios.post('http://localhost:3000/product', formData)
    .then(response => {
      console.log('Server response:', response.data);
      // Handle any additional logic based on the server response
    })
    .catch(error => {
      console.error('Error submitting product:', error);
      // Handle error cases
      alert('Error submitting product. Please try again.');
    })
    .finally(() => {
      setLoading(false);
      // Example: Reset the form and navigate to the first step
      setProductData({
        productid:'',
        productName: '',
        productImage: '',
        productDescription: '',
        variants: [],
        variantValues: [],
      });
      setStep(1);
    });
};




  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1Form onNext={handleNextStep} />;
      case 2:
        return <Step2Form onNext={handleNextStep} />;
      case 3:
        return (
          <Step3Form
            variants={productData.variants}
            onAddValues={handleAddValues}
            onNext={() => setStep(step + 1)}
          />
        );
      case 4:
        return (
          <div>
            <p className="text-lg font-semibold mb-4 text-white">
              Review your product information:
            </p>
            {/* Display product information for review */}
          </div>
        );
      default:
        return null;
    }
  };

  
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg shadow-lg">
      <div className="max-w-md mx-auto mb-8">{renderCurrentStep()}</div>
      {step === 4 && (
        <div>
          <p className="text-lg font-semibold mb-4 text-white">
            Review your product information:
          </p>
          <div className="mb-2 text-white ">
            <span className="font-bold">Product ID:</span> {productData.productid}
          </div>
          <div className="mb-2 text-white ">
            <span className="font-bold">Name:</span> {productData.productName}
          </div>
          {productData.productImage && (
            <div className="mb-2 text-white">
                <span className="font-bold">Image:</span>
                <img
                  src={productImageURL}
                  alt="Product Preview"
                  className="mt-2 rounded"
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
            </div>
            )}
          <div className="mb-2 text-white">
            <span className="font-bold">Description:</span> {productData.productDescription}
          </div>
          <div className="mb-2 font-bold text-white">Variants:</div>
          <ul className="list-disc pl-4 text-white">
  {productData.variantValues.map((values, index) => (
    <li key={index} className="mb-2">
      {Object.entries(values).map(([variant, value]) => (
        <div key={variant}>
          <span className="font-bold">{variant}:</span> {Array.isArray(value) ? value.join(', ') : value}
        </div>
      ))}
    </li>
  ))}
</ul>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleNext}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;