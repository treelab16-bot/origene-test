import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import GeminiRecommender from '../components/GeminiRecommender';
import { ArrowRight, Leaf, Award, Heart } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1QHlUlQAXWZFbvSxfnjqYX5Caak3l8yRz" 
            alt="Cookies on a rustic table" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sage-900/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="block text-sm md:text-base tracking-[0.2em] uppercase mb-4 opacity-90 animate-fade-in-up">Small Batch • Organic • Handcrafted</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-fade-in-up delay-100">
            Taste the <br/> <span className="italic text-[#84cc16]">Natural</span> Difference
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-earth-50 mb-10 opacity-90 animate-fade-in-up delay-200">
            We bake with 100% organic ingredients, earthy flavors, and a whole lot of love.
          </p>
          <div className="animate-fade-in-up delay-300">
            <Link 
                to="/shop" 
                className="inline-block bg-earth-500 hover:bg-earth-400 text-sage-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105"
            >
                Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 text-sage-600 mb-4">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-sage-900 mb-2">100% Organic</h3>
                    <p className="text-sage-600 text-sm">Sourced from local farms committed to sustainable practices.</p>
                </div>
                <div className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 text-sage-600 mb-4">
                        <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-sage-900 mb-2">Premium Quality</h3>
                    <p className="text-sage-600 text-sm">Belgian chocolate, ceremonial matcha, and Grade A maple syrup.</p>
                </div>
                <div className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 text-sage-600 mb-4">
                        <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-sage-900 mb-2">Baked Fresh</h3>
                    <p className="text-sage-600 text-sm">Baked every morning and shipped same-day for maximum freshness.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="font-serif text-3xl md:text-4xl text-sage-900 mb-2">Signature Bakes</h2>
                <p className="text-sage-600">Our customer favorites, fresh from the oven.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-sage-800 font-bold uppercase tracking-wider hover:text-earth-600 transition">
                View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link to="/shop" className="inline-flex items-center text-sage-800 font-bold uppercase tracking-wider border-b-2 border-sage-800 pb-1">
                View All Cookies <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Recommender Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
         <GeminiRecommender />
      </section>
    </div>
  );
};

export default Home;