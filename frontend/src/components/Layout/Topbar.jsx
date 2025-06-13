import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const Topbar = () => {
  return (
    <div className="bg-primary-red text-white py-2">
      <div className='container mx-auto px-4 flex justify-between items-center py-3'>
        <div className='hidden md:flex items-center space-x-4'>
            <a href='https://www.facebook.com' target='_blank' rel="nooperner norefeffer " className='hover:text-gray-300 transition-colors'>
              <TbBrandMeta className="h-5 w-5"/> 
            </a>
            <a href='https://www.instagram.com' target='_blank' rel="nooperner norefeffer " className='hover:text-gray-300 transition-colors'>
              <IoLogoInstagram className="h-5 w-5"/> 
            </a>
            <a href='https://www.twitter.com' target='_blank' rel="nooperner norefeffer " className='hover:text-gray-300 transition-colors'>
              <RiTwitterXLine className="h-4 w-4"/> 
            </a>
             
        </div>
        <div className='text-sm text-center flex-grow'>
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className='text-sm hidden md:block'></div>
        <a href='tel:6299760879' className='hover:text-gray-300 hidden md:block'>+91 6299760879</a>
      </div>
    </div>
  )
}

export default Topbar
