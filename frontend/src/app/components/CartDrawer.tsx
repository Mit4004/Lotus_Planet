import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const shipping = 50;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#2d3436]" size={24} />
                <h2 className="text-2xl text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your Cart
                </h2>
                <span className="bg-[#d4a5a5] text-white text-xs px-2 py-1 rounded-full">
                  {cartCount} items
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#f7f3ec]/30">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <ShoppingBag size={48} className="mb-4 text-gray-300" />
                  <p className="text-lg mb-4">Your cart is currently empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-[#2d3436] truncate pr-2">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Size: {item.size}</p>
                        <p className="font-semibold text-[#2d3436]">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600 focus:outline-none"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600 focus:outline-none"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 shadow-xl z-10">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="h-px w-full bg-gray-100 my-2" />
                  <div className="flex justify-between text-xl font-medium text-[#2d3436]">
                    <span>Total</span>
                    <span>₹{cartTotal + shipping}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    <button className="w-full bg-[#2a4a2e] hover:bg-[#1f3722] text-white py-4 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl">
                      Proceed to Checkout
                    </button>
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-white border border-[#2a4a2e] text-[#2a4a2e] hover:bg-[#f7f3ec] py-4 rounded-xl font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
