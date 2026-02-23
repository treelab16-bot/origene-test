import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => (
  <div className="flex flex-col items-center relative select-none">
    <div className="relative">
      <span className={`font-script text-4xl md:text-5xl ${light ? 'text-earth-50' : 'text-black'} relative z-10 leading-none`}>
        Origene
      </span>
      {/* Leaf accent */}
      <svg 
        className="absolute -top-3 -right-3 w-6 h-6 text-[#84cc16]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M2 22C2 22 20 18 20 5C20 5 18 2 13 2C8 2 2 22 2 22Z" />
      </svg>
    </div>
    <div className="bg-[#7f1d1d] text-white text-[0.6rem] md:text-[0.65rem] font-sans font-bold tracking-[0.4em] px-3 py-0.5 mt-[-2px] z-20 shadow-sm">
      BAKERY
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useStore();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-earth-50 border-b border-sage-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center pt-2">
              <Link to="/" className="group hover:opacity-90 transition-opacity">
                <Logo />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive(link.path) ? 'text-sage-800 underline underline-offset-4' : 'text-sage-600 hover:text-sage-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6 mt-2">
              <Link to="/cart" className="relative text-sage-600 hover:text-sage-900">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-earth-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-sage-600 hover:text-sage-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-earth-50 border-t border-sage-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium uppercase tracking-wide ${
                     isActive(link.path) ? 'text-sage-900 bg-sage-100' : 'text-sage-600 hover:text-sage-900 hover:bg-sage-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sage-900 text-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="inline-block transform origin-left scale-90">
                <Logo light={true} />
              </div>
              <p className="text-sm text-sage-200 leading-relaxed mt-2">
                Baked with love, organic ingredients, and a touch of earth's finest flavors.
              </p>
            </div>
            <div>
              <h4 className="font-medium uppercase tracking-widest text-xs mb-4 text-earth-400">Shop</h4>
              <ul className="space-y-2 text-sm text-sage-200">
                <li><Link to="/shop" className="hover:text-white transition">All Cookies</Link></li>
                <li><Link to="/shop?category=Vegan" className="hover:text-white transition">Vegan</Link></li>
                <li><Link to="/shop?category=Gluten-Free" className="hover:text-white transition">Gluten-Free</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium uppercase tracking-widest text-xs mb-4 text-earth-400">Company</h4>
              <ul className="space-y-2 text-sm text-sage-200">
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium uppercase tracking-widest text-xs mb-4 text-earth-400">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-sage-200 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-sage-200 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-sage-200 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-sage-800 text-center text-xs text-sage-400">
            &copy; {new Date().getFullYear()} Origene Bakery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;