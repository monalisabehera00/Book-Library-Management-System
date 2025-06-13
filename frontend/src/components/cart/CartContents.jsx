import React, { useContext } from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { CartContext } from '../../context/CartContext'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch();
  // Handle adding or subtracting to cart
  const handleAddToCart = (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({productId, quantity: newQuantity, userId, guestId}));  
    }

  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({productId, guestId, userId}));
  };

  return (
    <div>
      {cart.products.map((product) => (
        <div key={product.productId} className='flex item-start justify-between py-4 border-b'>
          <div className='flex items-center'>
            <img src={product.image} alt={product.name} className='h-24 w-20 object-cover mr-4'/>
            <div>
              <h3 className='text-sm text-gray-500'>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <div className='flex items-center mt-2'>
                  <button 
                    onClick={() => handleAddToCart(product.productId,-1, product.quantity)}
                    className='border rounded px-2 text-xl font-medium'
                  >-</button>
                  <span className='mx-4'>{product.quantity}</span>
                  <button 
                    onClick={() => handleAddToCart(product.productId,1, product.quantity)}
                    className='border rounded px-2 text-xl font-medium'
                  >+</button>
              </div>
            </div>
          </div>
          <div>
            <p className='font-medium'>$ {(product.price).toFixed(2)}</p>
            <button onClick={() => handleRemoveFromCart(product.productId)}>
              <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
