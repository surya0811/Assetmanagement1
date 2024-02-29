import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'; // Correct the import path
import './App1.css';
import {  useNavigate } from 'react-router-dom';

function Header({OpenSidebar}){

  const navigate=useNavigate()
  const handlesearch =()=>{
    navigate('/search')
  }
  return (
    <div className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left cursor-pointer'>
        <BsSearch onClick={handlesearch} className='icon' />
      </div>
      <div className='header-center'>
          <h1 className='animated-text'>ASSET MANAGEMENT SYSTEM</h1>
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
    </div>
  );
}

export default Header;
