import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Layout/Hero'
import BookCollectionSection from '../components/Products/BookCollectionSection'
import Newarrivals from "../components/Products/Newarrivals";
import ProductDetail from '../components/Products/ProductDetail';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSection from '../components/Products/FeaturedSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters, fetchProductDetails } from '../redux/slices/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      sortBy: "rating",
      limit: 8
    }));

    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
        if (response.data?._id) {
          dispatch(fetchProductDetails({ id: response.data._id }));
        }
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };
  
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className=''>
      <Hero/>
      <BookCollectionSection/>
      <Newarrivals/>
      {/*Best Seller*/}
      <h2 className='text-3xl font-bold text-center mb-4'>Best Sellers</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetail productId={bestSellerProduct._id}/>
      ) : (
        <p className='text-center'>Loading best seller products...</p>
      )}
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Top Rated
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
      <FeaturedSection/>
    </div>
  )
}

export default Home