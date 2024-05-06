import React, { useEffect, useState } from 'react';
import { FaTrash,FaPlus, FaShoppingCart } from 'react-icons/fa';
import AddProductForm from './NewAddProduct';
import PurchaseForm from './PurchaseForm'; 
import AddVarientForm from './AddVarientForm';
import AddVarientValue from './AddVarientValue';
import sucessimage from '../images/sucess2.jpg';
import "./Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomAlert from "./CustomAlert";
import { useNavigate } from 'react-router-dom';

function ProductTable() {
  
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState('');
  const [addvarientvalue,sethandleAddVarientValue]=useState('');
  const [variantsData, setVariantsData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAddVarientValueForm,setShowAddVarientValueForm]=useState(false);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [userConfirmedDeletion, setUserConfirmedDeletion] = useState(false);


  
  const navigate=useNavigate();

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

 // eslint-disable-next-line
  const handlePurchaseSubmit = (productName) => {
    setPurchasedProduct(productName);
    setShowPurchaseForm(false);
  };
// eslint-disable-next-line
  const handleAddVariant = (product) => {
    setSelectedProductId(product.productid);
  };

  const handleAddVarientValueClick =() => {
    setShowAddVarientValueForm(!showAddVarientValueForm);
    

  }
  const handleAddVarientValueSubmit = (productName) => {
    sethandleAddVarientValue(productName);
    setShowAddVarientValueForm(false);
  };

  const handleDeleteVariant = (productId) => {
    // Fetch variants for the selected product
    if (productId !== null) {
      fetch(`http://localhost:3000/variants1/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setVariantsData(data);
          setSelectedVariants(data.map((variant) => variant.id));
          setDeleteConfirmation(true);
          console.log('Fetched variants:', data);
          console.log('Variant IDs:', selectedVariants);
        })
        .catch((err) => console.log(err));
    }
  };
  
  const handleVariantAdded = () => {
    // Fetch updated variants data for the selected product
    if (selectedProductId !== null) {
      fetch(`http://localhost:3000/variants/${selectedProductId}`)
        .then((res) => res.json())
        .then((data) => {
          setVariantsData(data);
        })
        .catch((err) => console.log(err));
    }
  
    // Variant added, clear the selection
    setSelectedProductId(null);
  };

  const handleCheckboxChange = (variantId) => {
    if (selectedVariants.includes(variantId)) {
      // Deselect the variant
      setSelectedVariants(selectedVariants.filter((id) => id !== variantId));
    } else {
      // Select the variant
      setSelectedVariants([...selectedVariants, variantId]);
    }
  };

  const handleDeleteConfirmation = () => {
    if (selectedVariants.length === 0) {
      return; // No variants selected for deletion
    }
    
  setShowCustomAlert(true);
};
  const handleDeleteOperation = () => {
    // Log the selected variants before sending the request
    console.log('Selected Variants:', selectedVariants);
  
    // Send a request to delete the selected variants
    fetch('http://localhost:3000/variants/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ variantIds: selectedVariants }),
    })
      .then((res) => {
        if (res.status === 200) {
          // Successfully deleted, update the UI
          // You can choose to refresh the data or remove the deleted variants from the UI
          setVariantsData(variantsData.filter((variant) => !selectedVariants.includes(variant.id)));
          setSelectedVariants([]);
          setDeleteConfirmation(false);
          alert("Varients deleted sucessfully")
          navigate('/dashboard'); 
        } else {
          // Handle any errors, e.g., display an error message
          console.error('Error deleting variants');
        }
      })
      .catch((error) => {
        console.error('Error deleting variants:', error);
      });
  };

const handleCustomAlert = (confirmed) => {
  if (confirmed) {
    // User confirmed deletion
    setUserConfirmedDeletion(true);
    setShowCustomAlert(false);
    handleDeleteOperation(); // Call your deletion operation here
  } else {
    // User canceled deletion
    setShowCustomAlert(false);
  }
};


//use effect cases
useEffect(() => {
  if (showPurchaseForm) {
    // Scroll to the element with id "purchase-form" when showPurchaseForm changes
    const purchaseFormElement = document.getElementById('purchase-form');
    if (purchaseFormElement) {
      purchaseFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [showPurchaseForm]);

useEffect(() => {
  if (showForm) {
    // Scroll to the element with id "add-product-form" when showForm changes
    const addProductFormElement = document.getElementById('add-product-form');
    if (addProductFormElement) {
      addProductFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [showForm]);

useEffect(() => {
  if (showAddVarientValueForm) {
    // Scroll to the element with id "add-varient-value-form" when showAddVarientValueForm changes
    const addVarientValueFormElement = document.getElementById('add-varient-value-form');
    if (addVarientValueFormElement) {
      addVarientValueFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [showAddVarientValueForm]);

  return (
    <div className="p-4"
  style={{
    backgroundImage: `url(${sucessimage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(255, 245, 245, 0.5)' // Adjust the opacity as needed
  }}
>
      <div className="flex justify-between items-center mb-4">
        {/* <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePurchaseClick}
        >
          <FaShoppingCart className="mr-2" /> Purchase
        </button> */}
        <h2 className="text-5xl font-semibold text-center uppercase marquee1 text-black-800">Asset management system</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggleForm}
        >
          <FaPlus className="mr-2" /> Add New Product
        </button>
      </div>
      <table className="border-collapse border border-blue-800 shadow-lg w-full mt-4">
        <thead>
          <tr className="bg-yellow-100 text-red-500 text-lg uppercase">
            <th className="border p-2">ID</th>
            <th className="border p-2">PRODUCT</th>
            <th className="border p-2">PRODUCT Image</th>
            <th className="border p-2">ADD Variants</th>
            <th className="border p-2">DELETE Variants</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border-blue-800 text-black uppercase text-center font-bold">
              <td className="border p-2 text-black">{d.productid}</td>
              <td className="border p-2 text-black">{d.productName}</td>
              <td className="border p-2 text-black image-cell">
             <img 
                  src={`${d.productImage}`} 
                  alt={`${d.productName}`}  
                  style={{ width: '150px', height: '150px' }}
                  onError={(e) => console.log('Image failed to load:', e)}
                />
              </td>
                <td className="border p-2">
                <button
                  className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                  onClick={() => handleAddVariant(d)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add New variant
                </button>
              </td>
              <td className="border p-2">
                <button className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded items-center" 
                  onClick={() => handleDeleteVariant(d.productid)}>
                  <FaTrash className="mr-2" />
                  Delete Variants
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
      <br />
      
        <span className="text-900 text-red-800 text-center uppercase font-bolder text-xl marquee">
  Click "Add Variants" for the suitable product you want.
</span>
       
      {showForm && <AddProductForm />}
      {showPurchaseForm && <PurchaseForm onSubmit={handlePurchaseSubmit} />}
      {showAddVarientValueForm && <AddVarientValue onSubmit={handleAddVarientValueSubmit}  />}

      {selectedProductId !== null && (
        <AddVarientForm
          productId={selectedProductId}
          onVariantAdded={handleVariantAdded}
        />
      )}
      {deleteConfirmation && (
        <div className="mt-4 bg-gradient-to-r from-yellow-600 via-blue-500 to-green-400 p-4 rounded shadow">
          <h2 className="text-xl text-black  font-semibold mb-4 uppercase font-bold">
            Delete Variants
          </h2>
          {variantsData.length > 0 ? (
            <div>
              {variantsData.map((variant) => (
  <label key={variant} className="block mt-2 text-black">
    <input
      type="checkbox"
      checked={selectedVariants.includes(variant)}
      onChange={() => handleCheckboxChange(variant)}
      className="mr-2 text-black-500"
    />
    {variant}
  </label>
))}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDeleteConfirmation}
              >
                Delete Selected Variants
              </button>
            </div>
          ) : (
            <p className="text-red-700">No variants found for deletion.</p>
          )}
        </div>
      )}
       {showCustomAlert && (
  <CustomAlert
    message="Do you want to proceed with the deletion?"
    onOK={() => handleCustomAlert(true)}
    onCancel={() => handleCustomAlert(false)}
  />
)}

 <div id="purchase-form"></div>
 <div id="add-product-form"></div>
<div id="add-varient-value-form"></div>
    </div>
  );
       }
export default ProductTable;