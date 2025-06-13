import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart as addToCartRedux } from '../../redux/slices/cartSlice';


const ProductDetail = ({ productId }) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {selectedProduct, loading, error, similarProducts }= useSelector(
        (state) => state.products
    );
    const {user, guestId}= useSelector(
        (state) => state.auth );
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { addToCart } = useContext(CartContext);

    const productFetchId = productId || id;
    useEffect (() => {
        if (productFetchId) {
            dispatch(fetchProductDetails({ id: productFetchId }));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    },[dispatch,productFetchId]);

    useEffect(() => {
        if (selectedProduct && selectedProduct.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);


    const handleAddToCart = () => {
        if (selectedProduct.countInStock === 0) {
            toast.error('Product is out of stock', {
                duration: 1500,
                style: {
                    background: '#FF5252',
                    color: '#fff'
                }
            });
            return;
        }
        if (!selectedProduct) {
            return null; // or a skeleton loader
        }
        
    setIsButtonDisabled(true);
    dispatch(
        addToCartRedux({
            productId: productFetchId,
            quantity,
            userId: user?._id,
            guestId
        })
    )    
    .then(() => {
        toast.success("Product added to cart!",{
            duration: 1500,
            style: {
                background: '#4CAF50',
                color: '#fff'
            }
        });
    }) 
    .finally(() => {
        setIsButtonDisabled(false);
    });
    };
    if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>Something went wrong:{error}</div>;
    }
    

    return (
    <div className='p-6'>
        {selectedProduct && (
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* Left Thumbnails */}
                <div className='hidden flex-col md:flex space-y-4 mr-6'>
                    {selectedProduct.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.altText||`thumbnail ${index}`} 
                        className={`w-20 h-20 object-cover cursor-pointer rounded-lg ${mainImage === image.url ? 'border-2 border-black' : 'border border-gray-300'}`}
                        onClick={()=> setMainImage(image.url)}
                        />
                    ))}
                </div>
                {/*Main Image*/}
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                        <img src={mainImage} alt="Main Product" 
                        className='w-full h-auto object-cover rounded-lg'/>
                    </div>
                </div>
                {/* Mobile Thumbnails */}
                <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                    {selectedProduct.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.altText||`thumbnail ${index}`} 
                        className={`w-20 h-20 object-cover cursor-pointer rounded-lg ${mainImage === image.url ? 'border-2 border-black' : 'border border-gray-300'}`}
                        onClick={() => setMainImage(image.url)}
                        />
                    ))}
                </div>
                {/*Right Side*/}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
                    <p className='text-lg text-gray-600 mb-1 line-through'>
                        ${selectedProduct.orignalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className='text-xl text-gray-500 mb-2'>
                        ${selectedProduct.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className='text-gray-600 mb-4'>
                        {selectedProduct.description}
                    </p>
                    <div className='mb-4'>
                        <p className='text-gray-600 mr-2'>Rating: {selectedProduct.rating} ({selectedProduct.numReviews} reviews)</p>
                        <div className='flex items-center'>
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-5 h-5 ${index < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-gray-600'>Quantity</p>
                        <div className='flex items-center space-x-4 mt-2'>
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                                className='bg-gray-300 text-gray-600 px-3 py-1 rounded-l-lg hover:bg-gray-400 transition-colors'
                                disabled={quantity <= 1}
                            >-</button>
                            <span className='text-lg'>{quantity}</span>
                            <button 
                                onClick={() => setQuantity(prev => Math.min(selectedProduct.countInStock, prev + 1))}
                                className='bg-gray-300 text-gray-600 px-3 py-1 rounded-r-lg hover:bg-gray-400 transition-colors'
                                disabled={quantity >= selectedProduct.countInStock}
                            >+</button>
                        </div>
                    </div>
                            
                    <div className='mb-4'>
                        <p className='text-gray-600'>Stock: {selectedProduct.countInStock} available</p>
                    </div>
                    <button 
                        onClick={() => handleAddToCart()}
                        className={`${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg transition-colors`}
                        disabled={isButtonDisabled || selectedProduct.countInStock === 0}
                    >
                        {selectedProduct.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            {/*You May like section*/}
            <div className='mt-20'>
                <h2 className='text-2xl text-center font-medium mb-4'>
                    You May Like</h2>
                {similarProducts && similarProducts.length > 0 ? (
                    <ProductGrid products={similarProducts} loading={loading} error={error}/>
                ) : (
                    <p className='text-center text-gray-500'>No similar products found</p>
                )}
            </div>
        </div>
        )}
    </div>
  )
}

export default ProductDetail;
