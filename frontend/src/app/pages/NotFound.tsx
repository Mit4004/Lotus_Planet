import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center px-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl mb-6 text-[#7a9e7e]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          404
        </motion.h1>
        <h2 
          className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the garden. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/">
            <button className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Home size={20} />
              <span>Go Home</span>
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="bg-white border-2 border-[#d4a5a5] text-[#d4a5a5] hover:bg-[#d4a5a5] hover:text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-16 text-6xl"
        >
          🌿
        </motion.div>
      </motion.div>
    </div>
  );
}
