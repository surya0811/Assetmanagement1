import React, { useState, useEffect } from 'react';

const Step1Form = ({ onNext }) => {
  const [productid, setProductid] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [labOptions, setLabOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLab, setSelectedLab] = useState('');

  
  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      fetchLabs();
    }
  }, [selectedDepartment]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:3000/departments');
      const data = await response.json();
      setDepartmentOptions(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchLabs = async () => {
    try {
      const response = await fetch(`http://localhost:3000/labs?departmentCode=${selectedDepartment}`);
      const data = await response.json();
      setLabOptions(data);
    } catch (error) {
      console.error('Error fetching Labs:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProductImageFile(file);
    }
  };

  const handleNext = () => {
    onNext({
      productid,
      productName,
      department: selectedDepartment,
      lab: selectedLab,
      productImage: productImageFile,
      productDescription
    });
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
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departmentOptions.map((department) => (
            <option key={department.departmentcode} value={department.departmentcode}>
              {department.department}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Lab:</span>
        <select
          className="form-select mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={selectedLab}
          onChange={(e) => setSelectedLab(e.target.value)}
        >
          <option value="">Select Lab</option>
          {labOptions.map((lab) => (
            <option key={lab.labcode} value={lab.labcode}>
              {lab.labname}
            </option>
          ))}
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
