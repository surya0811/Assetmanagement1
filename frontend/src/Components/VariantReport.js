import React, { useState, useEffect } from 'react';
import sucessimage from '../images/productreortback.png';

const VariantReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/variants') // Update the API endpoint to fetch variantValues
      .then((res) => res.json())
      .then((data) => setReportData(data.variantValues)) // Assuming variantValues are stored in the 'variantValues' property
      .catch((error) => console.error('Error fetching report data:', error));
  }, []);

  const preprocessData = () => {
    if (!Array.isArray(reportData)) {
      console.error('Report data is not an array.');
      return {};
    }
  
    const groupedData = {};
  
    reportData.forEach((variantValue) => {
      const { id, productName, variant, value } = variantValue;
  
      if (!groupedData[id]) {
        groupedData[id] = { productName, variants: [] };
      }
  
      const newVariant = { variant, value };
      groupedData[id].variants.push(newVariant);
    });
  
    return groupedData;
  };
  
  const renderProductRows = () => {
    const groupedData = preprocessData();
  
    return Object.keys(groupedData).map((id, rowIndex) => {
      const { productName, variants } = groupedData[id];
  
      const isEvenRow = rowIndex % 2 === 0;
  
      return (
        <React.Fragment key={id}>
          <tr className={`border-b text-black ${isEvenRow ? 'bg-green-300' : 'bg-yellow-200'}`}>
            <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{id}</td>
            <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{productName}</td>
          </tr>
          {variants.map((variant, index) => (
            <tr
              key={`${id}-${index}`}
              className={`border-b text-black text-center align-middle ${isEvenRow ? 'bg-green-300' : 'bg-yellow-200'}`}
            >
              <td className="py-2 px-4">{variant.variant}</td>
              <td className="py-2 px-4">{variant.value}</td>
            </tr>
          ))}
        </React.Fragment>
      );
    });
  };
  
  return (
    <div className="flex items-center justify-center h-screen" style={{
      backgroundImage: `url(${sucessimage})`,
      backgroundSize: 'cover',
    }}>
      <div className="w-1/2 bg-white p-8 rounded shadow-md mt-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-500 uppercase ">VariantReport</h2>
        <table className="w-full  border border-gray-300 bg-blue-100">
          <thead className="bg-red-400 text-black font-bold text-xl uppercase italic">
            <tr>
              <th className="py-2 px-4 border-b ">ID</th>
              <th className="py-2 px-4 border-b ">Product Name</th>
              <th className="py-2 px-4 border-b ">Variant</th>
              <th className="py-2 px-4 border-b ">Value</th>
            </tr>
          </thead>
          <tbody>{renderProductRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default VariantReport;
