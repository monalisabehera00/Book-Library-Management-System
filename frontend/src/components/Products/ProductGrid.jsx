import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({products, loading, error}) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product, index) => (
        <Link key={index} to={product?._id ? `/products/${product._id}` : '#'} className="block">
            <div className='bg-white rounded-lg p-4'>
                <div className='w-full h-96 mb-4'>
                    <img src={product.images[0].url} alt={product.ti} className='w-full h-full object-cover rounded-lg'/>
                </div>
                <h3 className='text-sm font-semibold text-gray-900 mb-2'>
                    {product.name}
                </h3>
                <p className='text-sm font-medium tracking-tighter text-gray-500 mb-2'>
                    ${product.price ? product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                </p>
            </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
