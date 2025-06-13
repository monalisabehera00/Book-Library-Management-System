import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProductsByFilters } from '../../redux/slices/productsSlice'

const FilterSidebar = ({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    rating: '',
    availability: '',
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
    productType: ''
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const categories = ['Action', 'Arts','Biographies','Comics','Education','Fiction','Health','History', 'Non-Fiction', 'Mystery', 'Thriller', 'Sci-Fi'];
  const ratings = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
  const availabilityOptions = ['In Stock', 'Out of Stock'];
  const brands = ['Penguin', 'HarperCollins', 'Random House'];
  const productTypes = ['Audio Book', 'E-Book', 'Proper Book'];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || '',
      price: params.price || '',
      rating: params.rating || '',
      availability: params.availability || '',
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 1000,
      productType: params.productType || ''
    });
    setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 1000]);
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    
    const params = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          if (value.length > 0) params[key] = value.join(',');
        } else if (key === 'rating') {
          params[key] = value.split(' ')[0];
        } else {
          params[key] = value.toString();
        }
      }
    });
    setSearchParams(params);
    if (onClose) onClose();
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([filters.minPrice, value]);
    handleFilterChange('maxPrice', value);
  };

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value <= filters.maxPrice) {
      setPriceRange([value, filters.maxPrice]);
      handleFilterChange('minPrice', value);
    }
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    handleFilterChange('brand', newBrands);
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    if (onClose) {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [onClose]);
    
  return (
    <div ref={sidebarRef} className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">Filter</h2>
        <button
          onClick={() => {
            const params = {};
            Object.entries(filters).forEach(([key, value]) => {
              if (value) {
                if (Array.isArray(value)) {
                  if (value.length > 0) params[key] = value.join(',');
                } else {
                  params[key] = value.toString();
                }
              }
            });
            setSearchParams(params);
            dispatch(fetchProductsByFilters(params));
            if (onClose) onClose();
          }}
          className="px-4 py-2 bg-primary-red text-white rounded hover:bg-red-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Category</label>
        {categories.map((category) => (
          <div key={category} className='flex items-center mb-1'>
            <input
              type="radio"
              name='category'
              value={category}
              checked={filters.category === category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700 text-sm'>{category}</span>
          </div>
        ))}
      </div>

    {/* Rating Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Rating</label>
        {ratings.map((rating) => (
          <div key={rating} className='flex items-center mb-1'>
            <input
              type="radio"
              name='rating'
              value={rating}
              checked={filters.rating === rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700 text-sm'>{rating}</span>
          </div>
        ))}
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Availability</label>
        {availabilityOptions.map((option) => (
          <div key={option} className='flex items-center mb-1'>
            <input
              type="radio"
              name='availability'
              value={option}
              checked={filters.availability === option}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700 text-sm'>{option}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Brand</label>
        {brands.map((brand) => (
          <div key={brand} className='flex items-center mb-1'>
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700 text-sm'>{brand}</span>
          </div>
        ))}
      </div>
      {/* Product Type Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Product Type</label>
        {productTypes.map((type) => (
          <div key={type} className='flex items-center mb-1'>
            <input
              type="radio"
              name='productType'
              value={type}
              checked={filters.productType === type}
              onChange={(e) => handleFilterChange('productType', e.target.value)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700 text-sm'>{type}</span>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <label className='block text-gray-600 text-sm font-medium mb-2'>Price Range</label>
        <div className='flex gap-4 mb-4'>
          <input
            type="number"
            min={0}
            max={filters.maxPrice}
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            className='w-24 px-2 py-1 border rounded'
            placeholder='Min'
          />
          <span className='text-gray-600'>to</span>
          <input
            type="number"
            min={filters.minPrice}
            max={1000}
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(e)}
            className='w-24 px-2 py-1 border rounded'
            placeholder='Max'
          />
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
        />
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$ {filters.minPrice}</span>
          <span>$ {filters.maxPrice}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
