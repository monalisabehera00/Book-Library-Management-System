import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { MdOutlineLocalGroceryStore } from "react-icons/md";


const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const {cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;
    

    const toggleCartDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };
    const toggleNavDrawer = () => {
      setNavDrawerOpen(!navDrawerOpen);
    };

    return (
    <>
    <nav className='container mx-auto py-4 px-6'>
      <div className='flex justify-between items-center'>
        {/* Left Logo */}
        <div className='flex items-center w-1/4 gap-2'>
          {/* Logo */}
          <MdOutlineLocalGroceryStore className="h-6 w-6 text-gray-700" />
          <Link to="/" className='text-2xl font-medium'>BookStore</Link>
        </div>

        {/* Center Navigation Links */}
        <div className='hidden md:flex justify-center space-x-6 w-2/4'>
          <Link to="/best-seller" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Best Seller</Link>
          <Link to="/newarrivals" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>New Arrivals</Link>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Categories</Link>
          <Link to="/about-us" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>About Us</Link>
          <Link to="/contact-us" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Contact Us</Link>
        </div>

        {/* Right Icons */}
        <div className='flex items-center space-x-4'>
          {user && user.role === 'admin' && (
          <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white' >Admin</Link>
        )}
          <Link to="/profile" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            <HiOutlineUser className='h-6 w-6 text-gray-700'/>
          </Link>
          <button onClick={toggleCartDrawer} className='relative hover:text-black'>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
            {cartItemCount > 0 &&(
              <span className='absolute -top-1 -right-1 bg-primary-red text-white rounded-full h-4 w-4 text-xs flex items-center justify-center'>
              {cartItemCount}
            </span>
            ) }
            
          </button>
          <div className='overflow-hidden'>
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className='md:hidden text-gray-700 hover:text-black'>
            <HiBars3BottomRight className='h-6 w-6' />
          </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out md:hidden ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg z-50`}>
        <div className='flex justify-between items-center p-4 border-b'>
          <span className='text-gray-800 hover:text-black text-sm font-medium uppercase'>Menu</span>
          <button onClick={() => setNavDrawerOpen(false)} className='text-gray-600 hover:text-black'>
            <IoMdClose className='h-6 w-6' />
          </button>
        </div>
        <div className='px-4 py-2 space-y-3'>
          <Link to="/best-seller" className='block py-2 text-gray-700 hover:text-black text-sm font-medium uppercase border-b border-gray-200'>
            Best Seller
          </Link>
          <Link to="/newarrivals" className='block py-2 text-gray-700 hover:text-black text-sm font-medium uppercase border-b border-gray-200'>
            New Arrivals
          </Link>
          <Link to="/collections/all" className='block py-2 text-gray-700 hover:text-black text-sm font-medium uppercase border-b border-gray-200'>
            Categories
          </Link>
          <Link to="/about-us" className='block py-2 text-gray-700 hover:text-black text-sm font-medium uppercase border-b border-gray-200'>
            About Us
          </Link>
          <Link to="/contact-us" className='block py-2 text-gray-700 hover:text-black text-sm font-medium uppercase border-b border-gray-200'>
            Contact Us
          </Link>          
        </div>
      </div>
      </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  )
}

export default Navbar
