import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FaFilter, FaSort } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import { useSearchParams } from 'react-router-dom';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error}= useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  }
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  } 

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

    return (
    <div className="flex flex-col lg:flex-row">
        {/*Mobile Filter Button*/}
        <button onClick ={toggleSidebar}
          className="lg:hidden border p-2 flex justify-center items-center">
            <FaFilter/>
          </button>
          {/*Filter Sidebar*/}
          <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 
          left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
          </div>
          <div className='flex-grow p-4'>
            <h2 className='text-2xl font-bold uppercase mb-4'>Collection</h2>
            
            {/*Sort Options*/}
            <SortOption/>
            <FaSort/>
            {/*Product Grid*/}
            <ProductGrid products={products} loading={loading} error={error}/>

            </div>
    </div>
  )
};
export default CollectionPage
