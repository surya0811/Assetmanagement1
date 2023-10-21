import React, { useEffect, useState } from 'react';
import { FaPlus, FaShoppingCart } from 'react-icons/fa';
import AddProductForm from './AddProductForm';
import PurchaseForm from './PurchaseForm'; 
import AddVarientForm from './AddVarientForm';
import AddVarientValue from './AddVarientValue';


function ProductTable() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState('');
  const [addvarientvalue,sethandleAddVarientValue]=useState('');
  const [variantsData, setVariantsData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAddVarientValueForm,setShowAddVarientValueForm]=useState(false);
  

  useEffect(() => {
    fetch('http://localhost:3000/assesst')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handlePurchaseClick = () => {
    setShowPurchaseForm(!showPurchaseForm);
  };

  const handlePurchaseSubmit = (productName) => {
    setPurchasedProduct(productName);
    setShowPurchaseForm(false);
  };

  const handleAddVarientValueClick =() => {
    setShowAddVarientValueForm(!showAddVarientValueForm);
    

  }
  const handleAddVarientValueSubmit = (productName) => {
    sethandleAddVarientValue(productName);
    setShowAddVarientValueForm(false);
  };

  const handleAddVariant = (product) => {
    setSelectedProductId(product.productid);
  };

  const handleVariantAdded = () => {
    // Variant added, clear the selection
    setSelectedProductId(null);

    // Fetch updated variants data for the selected product
    if (selectedProductId !== null) {
        fetch(`http://localhost:3000/variants/${selectedProductId}`)
        .then((res) => res.json())
        .then((data) => {setVariantsData(data);})
        .catch((err) => console.log(err));
    }};

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4 text-black">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePurchaseClick}
        >
          <FaShoppingCart className="mr-2" /> Purchase
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddVarientValueClick}
        >
          <FaShoppingCart className="mr-2" /> varientvalue
        </button>
        <h1 className="text-4xl font-bold text-center uppercase text-purple-500 shadow-2xl perspective shadow-xl">
  Product information
</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggleForm}
        >
          <FaPlus className="mr-2" /> Add New Product
        </button>
      </div>
      <table className="border-collapse border w-full bg-black">
        <thead>
          <tr className="bg-yellow-100 text-red-500 text-lg uppercase">
            <th className="border p-2">ID</th>
            <th className="border p-2">PRODUCT</th>
            <th className="border p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border text-black uppercase text-center">
              <td className="border p-2 text-white">{d.productid}</td>
              <td className="border p-2 text-white">{d.productName}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddVariant(d)}
                >
                  Add Variant
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="text-400 text-blue-900 text-center uppercase">
  Click "Add Variants" for the suitable product you want.</span>
      {showForm && <AddProductForm />}
      {showPurchaseForm && <PurchaseForm onSubmit={handlePurchaseSubmit} />}
      {showAddVarientValueForm && <AddVarientValue onSubmit={handleAddVarientValueSubmit}  />}
      {selectedProductId !== null && (
        <AddVarientForm
          productId={selectedProductId}
          onVariantAdded={handleVariantAdded}
        />
      )}
      {/* {variantsData && variantsData.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Variants</h2>
          <ul>
            {variantsData.map((variant, index) => (
              <li key={index}>{variant.variant_description}</li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="text-400 text-black text-center uppercase">
  Click "Add Variants" for the suitable product you want.
</span>

      )} */}
    </div>
  );
}
    

export default ProductTable;