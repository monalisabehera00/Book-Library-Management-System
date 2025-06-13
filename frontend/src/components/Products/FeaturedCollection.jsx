import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../../assets/featured.jpg'

const FeaturedCollection = () => {
  return (
   <section className='py-16 px4 lg:px-0'>
    <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
        {/* Left Side */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
            <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                Explore Featured Collection
            </h2>
            <p className='text-4xl lg:text-5xl font-bold text-gray-600 mb-6'>
                Inspired by the world's best authors
            </p>
            <p className='text-lg text-gray-600 mb-6'>
                Discover a wide range of books from various genres and authors. Our curated collection is designed to inspire and educate. Browse now!
            </p>
            <Link to='/collection/all' className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-all'>
                Shop Now
            </Link>
        </div>
        {/* Right Side */}
        <div className='lg:w-1/2 p-6'>
        <img src={featured} alt='Featured Collection' className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
        </div>
    </div>
            

   </section>
  )
}

export default FeaturedCollection
