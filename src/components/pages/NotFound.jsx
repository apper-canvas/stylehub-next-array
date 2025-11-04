import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
            <ApperIcon name="Search" size={64} className="text-primary" />
          </div>
          
          <motion.h1 
            className="text-6xl font-bold text-secondary mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="text-2xl font-semibold text-secondary mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </motion.p>

          <motion.div 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/">
              <Button className="w-full sm:w-auto">
                <ApperIcon name="Home" size={16} className="mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>or try one of these popular sections:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Link 
                  to="/products" 
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  All Products
                </Link>
                <span className="text-gray-300">•</span>
                <Link 
                  to="/sale" 
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Sale Items
                </Link>
                <span className="text-gray-300">•</span>
                <Link 
                  to="/wishlist" 
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Wishlist
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;