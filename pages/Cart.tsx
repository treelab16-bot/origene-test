import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-earth-50 px-4">
        <h2 className="font-serif text-3xl text-sage-900 mb-4">Your cart is empty</h2>
        <p className="text-sage-600 mb-8">Looks like you haven't indulged yet.</p>
        <Link to="/shop" className="bg-sage-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-sage-800 transition">
            Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-earth-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-sage-900 mb-10 text-center md:text-left">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                        {cart.map((item) => (
                            <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                <Link to={`/product/${item.id}`} className="shrink-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-24 h-24 object-cover rounded-md bg-earth-100" 
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                </Link>
                                <div className="flex-grow text-center sm:text-left">
                                    <Link to={`/product/${item.id}`} className="font-serif text-lg text-sage-900 hover:text-earth-700">{item.name}</Link>
                                    <p className="text-sm text-sage-500 mt-1">RM {item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center border border-sage-200 rounded-md">
                                    <button 
                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                        className="p-2 text-sage-500 hover:bg-sage-50"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 font-medium text-sage-900">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                        className="p-2 text-sage-500 hover:bg-sage-50"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-right min-w-[80px]">
                                    <p className="font-medium text-sage-900">RM {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-sage-400 hover:text-red-500 transition"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Summary */}
            <div className="lg:w-1/3">
                <div className="bg-white rounded-lg p-8 shadow-sm sticky top-24">
                    <h2 className="font-serif text-xl text-sage-900 mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6 text-sm text-sage-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-sage-900">RM {cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                    </div>
                    <div className="border-t border-earth-200 pt-4 mb-8">
                        <div className="flex justify-between text-lg font-bold text-sage-900">
                            <span>Total</span>
                            <span>RM {cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-sage-900 text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-sage-800 transition flex items-center justify-center group"
                    >
                        Checkout <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-center text-sage-400 mt-4">Taxes calculated at checkout.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
