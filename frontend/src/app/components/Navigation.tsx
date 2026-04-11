import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Heart, User, LogIn, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  const isAdmin = user?.isAdmin || localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/care-tips', label: 'Plant Care' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/95 backdrop-blur-md border-b border-[#7a9e7e]/10">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-5">
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
              <Link key={link.path} to={link.path} className="relative">
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
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {/* Auth state UI */}
            {user ? (
              // Logged-in regular user
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium flex items-center gap-1.5">
                  <User size={16} className="text-[#7a9e7e]" />
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              // Not logged in
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#7a9e7e] transition-colors rounded-xl hover:bg-[#7a9e7e]/10">
                    <LogIn size={16} />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#7a9e7e] text-white hover:bg-[#6a8e6e] transition-colors rounded-xl shadow-sm">
                    <User size={16} />
                    Register
                  </button>
                </Link>
              </div>
            )}

            {/* Admin Portal Link */}
            {user?.isAdmin && (
              <Link to="/admin/dashboard" className="hidden md:block">
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#2a4a2e] text-white hover:bg-[#1f3722] transition-colors rounded-xl shadow-sm">
                  Admin Portal
                </button>
              </Link>
            )}

            <button className="p-2 hover:text-[#d4a5a5] transition-colors duration-300 hidden md:block text-gray-600">
              <Heart size={22} />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#7a9e7e] transition-colors duration-300 relative text-gray-600"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-[#d4a5a5] text-white text-[10px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:text-[#7a9e7e] transition-colors text-gray-600"
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
              <div className="pt-6 pb-4 flex flex-col gap-3">
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
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-gray-50">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <User size={16} className="text-[#7a9e7e]" />
                          Hi, {user.name.split(' ')[0]}
                        </span>
                      </div>
                      
                      {user.isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#2a4a2e] text-white rounded-xl mb-1">
                            Admin Portal
                          </button>
                        </Link>
                      )}
                      
                      <button 
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <LogIn size={16} /> Login
                        </button>
                      </Link>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#7a9e7e] text-white rounded-xl hover:bg-[#6a8e6e] transition-colors">
                          <User size={16} /> Register
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
