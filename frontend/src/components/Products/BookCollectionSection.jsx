import React from 'react'
import { Link } from 'react-router-dom'

import Action_book from '../../assets/Action-Book.jpg'
import Drama_book from '../../assets/Drama-book.jpg'

const BookCollectionSection = () => {
  return (
    <section className='py-16 px-12 lg:px-0 bg-gray-50'>
      <h1 className='text-3xl md:text-4xl font-bold text-center mb-8 underline text-primary-red'>Book Collections</h1>
      <div className='container mx-auto flex flex-col md:flex-row gap-8'>
        <div className='relative flex-1'>
          <div className='text-3xl md:text-4xl font-bold text-center mb-8'>Action-Books</div>
          <img src={Action_book} alt="Featured Books" className="object-cover h-[700px] w-full" />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Best Sellers Action-Books</h2>
            <Link to="/collection/all?book=action" className='text-gray-900 hover:text-black transition-colors underline'>Action-Genre</Link>
          </div>
        </div>
        <div className='relative flex-1'>
          <div className='text-3xl md:text-4xl font-bold text-center mb-8'>Comedy-Books</div>
          <img src={Drama_book} alt="Comedy Books" className="object-cover h-[700px] w-full" />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Best Sellers Comedy-Books</h2>
            <Link to="/collection/all?book=comedy" className='text-gray-900 hover:text-black transition-colors underline'>Comedy-Genre</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookCollectionSection
