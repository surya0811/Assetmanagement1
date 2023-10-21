import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import ProductList from './ProductList'; 
import { useState } from 'react';
import UserPage from './UserPage';

function App() {
  return (
    <div>
    <ProductList /> 
    <UserPage/>
    </div>
  );
}




//   const [openSidebarToggle,setOpenSidebarToggle]=useState(false)
//   const OpenSidebar=()=>{
//     setOpenSidebarToggle(!openSidebarToggle)
//   }
//  return (
//    <div className='grid-container'>
//     <Header openSidebar={OpenSidebar} />
//     <Sidebar openSidebarToggle={openSidebarToggle} />
//     <Home />
    
//    </div>
//   )
// }


export default App
