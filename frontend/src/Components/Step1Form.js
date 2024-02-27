import React, { useState } from 'react';

const Step1Form = ({ onNext }) => {
  const [productid, setProductid] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImageFile, setProductImageFile] = useState(null); // State to store the image file
  const [productDescription, setProductDescription] = useState('');
  const [department, setDepartment] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProductImageFile(file); // Save the file itself
    }
  };

  const handleNext = () => {
    // Validate the input if needed
    // Call the onNext function to move to the next step
    onNext({ productid,productName, department,productImage: productImageFile, productDescription });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
       <label className="block mb-4">
        <span className="text-gray-700">Product id:</span>
        <input
          className="form-input mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 uppercase"
          type="text"
          value={productid}
          onChange={(e) => setProductid(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Product Name:</span>
        <input
          className="form-input mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 uppercase"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Department:</span>
        <select
          className="form-select mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science Engineering</option>
          <option value="ECE">Electronics and Communication Engineering</option>
          <option value="Mech">Mechanical Engineering</option>
          <option value="Civil">Civil Engineering</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Product Image:</span>
        <input
          className="form-input mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      {productImage && (
        <img
          src={productImage}
          alt="Product Preview"
          className="mb-4 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <label className="block mb-4">
        <span className="text-gray-700">Product Description:</span>
        <textarea
          className="form-textarea mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Step1Form;
