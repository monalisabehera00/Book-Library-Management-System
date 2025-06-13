import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import ProductGrid from '../components/Products/ProductGrid';

const BestSeller = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ isBestSeller: true }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Best Sellers</h1>
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
  );
};

export default BestSeller;