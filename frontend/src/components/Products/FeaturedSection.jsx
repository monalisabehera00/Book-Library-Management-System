import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeaturedSection = () => {
  return (
    <section className='py-16 px-4  bg-white lg:px-0'>
        <div className="container mx-auto grid grid-cols-3 gap-8 text-center mb-10 relative">
            {/*Featured 1*/}
           <div className='flex flex-col items-center'> 
               <div className='p-4 rounded-full mb-4'>
                <HiShoppingBag className='text-xl text-gray-600'/>
               </div>
               <h4 className='tracking-tighter mb-2'>
                Free Shipping
               </h4>
               <p className='text-gray-600 text-sm tracking-tighter'>
                On all orders over $100
               </p>
           </div>
           {/*Featured 2*/}
           <div className='flex flex-col items-center'>
               <div className='p-4 rounded-full mb-4'>
                <HiArrowPathRoundedSquare className='text-xl text-gray-600'/>
               </div>
               <h4 className='tracking-tighter mb-2'>
                Return Policy
               </h4>
               <p className='text-gray-600 text-sm tracking-tighter'>
                30 Days Money Back
               </p>
           </div>
           {/*Featured 3*/}
           <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4'>
                <HiOutlineCreditCard className='text-xl text-gray-600'/>
            </div>
            <h4 className='tracking-tighter mb-2'>
                Secure Payment
            </h4>
            <p className='text-gray-600 text-sm tracking-tighter'>
                100% Secure Payment
            </p>
           </div>
        </div>
    </section>

  )
}

export default FeaturedSection
