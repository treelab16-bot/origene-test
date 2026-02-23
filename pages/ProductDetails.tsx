import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Minus, Plus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sage-600 mb-8 hover:text-sage-900 transition">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="relative bg-earth-100 rounded-lg overflow-hidden aspect-square md:aspect-auto h-full max-h-[600px]">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop';
                        e.currentTarget.onerror = null;
                    }}
                />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
                <span className="text-earth-600 font-bold tracking-widest uppercase text-sm mb-2">{product.category}</span>
                <h1 className="font-serif text-4xl md:text-5xl text-sage-900 mb-4">{product.name}</h1>
                <p className="text-2xl text-sage-800 font-medium mb-6">RM {product.price.toFixed(2)}</p>
                
                <p className="text-sage-600 leading-relaxed mb-8">
                    {product.description}
                </p>

                <div className="mb-8">
                    <h3 className="font-bold text-sage-900 uppercase tracking-wide text-xs mb-3">Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.ingredients.map(ing => (
                            <span key={ing} className="bg-sage-50 text-sage-700 px-3 py-1 rounded-full text-sm border border-sage-100">
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="border-t border-earth-200 pt-8">
                    {product.inStock ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-sage-300 rounded-lg w-32 justify-between px-2 py-3">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-1 text-sage-500 hover:text-sage-900"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-medium text-sage-900">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                                    className="p-1 text-sage-500 hover:text-sage-900"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button 
                                onClick={handleAddToCart}
                                className={`flex-grow py-3 px-6 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center transition-all ${
                                    added 
                                    ? 'bg-green-700 text-white' 
                                    : 'bg-sage-900 text-white hover:bg-sage-800'
                                }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" /> Added
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="text-red-600 font-bold uppercase tracking-wider p-4 bg-red-50 rounded text-center">
                            Currently Out of Stock
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
