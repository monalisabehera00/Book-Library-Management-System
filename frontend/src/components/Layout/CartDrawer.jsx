import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../cart/CartContents'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {
  const navigate = useNavigate();
  const {user, guestId} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
  const userId = user? user._id : null;


  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) 
    {navigate('/login?redirect=checkout');}
    else
    {navigate('/checkout');}
  };
  return (
    <div className={`fixed top-0 right-0 w-full sm:w-[80%] md:w-[30rem] h-full bg-white
    transform transition-transform duration-300 flex flex-col z-50
    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/*Close button*/}
      <div className='flex justify-between items-center p-4 border-b'>
        <button onClick={toggleCartDrawer} className='text-gray-600 hover:text-gray-800'>
          <IoMdClose className="h-6 w-6 text-gray-600"/> 
        </button>
      </div>
      {/*Cart content with scrollable area*/} 
      <div className='flex-grow overflow-y-auto px-4'>
      <h2 className='text-xl font-semibold'>Your Cart</h2>
        {cart && cart?.products?.length > 0 ? ( <CartContents cart={cart} userId={userId} guestId={guestId} />):(
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        )}
       
        {/*Components for Cart Contents*/}
      </div>
        {/*Checkout button fixed at the bottom*/}
        <div className='p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
          {cart && cart?.products?.length > 0 &&(
          <>
             <button 
             onClick={handleCheckout}
             className='w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition text-lg'
           >
             Checkout
           </button>
           <p className='text-sm tracking-tighter text-gray-500 mt-3 text-center'>
             Shipping, taxes and discount codes calculated at checkout.
           </p>
          </>
          )}
         
        </div>
    </div>
  )
}

export default CartDrawer
