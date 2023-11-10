// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Route , Routes } from "react-router-dom";
import LoginForm from "./Components/loginform";
import RegistrationForm from "./Components/registration";
import AddProductForm from "./Components/AddProductForm";
import ProductTable from "./Components/ProductList";
import Dashboard from "./Components/Dashboard";
import PurchaseForm from "./Components/PurchaseForm";
import AddVariantForm from "./Components/AddVarientForm";
// import AddStudent from "./Components/AddStudent";
import AddVarientValue from "./Components/AddVarientValue";
import UserPage from "./Components/UserPage";
import CustomAlert from "./Components/CustomAlert";
import Report from "./Components/Report";


function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}></Route>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/dashboard" element ={<Dashboard/>}/>
      <Route path="/addproduct" element={<AddProductForm/>}/>
      <Route path="/producttable" element={<ProductTable/>}/>
      <Route path="/purchase" element={<PurchaseForm/>}/>
      <Route path="/addvariants" element={<AddVariantForm/>}/>
      <Route path="/addvarientvalue" element={<AddVarientValue/>}/>
      <Route path="/search" element={<UserPage/>}/>
      <Route path ="/alert" element={<CustomAlert/>}/>
      <Route path ="/report" element = {<Report/>}/>
    </Routes>
  );
}

export default App;
