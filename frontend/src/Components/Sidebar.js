import React from 'react'
import {BsCart3,BsFillArchiveFill,BsFillGrid3X3GapFill,BsPeopleFill,BsFillMenuButtonWideFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';


function Sidebar({openSidebarToggle}){
  return (
    <aside id='sidebar'className={openSidebarToggle ? "sidebar-responsive":''}>  
         <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3 className='icon_header'/> Purchase
            </div>
            <span className='icon close_icon'>X</span>
         </div>

         <ul className='sidebar-list'>
            {/* <li className='sidebar-list-items'>
                
            <Link to ="#">
                <BsGrid1X2Fill className='icon'/>DashBoard
            </Link>
            </li> */}
            <li className='sidebar-list-items'>
            <Link to ="/producttable">
                <BsFillArchiveFill className='icon'/>product
            </Link>
            </li>  
             <li className='sidebar-list-items'>
            <Link to ="/addvarientvalue">
                <BsFillGrid3X3GapFill className='icon'/>AddVarientsValue
            </Link>
            </li>  
             <li className='sidebar-list-items'>
            <Link to ="#">
                <BsPeopleFill className='icon'/>Customers
            </Link>
             </li> 
            {/* <li className='sidebar-list-items'>
            <Link to ="#">
                <BsListCheck className='icon'/>Inventory
            </Link>
            </li>  */}
             <li className='sidebar-list-items'> 
            <Link to ="#">
                <BsFillMenuButtonWideFill className='icon'/>Reports
            </Link>
            </li>
            {/* <li className='sidebar-list-items'>
            <Link to ="#">
                <BsFillGearFill className='icon'/>Settings
            </Link>
            </li> */}
         </ul>
      </aside>
 
  )

}

export default Sidebar