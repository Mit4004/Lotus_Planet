import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2d3436] text-white py-16 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-3xl mb-4 text-[#d4a5a5]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              LotusPlant
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bringing nature's beauty into your home, one plant at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#7a9e7e] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#7a9e7e] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#7a9e7e] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#7a9e7e] transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/care-tips" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Plant Care Tips
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#7a9e7e] transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe for plant care tips and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-full bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a9e7e] text-white placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-[#7a9e7e] hover:bg-[#6a8e6e] rounded-r-full transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2026 LotusPlant. All rights reserved. Crafted with love for plant enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}
