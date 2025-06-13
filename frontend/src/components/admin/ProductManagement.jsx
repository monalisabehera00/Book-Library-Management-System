import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductsSlice';

const ProductManagement = () => {
const dispatch = useDispatch();
const {products, loading, error} = useSelector((state)=>state.adminProducts);

useEffect(() => {
    dispatch(fetchAdminProducts()); 
 }, [dispatch])
      
    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id));
        } 
    };

if (loading) {  return <p>Loading...</p>; }
if (error) {    return <p>Error: {error}</p>; }   

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-3xl font-bold mb-4'>Product Management</h2>
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='px-6 py-3'>ID</th>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Price</th>
                            <th className='px-6 py-3'>SKU</th>
                            <th className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='px-6 py-4 font-medium text-gray-900'>{product._id}</td>
                                    <td className='px-6 py-4'>{product.name}</td>
                                    <td className='px-6 py-4'>${product.price}</td>                    
                                    <td className='px-6 py-4'>{product.sku}</td>
                                    <td className='px-6 py-4'>
                                        <Link to={`/admin/products/${product._id}/edit`}
                                            className="bg-yellow-500 text-white px-2 py-1 mr-2 hover:bg-yellow-600 rounded-md">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded">
                                            Delete 
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement
