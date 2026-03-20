import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Droplets, Sun, Wind, Thermometer, Scissors, Bug } from 'lucide-react';
import { FadeUp } from '../components/FadeUp';

export function CareTips() {
  const careTips = [
    {
      icon: Droplets,
      title: 'Watering',
      color: '#7a9e7e',
      tips: [
        'Check soil moisture before watering - stick your finger 2 inches deep',
        'Water thoroughly until it drains from the bottom',
        'Most plants prefer slightly dry soil between waterings',
        'Use room temperature water to avoid shocking roots',
        'Reduce watering in winter when growth slows'
      ]
    },
    {
      icon: Sun,
      title: 'Light Requirements',
      color: '#d4a5a5',
      tips: [
        'Low light: North-facing windows, indirect light',
        'Medium light: East or west-facing windows',
        'Bright indirect: Near south-facing windows with sheer curtains',
        'Rotate plants weekly for even growth',
        'Watch for signs: pale leaves mean too little, brown spots mean too much'
      ]
    },
    {
      icon: Thermometer,
      title: 'Temperature & Humidity',
      color: '#7a9e7e',
      tips: [
        'Most houseplants thrive at 65-75°F (18-24°C)',
        'Avoid placing near heating vents or AC units',
        'Mist tropical plants regularly for humidity',
        'Group plants together to increase humidity',
        'Use a humidifier during dry winter months'
      ]
    },
    {
      icon: Wind,
      title: 'Soil & Fertilizing',
      color: '#d4a5a5',
      tips: [
        'Use well-draining potting mix designed for houseplants',
        'Fertilize during growing season (spring/summer)',
        'Dilute fertilizer to half strength to prevent burning',
        'Reduce or stop fertilizing in fall and winter',
        'Repot every 1-2 years to refresh soil'
      ]
    },
    {
      icon: Scissors,
      title: 'Pruning & Maintenance',
      color: '#7a9e7e',
      tips: [
        'Remove dead or yellowing leaves promptly',
        'Prune to maintain shape and encourage bushier growth',
        'Use clean, sharp scissors or pruning shears',
        'Wipe leaves with damp cloth to remove dust',
        'Trim brown leaf tips at an angle for natural look'
      ]
    },
    {
      icon: Bug,
      title: 'Pest Control',
      color: '#d4a5a5',
      tips: [
        'Inspect plants regularly for pests',
        'Isolate infected plants immediately',
        'Spray with neem oil or insecticidal soap',
        'Wipe leaves with soapy water for minor infestations',
        'Ensure good air circulation to prevent issues'
      ]
    }
  ];

  const commonProblems = [
    {
      problem: 'Yellow Leaves',
      cause: 'Overwatering, poor drainage, or lack of nutrients',
      solution: 'Reduce watering frequency, check drainage holes, and fertilize during growing season'
    },
    {
      problem: 'Brown Leaf Tips',
      cause: 'Low humidity, underwatering, or chemical buildup',
      solution: 'Increase humidity, water more consistently, use filtered water'
    },
    {
      problem: 'Drooping Leaves',
      cause: 'Underwatering or root bound',
      solution: 'Water thoroughly and consider repotting if roots are crowded'
    },
    {
      problem: 'Leggy Growth',
      cause: 'Insufficient light',
      solution: 'Move to brighter location or supplement with grow lights'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ec]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                className="text-5xl md:text-6xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Plant Care Guide
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Everything you need to know to help your plants thrive. From watering schedules to troubleshooting common problems, we've got you covered.
              </p>
              <div className="inline-block bg-[#7a9e7e]/10 px-6 py-3 rounded-full">
                <p className="text-[#7a9e7e]">
                  💚 Expert tips for healthy, happy plants
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1673853233647-17ebc2d71b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGNhcmUlMjB3YXRlcmluZyUyMHdvbWFufGVufDF8fHx8MTc3MzY4NTYxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Woman caring for plants"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Care Tips Grid */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <FadeUp delay={0.1} className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Essential Care Tips
            </h2>
            <p className="text-xl text-gray-600">
              Master these fundamentals for thriving houseplants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#f7f3ec] rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${tip.color}20` }}
                  >
                    <Icon size={28} style={{ color: tip.color }} />
                  </div>
                  <h3 
                    className="text-2xl mb-4 text-[#2d3436]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {tip.title}
                  </h3>
                  <ul className="space-y-3">
                    {tip.tips.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-600">
                        <span style={{ color: tip.color }}>•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </FadeUp>
      </section>

      {/* Common Problems */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <FadeUp delay={0.2} className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Troubleshooting Guide
            </h2>
            <p className="text-xl text-gray-600">
              Solutions to common plant problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 
                  className="text-xl mb-3 text-[#d4a5a5]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.problem}
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Possible Cause:</p>
                  <p className="text-gray-700">{item.cause}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Solution:</p>
                  <p className="text-gray-700">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Seasonal Care Calendar */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <FadeUp delay={0.1} className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Seasonal Care Calendar
            </h2>
            <p className="text-xl text-gray-600">
              Adjust your care routine with the seasons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                season: 'Spring',
                color: '#7a9e7e',
                tasks: ['Resume fertilizing', 'Repot if needed', 'Increase watering', 'Prune dead growth']
              },
              {
                season: 'Summer',
                color: '#d4a5a5',
                tasks: ['Water more frequently', 'Provide shade from intense sun', 'Fertilize regularly', 'Watch for pests']
              },
              {
                season: 'Fall',
                color: '#c19a6b',
                tasks: ['Reduce fertilizing', 'Bring outdoor plants inside', 'Decrease watering', 'Clean leaves']
              },
              {
                season: 'Winter',
                color: '#7a9e7e',
                tasks: ['Minimal watering', 'No fertilizing', 'Increase humidity', 'Move to brighter spots']
              }
            ].map((season, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#f7f3ec] rounded-2xl p-6"
              >
                <div 
                  className="text-center mb-6 pb-4 border-b-2"
                  style={{ borderColor: season.color }}
                >
                  <h3 
                    className="text-2xl"
                    style={{ fontFamily: 'Playfair Display, serif', color: season.color }}
                  >
                    {season.season}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {season.tasks.map((task, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span style={{ color: season.color }}>✓</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Tips from Experts */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1773352517110-ec61a8ade9f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZXBsYW50JTIwc2hlbGYlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzY4NTYxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Beautiful houseplant collection"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-4xl md:text-5xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Pro Tips
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-lg mb-2 text-[#7a9e7e]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Listen to Your Plants
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Plants communicate their needs through their leaves and growth patterns. Learn to read the signs and adjust care accordingly.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-lg mb-2 text-[#d4a5a5]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Consistency is Key
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Plants thrive on routine. Establish consistent watering and care schedules for the best results.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-lg mb-2 text-[#7a9e7e]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Start Simple
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    If you're new to plants, begin with easy-care varieties like pothos, snake plants, or ZZ plants to build confidence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
