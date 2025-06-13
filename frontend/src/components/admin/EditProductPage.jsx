import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../redux/slices/productsSlice';
import axios from 'axios';
import { useEffect } from 'react';

const EditProductPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}= useParams();
  const {selectedProduct, loading, error} = useSelector((state)=>state.products);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    image: [],
    brand: '',
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    reviews: []
  });

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if(id && id !== 'undefined'){
      dispatch(fetchProductDetails(id))
    } else {
      navigate('/admin/products');
    }
  }, [dispatch, id, navigate])

  useEffect(() => {
    if(selectedProduct){
      setProductData(selectedProduct)
    }  
  }, [selectedProduct])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProductData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // TODO: Implement image upload logic
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true); 
      const data = await axios.post(`${import.meta.env.VITE_BACKEND-URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProductData(prevData => ({
        ...prevData,
        image: [...prevData.image, {url: data.imageURL, altText:""}],
        
      }));
      setUploading(false);
    }
    catch(error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Product data:', productData)
    // Add API call here to update product
    dispatch(updateProduct({id, productData}));
    navigate('/admin/products');
  }
  if (loading) { return <p>Loading...</p>   }
  if (error) { return <p>Error: {error}</p> }

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={productData.name}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              required
            />
          </div>

          <div>
            <label htmlFor='sku' className='block text-gray-700 font-bold mb-2'>
              SKU
            </label>
            <input
              type='text'
              id='sku'
              name='sku'
              value={productData.sku}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              required
            />
          </div>

          <div>
            <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              value={productData.price}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              min='0'
              step='0.01'
              required
            />
          </div>

          <div>
            <label htmlFor='countInStock' className='block text-gray-700 font-bold mb-2'>
              Count in Stock
            </label>
            <input
              type='number'
              id='countInStock'
              name='countInStock'
              value={productData.countInStock}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              min='0'
              required
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-gray-700 font-bold mb-2'>
              Category
            </label>
            <input
              type='text'
              id='category'
              name='category'
              value={productData.category}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              required
            />
          </div>

          <div>
            <label htmlFor='brand' className='block text-gray-700 font-bold mb-2'>
              Brand
            </label>
            <input
              type='text'
              id='brand'
              name='brand'
              value={productData.brand}
              onChange={handleChange}
              className='w-full p-2 border rounded-md border-gray-300'
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={productData.description}
            onChange={handleChange}
            className='w-full p-2 border rounded-md border-gray-300'
            rows='4'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='image' className='block text-gray-700 font-bold '>
            Upload Image
            </label>
            <input type="file" id="image" name="image" onChange={handleImageUpload} />
            {uploading && <p>Uploading image...</p>}
            <div className='flex mt-4 gap-4'>
              {productData.image && productData.image.length > 0 && productData.image.map((image, index) => (
                <img key={index} src={image.url} alt={`Product Image ${index + 1}`} className='w-20 h-20 shadow object-cover rounded-md' />  
              ))}
            </div>
        </div>

        <div>
          <label className='block text-gray-700 font-bold mb-2'>
            Featured Product
          </label>
          <input
            type='checkbox'
            id='isFeatured'
            name='isFeatured'
            checked={productData.isFeatured}
            onChange={handleChange}
            className='mr-2 border-gray-300'
          />
          <label htmlFor='isFeatured' className='text-gray-600'>
            Mark as featured product
          </label>
        </div>

        <div className='flex justify-end space-x-4'>
          <button
            type='button'
            className='px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage
