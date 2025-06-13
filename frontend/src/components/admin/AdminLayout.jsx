import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* Mobile Toggle Button */}
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
            <button onClick={toggleSidebar} className='md:hidden'>
                <FaBars size={24}/>
            </button>
            <h1 className='ml-4 text-lg font-medium'>Admin Dashboard</h1>
        </div>
        {/* Overlay for Mobile sidebar */}
        {sidebarOpen && (
        <div className='fixed inset-0 bg-black opacity-50 z-10 md:hidden' onClick={toggleSidebar}></div>)}
        {/* Sidebar */}
        <div className={`w-64 min-h-screen bg-gray-900 text-white absolute md:relative transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 z-20`}>
            <AdminSidebar />
        </div>
        {/* Main Content */}
        <div className='flex-grow p-6 overflow-auto'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout
