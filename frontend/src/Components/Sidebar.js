import React, { useState } from 'react';
import { BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillMenuButtonWideFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle }) {
  const [isReportsOpen, setReportsOpen] = useState(false);

  const toggleReportsDropdown = () => {
    setReportsOpen(!isReportsOpen);
  };

  return (
    <aside id='sidebar' className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <Link to="/purchase">
            <BsCart3 className='icon_header' /> Purchase
          </Link>
        </div>
        <span className='icon close_icon'>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-items'>
          <Link to="/producttable">
            <BsFillArchiveFill className='icon' /> product
          </Link>
        </li>
        <li className='sidebar-list-items'>
          <Link to="/addvarientvalue">
            <BsFillGrid3X3GapFill className='icon' /> AddVarientsValue
          </Link>
        </li>
        <li className='sidebar-list-items'>
          <Link to="#">
            <BsPeopleFill className='icon' /> Customers
          </Link>
        </li>
        <li className='sidebar-list-items'>
          {/* Dropdown for Reports */}
          <div className='dropdown'>
            <span onClick={toggleReportsDropdown}>
              <BsFillMenuButtonWideFill className='icon' /> Reports
            </span>
            {isReportsOpen && (
              <ul className='dropdown-menu'>
                <li>
                  <Link to='/productreport'>Products report</Link>
                </li>
                <li>
                  <Link to='/report2'>Report 2</Link>
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
