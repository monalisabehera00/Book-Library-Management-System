import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { TbBrandMeta, TbPhoneCall } from 'react-icons/tb'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12 px-6'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 lg:px-0'>
        {/* Company Info */}
        <div>
          <h3 className='text-xl font-bold mb-6'>BookStore</h3>
          <p className='text-gray-300 mb-4'>
            Your premier destination for books across all genres. Discover, learn, and explore with our carefully curated collection.
          </p>
          <div className='flex items-center text-gray-300'>
            <TbPhoneCall className='mr-2'/>
            +91-6299760879
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-xl font-bold mb-6'>Quick Links</h3>
          <ul className='space-y-3'>
            <li>
              <Link to='/' className='text-gray-300 hover:text-white transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/' className='text-gray-300 hover:text-white transition-colors'>
                Shop
              </Link>
            </li>
            <li>
              <Link to='/blog' className='text-gray-300 hover:text-white transition-colors'>
                Blog
              </Link>
            </li>
            <li>
              <Link to='/about-us' className='text-gray-300 hover:text-white transition-colors'>
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className='text-xl font-bold mb-6'>Customer Service</h3>
          <ul className='space-y-3'>
            <li>
              <Link to='/contact-us' className='text-gray-300 hover:text-white transition-colors'>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to='/#' className='text-gray-300 hover:text-white transition-colors'>
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to='/#' className='text-gray-300 hover:text-white transition-colors'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to='/#' className='text-gray-300 hover:text-white transition-colors'>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className='text-xl font-bold mb-6'>Stay Connected</h3>
          <p className='text-gray-300 mb-4'>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className='flex flex-col gap-3'>
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red'
            />
            <button 
              type='submit' 
              className='bg-primary-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
            >
              Subscribe
            </button>
          </form>
          <div className='flex items-center mt-6 space-x-4'>
            <a href='https://www.facebook.com' target='_blank' rel="noopener noreferrer" className='text-gray-300 hover:text-white transition-colors'>
              <TbBrandMeta className='h-6 w-6' />
            </a>
            <a href='https://www.instagram.com' target='_blank' rel="noopener noreferrer" className='text-gray-300 hover:text-white transition-colors'>
              <IoLogoInstagram className='h-6 w-6' />
            </a>
            <a href='https://www.twitter.com' target='_blank' rel="noopener noreferrer" className='text-gray-300 hover:text-white transition-colors'>
              <RiTwitterXLine className='h-5 w-5' />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-800 pt-8'>
        <p className='text-gray-300 text-center text-sm'>
          © {new Date().getFullYear()} BookStore. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
