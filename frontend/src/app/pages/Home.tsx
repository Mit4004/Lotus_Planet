import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight, Leaf, Package, HeartHandshake, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router';

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

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.1' }}
            >
              LotusPlant
            </motion.h1>

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

      {/* Features Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#7a9e7e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-[#7a9e7e]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Hand-selected plants from trusted growers, ensuring health and beauty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-[#d4a5a5]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Safe Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Expert packaging ensures your plants arrive in perfect condition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#7a9e7e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="text-[#7a9e7e]" size={32} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Expert Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our plant experts are always here to help you succeed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Featured Plants
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of beautiful, easy-to-care-for plants perfect for any space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

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

      {/* About Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Growing Together Since 2020
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At LotusPlant, we believe that every home deserves to be filled with the beauty and serenity of nature. Our passion for plants drives us to source only the finest specimens and provide you with the knowledge to help them thrive.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're a seasoned plant parent or just beginning your green journey, we're here to support you every step of the way.
              </p>
              <Link to="/care-tips">
                <button className="border-2 border-[#7a9e7e] text-[#7a9e7e] hover:bg-[#7a9e7e] hover:text-white px-8 py-4 rounded-full transition-all duration-300">
                  Learn Plant Care
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1619077130450-baea09efa355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3MzY0MDgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Plant nursery"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy plant parents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
