import React, { useEffect, useState } from 'react';
import Header from './Header'; 
import Sidebar from './Sidebar'; 
import Home from './Home'; 
import './App1.css'
import axios from 'axios';

const Dashboard = () => {
    useEffect(() => {
        axios.get('http://localhost:3000/dashboard')
            .then(response => {
                // Handle the response data here
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, []);
    

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} />
            <Home />
        </div>
    );
};

export default Dashboard;
