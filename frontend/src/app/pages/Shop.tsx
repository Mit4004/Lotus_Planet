import { useState } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Tropical Plants', 'Succulents', 'Hanging Plants', 'Air Purifying', 'Statement Plants'];
  const difficulties = ['All', 'Easy', 'Medium', 'Advanced'];

  const allProducts = [
    {
      id: '1',
      name: 'Monstera Deliciosa',
      price: 45,
      image: 'https://images.unsplash.com/photo-1614887410788-e158d6efb3be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50JTIwd2hpdGUlMjBwb3R8ZW58MXx8fHwxNzczNjg1NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Tropical Plants',
      difficulty: 'Easy' as const
    },
    {
      id: '2',
      name: 'Fiddle Leaf Fig',
      price: 65,
      image: 'https://images.unsplash.com/photo-1608329857883-5998ebea6f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWRkbGUlMjBsZWFmJTIwZmlnJTIwaW5kb29yfGVufDF8fHx8MTc3MzY3Nzg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Statement Plants',
      difficulty: 'Medium' as const
    },
    {
      id: '3',
      name: 'Golden Pothos',
      price: 28,
      image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBwbGFudCUyMGhhbmdpbmd8ZW58MXx8fHwxNzczNTgwMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Hanging Plants',
      difficulty: 'Easy' as const
    },
    {
      id: '4',
      name: 'Snake Plant',
      price: 35,
      image: 'https://images.unsplash.com/photo-1695742339593-9d0488a7dfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwbWluaW1hbHxlbnwxfHx8fDE3NzM2ODU2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Air Purifying',
      difficulty: 'Easy' as const
    },
    {
      id: '5',
      name: 'Peace Lily',
      price: 38,
      image: 'https://images.unsplash.com/photo-1701835427833-fc45547b8cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZSUyMGxpbHklMjB3aGl0ZSUyMGZsb3dlcnxlbnwxfHx8fDE3NzM2NjY1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Air Purifying',
      difficulty: 'Easy' as const
    },
    {
      id: '6',
      name: 'Rubber Plant',
      price: 42,
      image: 'https://images.unsplash.com/photo-1595446757407-c39b9407d779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydWJiZXIlMjBwbGFudCUyMGluZG9vcnxlbnwxfHx8fDE3NzM2MDc2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Tropical Plants',
      difficulty: 'Medium' as const
    },
    {
      id: '7',
      name: 'Succulent Collection',
      price: 32,
      image: 'https://images.unsplash.com/photo-1773394187720-5131643f6a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBjb2xsZWN0aW9uJTIwY2VyYW1pY3xlbnwxfHx8fDE3NzM2ODU2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Succulents',
      difficulty: 'Easy' as const
    },
    {
      id: '8',
      name: 'Boston Fern',
      price: 36,
      image: 'https://images.unsplash.com/photo-1635703998367-9c5089b1c84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJuJTIwcGxhbnQlMjBib3RhbmljYWx8ZW58MXx8fHwxNzczNjg1NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Hanging Plants',
      difficulty: 'Medium' as const
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || product.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-[#f7f3ec] pt-32 pb-20 px-8 md:px-16 lg:px-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 
            className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Shop Our Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover beautiful plants that will transform your space into a green sanctuary.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for plants..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:border-[#7a9e7e] transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={20} className="text-[#7a9e7e]" />
              <h3 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm mb-3 text-gray-600">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-[#7a9e7e] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm mb-3 text-gray-600">Care Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        selectedDifficulty === difficulty
                          ? 'bg-[#d4a5a5] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing <span className="text-[#7a9e7e]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'plant' : 'plants'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-400" size={40} />
            </div>
            <h3 
              className="text-2xl mb-4 text-gray-700"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              No plants found
            </h3>
            <p className="text-gray-600 mb-8">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
