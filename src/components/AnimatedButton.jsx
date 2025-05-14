import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  onClick, 
  disabled, 
  type = 'button',
  variant = 'primary',
  className = '',
  children 
}) => {
  const baseStyles = "flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    link: "text-indigo-600 hover:text-indigo-800 border-transparent bg-transparent shadow-none"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton; 