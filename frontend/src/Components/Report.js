// Report.jsx
import React, { useState, useEffect } from 'react';

const Report = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/report')
      .then((res) => res.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error('Error fetching report data:', error));
  }, []);

  const preprocessData = () => {
    const groupedData = {};

    reportData.forEach((product) => {
      const { productid, productName, variant, VariantValue } = product;

      if (!groupedData[productid]) {
        groupedData[productid] = { productName, variants: [] };
      }

      const newVariant = { variant, VariantValue };

      const existingVariant = groupedData[productid].variants.find(
        (v) => v.variant === newVariant.variant
      );

      if (existingVariant) {
        existingVariant.VariantValue += `, ${newVariant.VariantValue}`;
      } else {
        groupedData[productid].variants.push(newVariant);
      }
    });

    return groupedData;
  };

  const renderProductRows = () => {
    const groupedData = preprocessData();

    return Object.keys(groupedData).map((productId) => {
      const { productName, variants } = groupedData[productId];

      return (
        <React.Fragment key={productId}>
          <tr className="border-b text-black">
            <td className="py-2 px-4">{productId}</td>
            <td className="py-2 px-4">{productName}</td>
            <td className="py-2 px-4">{variants[0].variant}</td>
            <td className="py-2 px-4">{variants[0].VariantValue}</td>
          </tr>
          {variants.slice(1).map((variant, index) => (
            <tr key={`${productId}-${index}`} className="border-b text-black">
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4"></td>
              <td className="py-2 px-4">{variant.variant}</td>
              <td className="py-2 px-4">{variant.VariantValue}</td>
            </tr>
          ))}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-300">
      <div className="w-full bg-white p-8 rounded shadow-md mb-5">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-500 uppercase ">Product Report</h2>
        <table className="w-full  border border-gray-300 bg-blue-100">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
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

export default Report;
