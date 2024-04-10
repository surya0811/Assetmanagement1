import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/loginform";
import RegistrationForm from "./Components/registration";
import AddProductForm from "./Components/NewAddProduct";
import ProductTable from "./Components/ProductList";
import Dashboard from "./Components/Dashboard";
import PurchaseForm from "./Components/PurchaseForm";
import AddVariantForm from "./Components/AddVarientForm";
import AddVarientValue from "./Components/AddVarientValue";
import UserPage from "./Components/UserPage";
import CustomAlert from "./Components/CustomAlert";
import Report from "./Components/Report";
import Report1 from "./Components/Report1";
import ProductReport from "./Components/ProductReport";
import ResetPassword from "./Components/ForgotPasswordForm";
import ResetPasswordPage from './Components/ResetPasswordPage';
import Step3Form from './Components/Step3Form';
import Search from './Components/Search';
import Sidebar1 from './Components/Sidebar1';
import VariantReport from "./Components/VariantReport";
import UserSearch from "./Components/UserSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/search" element={<Search/>}/>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<AddProductForm />} />
      <Route path="/producttable" element={<ProductTable />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/addvariants" element={<AddVariantForm />} />
      <Route path="/addvarientvalue" element={<AddVarientValue />} />
      <Route path="/search" element={<UserPage />} />
      <Route path="/alert" element={<CustomAlert />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report1" element={<Report1 />} />
      <Route path="/VariantReport" element={<VariantReport />} />
      <Route path="/productreport" element={<ProductReport />} />
      <Route path="/resetpassword" element={<ResetPassword/>}/>
      <Route path="/reset-password/:emailOrPhone" element={<ResetPasswordPage />} />
      <Route path="/step3Form" element={<Step3Form/>}/>
      <Route path="/sidebar" element={<Sidebar1/>}/>
      <Route path="/UserSearch" element={<UserSearch/>}/>
      
      
    </Routes>
  );
}

export default App;
