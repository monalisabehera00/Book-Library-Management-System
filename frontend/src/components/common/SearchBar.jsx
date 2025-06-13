import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    dispatch(setFilters({search: searchTerm}))
    dispatch(fetchProductsByFilters({search: searchTerm}))
    navigate('/collections/all?search= ${searchTerm}')
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50 " : "w-auto"}`} >
      {isOpen ? (
        <form onSubmit={handleSearch} className="flex items-center relative justify-center w-full">
          <div className="relative w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="py-2 px-4 pl-2 pr-12 w-full border rounded-lg focus:outline-none focus:border-primary-red bg-gray-100 placeholder:text-gray-700"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMagnifyingGlass className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="w-6 h-6" />
          </button>
            </div>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-600 hover:text-primary-red"
        >
          <HiMagnifyingGlass className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
