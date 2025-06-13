import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import main_book from '../../assets/main-book.jpg'
import { motion } from 'framer-motion'

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className='relative overflow-hidden'>
        <motion.img 
          src={main_book} 
          alt='hero' 
          className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className='absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
            <div className='text-white text-center p-6'>
                <motion.h1 
                  className='text-4xl md:text-9xl font-bold tracking-tighter uppercase'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Welcome to our website
                </motion.h1>
                <motion.span 
                  className='text-sm md:text-lg mt-4 mb-8 tracking-tighter block'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Your one-stop shop
                </motion.span>
                <motion.div
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-block mt-8'
                >
                  <Link to='/' className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg transition-all duration-300 hover:bg-opacity-90'>
                      Shop Now
                  </Link>
                </motion.div>
                <motion.p 
                  className='text-xl md:text-2xl mt-8'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }} 
                >
                    Discover the best products and services
                </motion.p>
            </div>
        </motion.div>
    </section>
  )
}

export default Hero
