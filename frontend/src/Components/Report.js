import React, { useState, useEffect } from 'react';
import sucessimage from '../images/Designer.jpeg';

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
      const { productid, productName,departmentcode, labcode, productImage, productDescription } = product;

      if (!groupedData[productid]) {
        groupedData[productid] = { productName,departmentcode, labcode, productImage, productDescription  };
      }
    });

    return groupedData;
  };

  const renderProductRows = () => {
    const groupedData = preprocessData();

    return Object.keys(groupedData).map((productId, rowIndex) => {
      const { productName,departmentcode, labcode, productImage, productDescription } = groupedData[productId];

      const isEvenRow = rowIndex % 2 === 0;

      return (
        <tr key={productId} className={`border-b text-black ${isEvenRow ? 'bg-green-300' : 'bg-yellow-200'}`}>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{productId}</td>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{productName}</td>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{departmentcode}</td>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{labcode}</td>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">
            <img
              src={`http://localhost:3000/${productImage}`} // Assuming the API provides the full path
              alt={productName}
              style={{ width: '100px', height: '100px' }} // Adjust dimensions as needed
            />
          </td>
          <td className="py-2 px-4 text-center align-middle font-bold text-l uppercase">{productDescription}</td>
          
        </tr>
      );
    });
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{
      backgroundImage: `url(${sucessimage})`,
      backgroundSize: 'cover',
    }}>
      <div className="w-100%  bg-white p-8 rounded shadow-md mb-5 mt-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-500 uppercase ">Management Report</h2>
        <table className="w-full  border border-gray-300 bg-blue-100">
          <thead className="bg-red-400 text-black font-bold text-xl uppercase italic">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Lab</th>
              <th className="py-2 px-4 border-b">Product Image</th>
              <th className="py-2 px-4 border-b">description</th>
             
            </tr>
          </thead>
          <tbody>{renderProductRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
