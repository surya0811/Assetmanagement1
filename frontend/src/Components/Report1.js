import React, { useState, useEffect } from 'react';

const Report1 = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/report1')
      .then((res) => res.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error('Error fetching report data:', error));
    
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const preprocessData = () => {
    const groupedData = {};

    reportData.forEach((product) => {
      const { productid, productName, departmentcode, labcode, productImage, productDescription, variant, value } = product;

      if (!groupedData[productid]) {
        groupedData[productid] = { productName, departmentcode, labcode, productImage, productDescription, variants: [] };
      }

      if (variant && value) {
        const variantData = { variant, value };
        groupedData[productid].variants.push(variantData);
      }
    });

    return groupedData;
  };

  const renderProductRows = () => {
    const groupedData = preprocessData();

    return Object.keys(groupedData).map((productId) => {
      const { productName, departmentcode, labcode, productImage, productDescription, variants } = groupedData[productId];

      return (
        <React.Fragment key={productId}>
          <tr className="border-b text-black">
            <td className="py-2 px-4">{productId}</td>
            <td className="py-2 px-4">{productName}</td>
            <td className="py-2 px-4">{departmentcode}</td>
            <td className="py-2 px-4">{labcode}</td>
            <td className="py-2 px-4">
              <img
                src={`http://localhost:3000/${productImage}`} // Assuming the API provides the full path
                alt={productName}
                style={{ width: '100px', height: '80px' }} // Adjust dimensions as needed
              />
            </td>
            <td className="py-2 px-4">{productDescription}</td>
            {variants.length > 0 ? (
              <>
                <td className="py-2 px-4">{variants[0].variant}</td>
                <td className="py-2 px-4">{variants[0].value}</td>
              </>
            ) : (
              <>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
              </>
            )}
          </tr>
          {variants.slice(1).map((variant, index) => (
            <tr key={`${productId}-${index}`} className="border-b text-black">
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4">{variant.variant}</td>
              <td className="py-2 px-4">{variant.value}</td>
            </tr>
          ))}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex items-center justify-center bg-blue-100 min-h-screen">
      <div className="bg-white p-8 rounded shadow-md mb-5">
        <h2 className="text-2xl font-bold text-center uppercase mb-4 text-blue-500">Product Report</h2>
        <table className="w-full border border-gray-300 bg-blue-100" style={{ maxWidth: '90vw' }}>
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Department Code</th>
              <th className="py-2 px-4 border-b">Lab Code</th>
              <th className="py-2 px-4 border-b">Product Image</th>
              <th className="py-2 px-4 border-b">Product Description</th>
              <th className="py-2 px-4 border-b">Variant</th>
              <th className="py-2 px-4 border-b">Value</th>
            </tr>
          </thead>
          <tbody>{renderProductRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Report1;
