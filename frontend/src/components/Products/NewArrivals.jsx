import React, { useState, useRef, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Newarrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
         try {
             // Replace with your actual API endpoint for new arrivals
             // For example, if your API endpoint is /api/products/new-arrivals, you can use the following lin
             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);

            //  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`); 
             setNewArrivals(response.data.data);
             console.log(response.data.data);
         } catch (error) {
             console.error('Error fetching new arrivals:', error); 
         }
        } 
        fetchNewArrivals();
     }, []);

    //scroll functions
    const hanldeMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft); 
    }
    const handleMouseMove = (e) => {
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX; 
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }
    const handleMouseUporLeave = () => {
        setIsDragging(false);
    }
    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollAmount;
            updateScollButtons();
        }
    }
    //update scroll buttons
    const updateScollButtons = () => {
        const container = scrollRef.current;
        if(container) {
            const scrollLeft = container.scrollLeft;
            const rightScrllable = container.scrollWidth > scrollLeft + container.clientWidth; 
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(rightScrllable);
        }
    }
    
    useEffect(() => {
        const container = scrollRef.current;
        if(container) {
            container.addEventListener('scroll', updateScollButtons);
            updateScollButtons();
            return () => {
                container.removeEventListener('scroll', updateScollButtons);
            }
        }
    }, [newArrivals]);

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Explore New Arrivals
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest books
                </p>
                {/* Scroll buttons */}
                <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                    <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className="text-2xl"/>
                    </button>
                    <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className="text-2xl"/>
                    </button>
                </div>
            </div>
            {/* Scrollable content */}
            <div 
                ref={scrollRef} 
                onMouseDown={hanldeMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUporLeave}
                onMouseLeave={handleMouseUporLeave}
                className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
                {newArrivals.map((product) => (
                      
                    <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img 
                        
                            src={product.images[0]?.url}
                            alt={product.images[0]?.alt || product.name}
                            className='w-full h-[500px] object-cover rounded-lg'
                            draggable={false}
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`} className="block">
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Newarrivals