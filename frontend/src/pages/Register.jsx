import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from '../assets/register.jpg'
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location= useLocation();
    const {user, guestId, loading}= useSelector((state) => state.auth );
    const cart = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something else
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const isCheckoutRedirect = redirect.includes('checkout');
    useEffect(() => {
        if (user) {
            if (cart.cart.products.length > 0 && guestId) {
              dispatch(mergeCart({ guestId, user})).then(() => {
                navigate(isCheckoutRedirect? '/checkout' : '/');
              });
              
            } else {
                navigate(isCheckoutRedirect? '/checkout' : '/'); }
        } 
    }, [user, cart, guestId, navigate, dispatch, isCheckoutRedirect])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password, confirmPassword }));
    };

    return (
        <div className='flex'>
            <div className='w-full md:w-full justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-md:w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium text-gray-800'>Book Store</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>Create Account 📚</h2>
                    <p className='text-center text-gray-600 mb-6'>
                        Join our community of book lovers!
                    </p>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='Name'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='Name' value={name} onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your name'
                            className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                        />
                        <label htmlFor='email' className='block text-sm text-gray-700 font-semibold mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email' 
                            className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm text-gray-700 font-semibold mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='confirmPassword' className='block text-sm text-gray-700 font-semibold mb-2'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            placeholder='Confirm your password'
                            className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <button
                            type='submit'
                            className='w-full bg-black text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all'
                        >
                            {loading? "loading....":'Register'}
                        </button>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm text-center mt-6'>
                            Already have an account?{' '}
                            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 hover:underline'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className='w-1/2 hidden md:block bg-gray-800'>
                <div className='flex flex-col justify-center items-center h-full'>
                    <img src={register} alt='register account' className='h-[750] w-full object-cover object-center' />
                </div>
            </div>
        </div>
    )
}

export default Register