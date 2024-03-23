import axios from 'axios';
import React, { useState } from 'react';
import { BsSearch, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillMenuButtonWideFill } from 'react-icons/bs';
import {  useNavigate } from 'react-router-dom';


function Sidebar({ openSidebarToggle }) {
  const [isReportsOpen, setReportsOpen] = useState(false);
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  
  const toggleReportsDropdown = () => {
    setReportsOpen(!isReportsOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/logout')
        .then(res => {
          
            navigate('/')
        }).catch(err => console.log(err))
    }

  return (
    <aside id='sidebar' className={openSidebarToggle ? 'sidebar-responsive' : ''}>
       {openSidebarToggle && typeof openSidebarToggle === 'function' && (
    <div className='close-button' onClick={() => openSidebarToggle(false)}>
      X
    </div>
  )}
      
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <h2>ASSET@INFO</h2>
        </div>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/search" }}>
            <BsSearch className='icon'/> SEARCH
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/producttable" }}>
            <BsFillArchiveFill className='icon' /> PRODUCT@INFO
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/addvarientvalue" }}>
            <BsFillGrid3X3GapFill className='icon' /> ADDVARIANTVALUE
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "#" }}>
            <BsPeopleFill className='icon' /> CUSTOMERS
          </button>
        </li>
        <li className='sidebar-list-items'>
          {/* Dropdown for Reports */}
          <div className={`dropdown ${isReportsOpen ? 'open' : ''}`}>
            <button onClick={toggleReportsDropdown}>
              <BsFillMenuButtonWideFill className='icon' /> REPORTS
            </button>
            {isReportsOpen && (
              <ul className='dropdown-menu animated-dropdown'>
                <li>
                  <button onClick={() => { window.location.href = "/productreport" }}>Products Report</button>
                </li>
                
                <li>
                  <button onClick={() => { window.location.href = "/report" }}>  Complete Report</button>
                </li>
                {/* Add more reports as needed */}
              </ul>
            )}
            </div>
          </li>
        
        <li className='sidebar-list-items' onClick={handleLogout}>
        <button >
            <BsPeopleFill className='icon' /> LOG OUT
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
