import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'a-z', label: 'Alphabetically: A-Z' },
    { value: 'z-a', label: 'Alphabetically: Z-A' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  const handleSortChange = (value) => {
    setSelectedSort(value);
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', value);
    setSearchParams(params);
  };

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="mr-2">Sort by: {sortOptions.find(option => option.value === selectedSort)?.label}</span>
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`${selectedSort === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SortOption
