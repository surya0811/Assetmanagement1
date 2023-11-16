import React, { useState } from 'react';
import { BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillMenuButtonWideFill } from 'react-icons/bs';


function Sidebar({ openSidebarToggle }) {
  const [isReportsOpen, setReportsOpen] = useState(false);

  const toggleReportsDropdown = () => {
    setReportsOpen(!isReportsOpen);
  };

  return (
    <aside id='sidebar' className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <h2>ASSET@INFO</h2>
        </div>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/purchase" }}>
            <BsCart3 className='icon'/> Purchase
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/producttable" }}>
            <BsFillArchiveFill className='icon' /> product
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "/addvarientvalue" }}>
            <BsFillGrid3X3GapFill className='icon' /> AddVarientsValue
          </button>
        </li>
        <li className='sidebar-list-items'>
          <button onClick={() => { window.location.href = "#" }}>
            <BsPeopleFill className='icon' /> Customers
          </button>
        </li>
        <li className='sidebar-list-items'>
          {/* Dropdown for Reports */}
          <div className={`dropdown ${isReportsOpen ? 'open' : ''}`}>
            <button onClick={toggleReportsDropdown}>
              <BsFillMenuButtonWideFill className='icon' /> Reports
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
      </ul>
    </aside>
  );
}

export default Sidebar;
