import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrdersPages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

    const handleRowClick = (orderId) => {
      navigate(`/orders/${orderId}`);     
    }

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      ); 
    }

    return (
    <div className='max-w-7xl mx-auto sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
      <div className='relative overflow-hidden shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
            <tr>
                <th className='px-4 py-2 sm:py-3'>Image</th>
                <th className='px-4 py-2 sm:py-3'>OrderId</th>
                <th className='px-4 py-2 sm:py-3'>CreatedAt</th>
                <th className='px-4 py-2 sm:py-3'>ShippingAddress</th>
                <th className='px-4 py-2 sm:py-3'>Items</th>
                <th className='px-4 py-2 sm:py-3'>Price</th>
                <th className='px-4 py-2 sm:py-3'>Status</th>
                </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}
                onClick={()=> handleRowClick(order._id)} 
                className='border-b hover:border-gray-50 cursor-pointer'>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-10 h-10 sm:w-12 object-cover rounded-full' /> 
                  </td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>{order._id}</td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>{new Date(order.createdAt).toLocaleString()}{" "}
                                                            {new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>{order.shippingAddress && order.shippingAddress.city && order.shippingAddress.state ? ` (${order.shippingAddress.city},${order.shippingAddress.state})` : 'N/A'}</td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>{order.orderItems.length}</td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>${order.totalPrice}</td>
                  <td className='px-2 py-2 sm:py-4 sm:px-4'>
                    <div className="flex flex-col gap-1">
                      <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium inline-block text-center`}>
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>
                      <span className={`${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'} px-2 py-1 rounded-full text-xs sm:text-sm font-medium inline-block text-center`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='px-4 py-4 text-center text-gray-500'>No orders yet.</td> 
              </tr>
            )}
          </tbody>
          </table>
        </div>
            
    </div>
  )
}

export default MyOrdersPages
