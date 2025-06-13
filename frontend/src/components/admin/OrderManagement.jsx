import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const {user}=useSelector((state)=>state.auth);
const {orders, loading, error} = useSelector((state)=>state.adminOrders);

useEffect(() => {
    if( !user && user.role!=='admin'){
        navigate('/');
    } else {
        dispatch(fetchAllOrders());
    }
}, [user, dispatch, navigate]);

      const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({id: orderId, status}));
      };
if (loading) {
    return <p>Loading...</p>;}

    if (error) {
        return <p>Error: {error}</p>; 
    }
            
  return (
    <div className=' max-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                <tr>
                    <th className='px-4 py-3'>Order ID</th>
                    <th className='px-4 py-3'>Customer</th>
                    <th className='px-4 py-3'>Total Price</th>
                    <th className='px-4 py-3'>Status</th>
                    <th className='px-4 py-3'>Created At</th>
                    <th className='px-4 py-3'>Action</th>
                </tr>                    
            </thead>
            <tbody>
                {orders.length > 0 ? 
                orders.map((order) => (
                    <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                        <td className='px-4 py-3'>{order.user.name}</td>
                        <td className='px-4 py-3'>${order.totalPrice.toFixed(2)}</td>
                        <td className='px-4 py-3'>
                            <select 
                                value={order.status} 
                                onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>                                
                            </select>
                        </td>
                        <td className='px-4 py-3'>{new Date(order.createdAt).toLocaleString()}</td>
                        <td className='px-4 py-3'>
                            <button onClick={() => handleStatusChange(order._id,"Delivered") } className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                                Mark as Delivered
                            </button>
                        </td>
                    </tr>
               )) : (
                <tr>
                    <td colSpan={6} className='px-4 py-3 text-center text-gray-500'>No orders found</td>
                </tr>
               )}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default OrderManagement
