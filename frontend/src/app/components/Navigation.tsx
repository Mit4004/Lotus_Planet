import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Heart, User } from 'lucide-react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/care-tips', label: 'Plant Care' },
    { path: '/admin', label: 'Admin' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/95 backdrop-blur-md border-b border-[#7a9e7e]/10">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <h2 
              className="text-2xl md:text-3xl text-[#2d3436] group-hover:text-[#7a9e7e] transition-colors duration-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              LotusPlant
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative"
              >
                <span className={`text-lg transition-colors duration-300 ${
                  isActive(link.path) ? 'text-[#7a9e7e]' : 'text-gray-700 hover:text-[#7a9e7e]'
                }`}>
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7a9e7e]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-[#d4a5a5] transition-colors duration-300 hidden md:block">
              <Heart size={22} />
            </button>
            <button className="p-2 hover:text-[#d4a5a5] transition-colors duration-300 hidden md:block">
              <User size={22} />
            </button>
            <button className="p-2 hover:text-[#7a9e7e] transition-colors duration-300 relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-[#d4a5a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:text-[#7a9e7e] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg py-2 transition-colors duration-300 ${
                      isActive(link.path) ? 'text-[#7a9e7e]' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
