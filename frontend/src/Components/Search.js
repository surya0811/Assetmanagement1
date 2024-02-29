import React, { useState, useEffect } from 'react';

const Search = () => {
  const [departments, setDepartments] = useState([]);
  const [labs, setLabs] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch departments data when the component mounts
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Fetch labs whenever selectedDepartment changes
    fetchLabs();
  }, [selectedDepartment]);

  useEffect(() => {
    // Fetch products whenever selectedLab changes
    fetchProducts();
  }, [selectedLab]);

  // Function to fetch department data from the server
  const fetchDepartments = async () => {
    try {
      // Make API call to get departments from your server
      const response = await fetch('http://localhost:3000/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Function to fetch lab data based on selected department
  const fetchLabs = async () => {
    if (!selectedDepartment) {
      // Do not make a request if no department is selected
      return;
    }

    try {
      // Make API call to get labs associated with the selected department
      const response = await fetch(`http://localhost:3000/labs?departmentCode=${selectedDepartment}`);
      const data = await response.json();
      setLabs(data);
    } catch (error) {
      console.error('Error fetching labs:', error);
    }
  };

  // Function to fetch products based on selected lab
  const fetchProducts = async () => {
    if (!selectedLab) {
      // Do not make a request if no lab is selected
      return;
    }

    try {
      // Make API call to get products associated with the selected lab
      const response = await fetch(`http://localhost:3000/productsdisplay?labCode=${selectedLab}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('Products:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle change when a department is selected
  const handleDepartmentChange = (event) => {
    const departmentCode = event.target.value;
    setSelectedDepartment(departmentCode);
    // Fetch labs associated with the selected department
    fetchLabs();
    // Reset selectedLab and editingProduct when department changes
    setSelectedLab('');
    setEditingProduct(null);
  };

  // Handle change when a lab is selected
  const handleLabChange = (event) => {
    const labCode = event.target.value;
    setSelectedLab(labCode);
    // Reset editingProduct when lab changes
    setEditingProduct(null);
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // Handle form submission for editing a product
const handleEditSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`http://localhost:3000/editproduct/${editingProduct.productid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departmentcode: event.target.departmentCode.value,
        labcode: event.target.labCode.value,
        // Add other fields as needed
      }),
    });

    if (response.ok) {
      // Update the local state with the edited product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productid === editingProduct.productid
            ? {
                ...product,
                departmentcode: event.target.departmentCode.value,
                labcode: event.target.labCode.value,
                // Update other fields as needed
              }
            : product
        )
      );

      // Reset editingProduct state
      setEditingProduct(null);
    } else {
      console.error('Failed to update product');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


  return (
    <div className="container mx-auto my-8 p-8 bg-gray-200 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Product Search</h2>
      <div className="mb-4">
        <label htmlFor="department" className="block text-gray-700 font-bold mb-2">
          Department:
        </label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-black-800"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department.departmentid} value={department.departmentcode}>
              {department.department}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="lab" className="block text-gray-700 font-bold mb-2">
          Lab:
        </label>
        <select
          id="lab"
          value={selectedLab}
          onChange={handleLabChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-black-800"
        >
          <option value="">Select Lab</option>
          {labs.map((lab) => (
            <option key={lab.id} value={lab.labcode}>
              {lab.labname}
            </option>
          ))}
        </select>
      </div>

      {/* Display products associated with the selected lab */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-blue-600">Products:</h3>
        <table className="border-collapse border border-blue-800 shadow-lg w-full mt-4">
          <thead>
            <tr className="bg-yellow-100 text-red-500 text-l uppercase">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Department Code</th>
              <th className="px-4 py-2">Lab Code</th>
              <th className="px-4 py-2">Product Image</th>
              <th className="px-4 py-2">Product Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productid} className="border-blue-800 text-black uppercase text-center font-bold">
                <td className="border px-4 py-2">{product.productName}</td>
                <td className="border px-4 py-2">{product.departmentcode}</td>
                <td className="border px-4 py-2">{product.labcode}</td>
                <td className="border px-- text-black image-cell">
              <img 
                  src={`${product.productImage}`} 
                  alt={`${product.productName}`}  
                  style={{ width: '150px', height: '150px' }}
                  onError={(e) => console.log('Image failed to load:', e)}
                />
              </td>
                <td className="border px-4 py-2">{product.productDescription}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
