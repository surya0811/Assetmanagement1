import axios from 'axios';
import React, { useState } from 'react';
import { BsSearch, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
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
          <button onClick={() => { window.location.href = "/sidebar" }}>
            <BsPeopleFill className='icon' /> REPORTS
          </button>
        </li>
        {/* <li className='sidebar-list-items'>
         
          <div className={`dropdown ${isReportsOpen ? 'open' : ''}`}>
            <button onClick={toggleReportsDropdown}>
              <BsFillMenuButtonWideFill className='icon' /> REPORTS
            </button>
            {isReportsOpen && (
              <ul className='dropdown-menu animated-dropdown'>
                <li>
                  <button onClick={() => { window.location.href = "/report" }}>Products Report</button>
                </li>
                
                <li>
                  <button onClick={() => { window.location.href = "/productreport" }}>  Complete Report</button>
                </li>
               
              </ul>
            )}
            </div>
          </li> */}
        
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
