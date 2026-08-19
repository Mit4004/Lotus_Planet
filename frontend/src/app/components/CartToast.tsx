import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CartToast() {
  const { activeToast, setActiveToast, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col items-end gap-2 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            key={activeToast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#7a9e7e]/20 shadow-2xl rounded-2xl p-4 flex gap-4 w-full relative overflow-hidden"
          >
            {/* Left Accent indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7a9e7e]" />

            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f7f3ec] flex-shrink-0 border border-gray-150 flex items-center justify-center">
              <ImageWithFallback src={activeToast.image} alt={activeToast.name} className="w-full h-full object-cover" />
            </div>

            {/* Content & Action details */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center gap-1">
                  <span className="p-0.5 bg-[#7a9e7e]/10 text-[#7a9e7e] rounded-full">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#7a9e7e]">Added to Cart!</p>
                </div>
                <h4 className="font-semibold text-sm text-[#2d3436] line-clamp-1 mt-1">{activeToast.name}</h4>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">Size: {activeToast.size}</span>
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setActiveToast(null);
                  }}
                  className="text-xs text-[#2a4a2e] hover:text-[#7a9e7e] font-semibold flex items-center gap-1 transition-colors group/btn"
                >
                  View Cart 
                  <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Manual Close Button */}
            <button
              onClick={() => setActiveToast(null)}
              className="p-1 hover:bg-gray-100 rounded-full h-fit text-gray-400 hover:text-[#2d3436] transition-colors"
            >
              <X size={14} />
            </button>

            {/* Animated countdown progress bar */}
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7a9e7e]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
