import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-earth-200">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop';
            e.currentTarget.onerror = null;
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-sage-900 text-white px-3 py-1 text-xs uppercase tracking-widest font-bold">Sold Out</span>
          </div>
        )}
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-earth-700 uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="text-lg font-serif font-medium text-sage-900 leading-tight">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="text-lg font-medium text-sage-900">RM {product.price.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-sage-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 pt-4 border-t border-earth-100 flex items-center justify-between relative z-10">
             <span className="text-xs text-sage-400 italic">
                {product.ingredients.slice(0, 2).join(', ')}...
             </span>
             <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if(product.inStock) addToCart(product);
                }}
                disabled={!product.inStock}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors ${
                    product.inStock 
                    ? 'bg-sage-100 text-sage-800 hover:bg-sage-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
             >
                <Plus className="w-4 h-4" />
                <span>Add</span>
             </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
