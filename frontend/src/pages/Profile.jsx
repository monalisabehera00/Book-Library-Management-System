import React, { useEffect } from 'react'
import MyOrdersPages from './MyOrdersPages'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/authSlice'
import { getUserProfile } from '../redux/slices/userSlice'
import { clearCart } from '../redux/slices/cartSlice'

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userInfo, loading } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getUserProfile());
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className='min-h-screen'>
        <div className='max-w-7xl mx-auto p-4 md:p-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Left Section */}
            <div className='w-full md:w-1/3 lg:w-1/4'>
              <div className='shadow-md rounded-lg p-6 bg-white'>
                <h1 className='text-2xl font-bold text-gray-900 md:text-3xl mb-4'>{user?.name}</h1>
                <p className='text-gray-600 mb-4'>{user?.email}</p>
                <button 
                  onClick={handleLogout}
                  className='w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all'
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Right Section: Orders Table */}
            <div className='w-full md:w-2/3 lg:w-3/4'>
              <div className='shadow-md rounded-lg p-6 bg-white'>
                <h1 className='text-2xl font-bold text-gray-900 md:text-3xl mb-4'>Your Orders</h1>
                <MyOrdersPages/>
              </div>
            </div>
          </div>
        </div>
                
    </div>
  )
}

export default Profile
