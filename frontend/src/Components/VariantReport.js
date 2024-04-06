import React, { useState, useEffect } from 'react';

const VariantReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/variantReport')
      .then((res) => res.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error('Error fetching report data:', error));
    
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const preprocessData = () => {
    const groupedData = {};

    reportData.forEach((variantItem) => { // Changed variable name to variantItem
      const { productid, variant, value } = variantItem; // Changed variable name to variantItem

      if (!groupedData[productid]) {
        groupedData[productid] = { variants: [] };
      }

      const variantData = { variant, value };
      groupedData[productid].variants.push(variantData);
    });

    return groupedData;
  };

  const renderVariantRows = () => {
    const groupedData = preprocessData();

    return Object.keys(groupedData).map((productId) => {
      const { variants } = groupedData[productId];

      return (
        <React.Fragment key={productId}>
          <tr className="border-b text-black">
            <td className="py-2 px-4">{productId}</td>
            <td className="py-2 px-4">{variants.length > 0 ? variants[0].variant : ''}</td>
            <td className="py-2 px-4">{variants.length > 0 ? variants[0].value : ''}</td>
          </tr>
          {variants.slice(1).map((variant, index) => (
            <tr key={`${productId}-${index}`} className="border-b text-black">
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
        <h2 className="text-2xl font-bold text-center uppercase mb-4 text-blue-500">Variant Report</h2>
        <table className="w-full border border-gray-300 bg-blue-100" style={{ maxWidth: '100vw' }}>
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Variant</th>
              <th className="py-2 px-4 border-b">Value</th>
            </tr>
          </thead>
          <tbody>{renderVariantRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantReport;
