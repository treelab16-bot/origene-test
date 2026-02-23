import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { FilterState, SortOption } from '../types';
import { Search, SlidersHorizontal } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useStore();
  const [filters, setFilters] = useState<FilterState>({ category: 'All', search: '' });
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NEWEST);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Classic', 'Seasonal', 'Tart', 'Premium', 'Vegan', 'Organic Five-Spice Vegetarian', 'Butter-Based Vegetarian (No Egg)', 'Gluten-Free'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    // Filter by search
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.ingredients.some(i => i.toLowerCase().includes(term))
      );
    }

    // Sorting
    switch (sortBy) {
      case SortOption.PRICE_LOW:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_HIGH:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.NEWEST:
      default:
        // Mock newest by ID descending
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  return (
    <div className="bg-earth-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl text-sage-900 mb-8 text-center">The Pantry</h1>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search cookies, ingredients..." 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-sage-200 focus:outline-none focus:border-sage-500 bg-white"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                />
            </div>

            <div className="flex w-full md:w-auto gap-4">
                 {/* Mobile Filter Toggle */}
                 <button 
                    className="md:hidden flex items-center justify-center px-4 py-3 bg-white border border-sage-200 rounded-lg text-sage-700"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                 >
                    <SlidersHorizontal className="w-5 h-5 mr-2" /> Filter
                 </button>

                 {/* Sort */}
                 <select 
                    className="px-4 py-3 bg-white border border-sage-200 rounded-lg text-sage-700 focus:outline-none focus:border-sage-500 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                 >
                    <option value={SortOption.NEWEST}>Newest Arrivals</option>
                    <option value={SortOption.PRICE_LOW}>Price: Low to High</option>
                    <option value={SortOption.PRICE_HIGH}>Price: High to Low</option>
                 </select>
            </div>
        </div>

        {/* Categories Tabs (Desktop) */}
        <div className="hidden md:flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilters(prev => ({...prev, category: cat}))}
                    className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${
                        filters.category === cat 
                        ? 'bg-sage-800 text-white shadow-lg' 
                        : 'bg-white text-sage-600 hover:bg-sage-100'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Mobile Filter Menu */}
        {isFilterOpen && (
            <div className="md:hidden mb-8 grid grid-cols-2 gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setFilters(prev => ({...prev, category: cat}));
                            setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded text-sm font-medium ${
                            filters.category === cat 
                            ? 'bg-sage-800 text-white' 
                            : 'bg-white text-sage-600 border border-sage-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-sage-500 text-lg">No cookies found matching your taste.</p>
                <button 
                    onClick={() => setFilters({category: 'All', search: ''})}
                    className="mt-4 text-earth-700 underline font-bold"
                >
                    Clear Filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
