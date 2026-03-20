import { motion } from 'motion/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TiltCard } from './TiltCard';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

export function ProductCard({ name, price, image, category, difficulty }: ProductCardProps) {
  const difficultyColors = {
    Easy: 'bg-[#7a9e7e]',
    Medium: 'bg-[#d4a5a5]',
    Advanced: 'bg-[#c19a6b]'
  };

  return (
    <TiltCard>
      <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-[#f7f3ec]">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#d4a5a5] hover:text-white transition-colors duration-300">
            <Heart size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#7a9e7e] hover:text-white transition-colors duration-300">
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${difficultyColors[difficulty]} text-white text-xs px-3 py-1 rounded-full`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-[#7a9e7e] mb-2">{category}</p>
        <h3 
          className="text-xl mb-2 text-[#2d3436] group-hover:text-[#7a9e7e] transition-colors duration-300"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>
            ${price}
          </span>
          <button className="bg-[#f7f3ec] hover:bg-[#7a9e7e] hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
      </div>
    </TiltCard>
  );
}
