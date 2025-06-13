import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PayPalButton from './PayPalButton';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('paypal'); // Default to PayPal
  const [shippingAddress, setShippingAddress] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    phone: '',
    country: 'United States'
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCartCheckOut = async (e) => {
    e.preventDefault();
    if (!cart || cart.products.length === 0) return;

    const res = await dispatch(createCheckout({
      checkoutItems: cart.products,
      shippingAddress,
      paymentMethod,
      totalPrice: cart.totalPrice,
      isPaid: paymentMethod === 'cod', // Mark as paid if COD
      paidAt: paymentMethod === 'cod' ? new Date() : null,
    }));

    if (res.payload && res.payload._id) {
      setCheckoutId(res.payload._id);

      if (paymentMethod === 'cod') {
        await handleFinalisedCheckout(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: 'paid',
          paymentDetails: details,
          paymentMethod: 'paypal'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        });

      await handleFinalisedCheckout(checkoutId);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleFinalisedCheckout = async (checkoutId) => {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error finalising checkout:', error);
    }
  };

  if (loading) return <div>Loading Cart...</div>;
  if (error) return <div>Error loading cart: {error}</div>;
  if (!cart || !cart.products || cart.products.length === 0) return <div>No items in the cart.</div>;

  const totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='flex'>
      {/* Left Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleCartCheckOut} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
          <h2 className='text-2xl font-bold text-center mb-4 text-gray-800 uppercase'>Checkout</h2>

          {/* Contact Details */}
          <div className='mb-4'>
            <h3 className='text-lg font-semibold mb-4'>Contact Details</h3>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm text-gray-700 font-semibold mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={shippingAddress.email || user?.email || ''}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>
          </div>

          {/* Delivery Info */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-4'>Delivery</h3>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <input name='firstName' value={shippingAddress.firstName} onChange={handleChange} placeholder='First Name' className='p-2 border rounded' required />
              <input name='lastName' value={shippingAddress.lastName} onChange={handleChange} placeholder='Last Name' className='p-2 border rounded' required />
            </div>
            <input name='address' value={shippingAddress.address} onChange={handleChange} placeholder='Address' className='w-full mb-4 p-2 border rounded' required />
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <input name='city' value={shippingAddress.city} onChange={handleChange} placeholder='City' className='p-2 border rounded' required />
              <input name='postalCode' value={shippingAddress.postalCode} onChange={handleChange} placeholder='Postal Code' className='p-2 border rounded' required />
            </div>
            <input name='state' value={shippingAddress.state} onChange={handleChange} placeholder='State' className='w-full mb-4 p-2 border rounded' required />
            <input name='phone' value={shippingAddress.phone} onChange={handleChange} placeholder='Phone' className='w-full mb-4 p-2 border rounded' required />
          </div>

          {/* Payment Method */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Payment Method</h3>
            <div className='flex flex-col gap-2'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='paypal'
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='mr-2'
                />
                PayPal
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='cod'
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='mr-2'
                />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          {/* Submit or PayPal */}
          <div className='mt-6'>
            {!checkoutId || paymentMethod === 'cod' ? (
              <button
                type='submit'
                className='w-full bg-black text-white font-semibold py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring transition-all'
              >
                {paymentMethod === 'cod' ? 'Place Order (COD)' : 'Continue to PayPal'}
              </button>
            ) : (
              <div>
                <h3 className='text-lg mb-4'>Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed! Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className='w-full md:w-1/2 p-6 rounded-lg bg-gray-50'>
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className='border-t py-4 mb-4'>
          {cart.products.map((product) => (
            <div key={product._id} className='flex justify-between items-start py-2 border-b'>
              <div className='flex items-start'>
                <img src={product.image} alt={product.name} className='w-30 h-24 object-contain mr-4' />
                <div>
                  <h3 className='text-md'>{product.name}</h3>
                  <p className='text-sm text-gray-500'>Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className='text-xl'>${(product.price * product.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
          <p>Subtotal:</p>
          <p>${totalPrice.toLocaleString()}</p>
        </div>
        <div className='flex justify-between items-center text-lg'>
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className='flex justify-between items-center text-lg border-t pt-4 mt-4'>
          <p>Total</p>
          <p>${totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
