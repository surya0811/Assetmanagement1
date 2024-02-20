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
import ProductReport from "./Components/ProductReport";
import ResetPassword from "./Components/ForgotPasswordForm";
import ResetPasswordPage from './Components/ResetPasswordPage';
import Step3Form from './Components/Step3Form';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
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
      <Route path="/productreport" element={<ProductReport />} />
      <Route path="/resetpassword" element={<ResetPassword/>}/>
      <Route path="/reset-password/:emailOrPhone" element={<ResetPasswordPage />} />
      <Route path="/step3Form" element={<Step3Form/>}/>
    </Routes>
  );
}

export default App;
