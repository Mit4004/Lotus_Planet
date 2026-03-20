import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight, Leaf, Package, HeartHandshake, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router';
import { SplitText } from '../components/SplitText';
import { FadeUp } from '../components/FadeUp';

export function Home() {
  const featuredProducts = [
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
    }
  ];

  const newArrivals = [
    {
      id: 'n1',
      name: 'Rose Bush',
      price: 399,
      image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=1080',
      category: 'Flowering Plants',
      difficulty: 'Medium' as const
    },
    {
      id: 'n2',
      name: 'Lavender',
      price: 249,
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=1080',
      category: 'Herbs & Kitchen',
      difficulty: 'Easy' as const
    },
    {
      id: 'n3',
      name: 'Bamboo Palm',
      price: 599,
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1080',
      category: 'Indoor Plants',
      difficulty: 'Easy' as const
    },
    {
      id: 'n4',
      name: 'Jade Plant',
      price: 199,
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=1080',
      category: 'Succulents & Cacti',
      difficulty: 'Easy' as const
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The quality of plants from LotusPlant is outstanding! My Monstera arrived perfectly packaged and is thriving.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      text: 'Great customer service and beautiful plants. The care instructions included were super helpful.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      text: 'I love how they educate customers about plant care. My home feels like a botanical garden now!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ec]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="bg-[#d4a5a5] text-white px-6 py-2 rounded-full text-sm tracking-wide">
                New Arrivals
              </span>
            </motion.div>

            <div
              className="text-6xl md:text-7xl lg:text-8xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.1' }}
            >
              <SplitText text="LotusPlanet" delay={4} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-[#7a9e7e] mb-8"
              style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
            >
              Where Every Corner Blooms
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-600 mb-10 text-lg max-w-md leading-relaxed"
            >
              Discover our curated collection of premium indoor plants that bring life, beauty, and tranquility to your space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <button className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span>Shop Collection</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/care-tips">
                <button className="bg-white border-2 border-[#d4a5a5] text-[#d4a5a5] hover:bg-[#d4a5a5] hover:text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 right-0 w-[380px] h-[480px] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1604864228543-f8aa75ef6a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZXBsYW50cyUyMGluZG9vciUyMHBsYW50cyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzM2ODQ3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Green plant in white pot"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-[320px] h-[400px] rounded-3xl overflow-hidden shadow-2xl z-20"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1666102610952-219650709294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob3VzZXBsYW50cyUyMGluZG9vciUyMHBsYW50cyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzM2ODQ3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Plant in pot"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute top-[120px] left-[280px] w-[240px] h-[300px] rounded-3xl overflow-hidden shadow-xl z-5"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507988914355-bf49fdbc7368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxob3VzZXBsYW50cyUyMGluZG9vciUyMHBsYW50cyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzM2ODQ3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Snake plant on white chair"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute top-16 left-12 w-20 h-20 bg-[#d4a5a5] rounded-full opacity-30 blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute bottom-24 right-12 w-16 h-16 bg-[#7a9e7e] rounded-full opacity-30 blur-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full bg-[#7a9e7e] h-[48px] overflow-hidden flex items-center border-y border-[#6a8e6e]/20">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
            display: flex;
            white-space: nowrap;
            width: max-content;
          }
        `}</style>
        <div className="animate-marquee text-[#f7f3ec] text-[14px] tracking-widest uppercase">
          {Array(8).fill("Indoor Plants • Outdoor Plants • Succulents • Flowering Plants • Herbs • Rare & Exotic • Free Delivery above ₹500 • ").map((text, i) => (
            <span key={i} className="mr-2">{text}</span>
          ))}
        </div>
      </div>

      {/* Category Showcase Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#f7f3ec]">
        <FadeUp className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
            {/* Left side: 2 large cards */}
            <div className="grid grid-rows-2 gap-6 h-full">
              {/* Card 1 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-64 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1080"
                  alt="Indoor Plants"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-3xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Indoor Plants</h3>
                </div>
              </Link>
              
              {/* Card 2 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-64 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=1080"
                  alt="Outdoor Plants"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-3xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Outdoor Plants</h3>
                </div>
              </Link>
            </div>

            {/* Right side: 4 smaller cards in 2x2 grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
              {/* Card 3 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-48 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800"
                  alt="Succulents & Cacti"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-xl md:text-2xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Succulents & Cacti</h3>
                </div>
              </Link>

              {/* Card 4 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-48 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80&w=800"
                  alt="Flowering Plants"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-xl md:text-2xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Flowering Plants</h3>
                </div>
              </Link>

              {/* Card 5 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-48 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595188177579-3738096f9bf1?auto=format&fit=crop&q=80&w=800"
                  alt="Herbs & Kitchen"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-xl md:text-2xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Herbs & Kitchen</h3>
                </div>
              </Link>

              {/* Card 6 */}
              <Link to="/shop" className="group relative rounded-2xl overflow-hidden h-48 lg:h-full block shadow-md hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1620127251761-c80dce686cb6?auto=format&fit=crop&q=80&w=800"
                  alt="Rare & Exotic"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-xl md:text-2xl text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Rare & Exotic</h3>
                </div>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <FadeUp className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7a9e7e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-[#7a9e7e]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Hand-selected plants from trusted growers, ensuring health and beauty.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-[#d4a5a5]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Safe Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Expert packaging ensures your plants arrive in perfect condition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7a9e7e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="text-[#7a9e7e]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Expert Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our plant experts are always here to help you succeed.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp delay={0.1}>
            <div className="text-center mb-16">
              <h2 
                className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Featured Plants
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of beautiful, easy-to-care-for plants perfect for any space.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </FadeUp>

          <div className="text-center">
            <Link to="/shop">
              <button className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-10 py-4 rounded-full flex items-center gap-2 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>View All Plants</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp delay={0.1}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 text-center">
              <h2 
                className="text-5xl md:text-6xl text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Just Arrived 🌿
              </h2>
              <span className="bg-[#d4a5a5] text-white text-sm tracking-wider uppercase font-medium px-4 py-1.5 rounded-full shadow-sm md:mt-3">
                New
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </FadeUp>

          <div className="text-center">
            <Link to="/shop">
              <button className="border-2 border-[#7a9e7e] text-[#7a9e7e] hover:bg-[#7a9e7e] hover:text-white px-10 py-4 rounded-full flex items-center gap-2 mx-auto transition-all duration-300">
                <span>View All New Arrivals</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Collection Banner */}
      <section className="bg-[#2a4a2e] w-full min-h-[400px] overflow-hidden my-8 lg:my-0">
        <FadeUp className="h-full w-full">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[400px] px-8 md:px-16 lg:px-24 py-16">
            
            {/* Left Content */}
            <div className="z-10 relative text-center lg:text-left">
              <h2 
                className="text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-[1.1]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                This Season's Picks
              </h2>
              <p className="text-xl md:text-2xl text-[#7a9e7e] mb-10" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                Fresh flowering plants for every corner
              </p>
              <Link to="/shop">
                <button className="bg-[#f7f3ec] hover:bg-white text-[#2a4a2e] font-medium px-10 py-4 rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>

            {/* Right Images (Artistic Arrangement) */}
            <div className="relative h-[350px] md:h-[500px] w-full hidden md:block mt-8 lg:mt-0">
              {/* Image 1 - Top Right - Back */}
              <div className="absolute top-0 right-4 lg:right-12 w-44 h-60 md:w-56 md:h-[320px] rounded-3xl overflow-hidden shadow-2xl rotate-12 z-10 border-4 border-[#7a9e7e]/20 transition-transform duration-700 hover:rotate-6 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80&w=600"
                  alt="Flowering Plant"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 - Bottom Left - Back */}
              <div className="absolute bottom-4 left-4 lg:left-12 w-40 h-56 md:w-48 md:h-[280px] rounded-3xl overflow-hidden shadow-2xl -rotate-12 z-20 border-4 border-[#d4a5a5]/20 transition-transform duration-700 hover:-rotate-6 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=600"
                  alt="Rose Bush"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3 - Center - Front */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-72 md:w-64 md:h-[380px] rounded-3xl overflow-hidden shadow-2xl -rotate-3 z-30 border-4 border-[#f7f3ec] transition-transform duration-700 hover:-translate-y-[52%] hover:rotate-0 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800"
                  alt="Lavender"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#f7f3ec]">
        <FadeUp className="max-w-[1400px] mx-auto" delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 
                className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Growing Together Since 2020
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At LotusPlanet, we believe that every home deserves to be filled with the beauty and serenity of nature. Our passion for plants drives us to source only the finest specimens and provide you with the knowledge to help them thrive.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're a seasoned plant parent or just beginning your green journey, we're here to support you every step of the way.
              </p>
              <Link to="/care-tips">
                <button className="border-2 border-[#7a9e7e] text-[#7a9e7e] hover:bg-[#7a9e7e] hover:text-white px-8 py-4 rounded-full transition-all duration-300">
                  Learn Plant Care
                </button>
              </Link>
            </div>

            <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1619077130450-baea09efa355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3MzY0MDgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Plant nursery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Photo Gallery Strip */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <FadeUp delay={0.1}>
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Garden 🌸
            </h2>
          </div>
          <div className="max-w-[1600px] mx-auto rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-0">
              {[
                "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1595188177579-3738096f9bf1?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1620127251761-c80dce686cb6?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80&w=500"
              ].map((imgUrl, i) => (
                <div key={i} className="aspect-square relative group overflow-hidden">
                  <ImageWithFallback
                    src={imgUrl}
                    alt={`Garden plant ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <FadeUp className="max-w-[1400px] mx-auto" delay={0.1}>
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy plant parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} size={20} className="fill-[#d4a5a5] text-[#d4a5a5]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#d4a5a5] py-24 px-8 md:px-16 lg:px-24 text-center">
        <FadeUp className="max-w-2xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Get 10% Off Your First Order
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10">
            Subscribe for plant care tips and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full border-none focus:outline-none focus:ring-4 focus:ring-white/30 text-[#2d3436] placeholder-gray-400 shadow-sm"
            />
            <button className="bg-[#f7f3ec] hover:bg-white text-[#2a4a2e] font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-white/80 text-sm">
            No spam, only plants 🌿
          </p>
        </FadeUp>
      </section>
    </div>
  );
}
