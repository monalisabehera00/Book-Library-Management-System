import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../redux/slices/orderSlice';

const OrdersDetailPage = () => {
const { id } = useParams();
const dispatch = useDispatch();
const{orderDetail, loading, error} = useSelector((state) => state.orders);

useEffect(() => {
    dispatch(fetchOrderDetails(id));
}, [dispatch, id]);

if (loading) {
    return <div>Loading...</div> ; }
if (error) {   
    return <div>Error: {error}</div>; }

 
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h1 className='text-2xl font-bold mb-6 md:text-3xl'>Order Detail</h1>
        {!orderDetail ? (
            <p>No Orders Detail Found</p> 
            ) : (<div className='p-4 sm:p-6 rounded-lg border'>{/*Order Info*/}
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold text-gray-600'>Order ID:</h3>
                        <p className='text-gray-600'>{new Date(orderDetail.createdAt).toLocaleString()}</p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end sm:mt-0'>
                        <span className={`${orderDetail.isPaid ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} px-3 py-1 rounded-full text-sm mb-2`}>
                            {orderDetail.isPaid ? 'Appoved' : 'Pending'}
                        </span>
                        <span className={`${orderDetail.isDelivered ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'} px-3 py-1 rounded-full text-sm`}>
                            {orderDetail.isDelivered? 'Delivered' : 'Pending Delivery'}
                        </span>
                    </div>
                </div>
                {/*Customer Payement,Shipping info*/}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment Info:</h4>
                        <p>Payment Method: {orderDetail.paymentMethod}</p>
                        <p>Status : {orderDetail.isPaid ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Shipping Info:</h4>
                        <p>Shipping Method: {orderDetail.shippingMethod}</p>
                        <p>Address: {`${orderDetail.shippingAddress.address}, ${orderDetail.shippingAddress.city}`}</p>
                    </div>
                    {/*Product List*/}
                    <div className='overflow-x-auto col-span-full'>
                        <h4 className='text-lg font-semibold mb-4'>Products:</h4>
                        <table className='w-full text-gray-600'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='py-2 px-4'>Product</th>
                                    <th className='py-2 px-4'>Price</th>
                                    <th className='py-2 px-4'>Quantity</th>
                                    <th className='py-2 px-4'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.orderItems.map((item) => (
                                <tr key={item.productId} className='border-b'>
                                    <td className='py-2 px-4 flex items-center'>
                                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                                        <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>
                                        {item.name}
                                        </Link>
                                    </td>
                                    <td className='py-2 px-4'>${item.price}</td>
                                    <td className='py-2 px-4'>{item.quantity}</td>
                                    <td className='py-2 px-4'>${item.price * item.quantity}</td>
                                </tr>
                                 ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*Back to Order Link*/}
                <Link to="/my-orders" className='block text-blue-500 hover:underline mt-4'>
                    Back to Orders
                </Link>
                </div>
        )}
    </div>
  );
};

export default OrdersDetailPage;
