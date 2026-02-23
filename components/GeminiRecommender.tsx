import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getCookieRecommendation } from '../services/geminiService';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const GeminiRecommender: React.FC = () => {
  const { products } = useStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ id: string, reason: string } | null>(null);

  const handleRecommend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setRecommendation(null);
    
    // In a real app, you would verify API Key existence here or handle it gracefully
    if (!process.env.API_KEY) {
        setLoading(false);
        alert("Gemini API Key is not configured in this demo environment.");
        return;
    }

    const result = await getCookieRecommendation(input, products);
    if (result) {
      setRecommendation({
        id: result.recommendedProductId,
        reason: result.reason
      });
    }
    setLoading(false);
  };

  const recommendedProduct = recommendation 
    ? products.find(p => p.id === recommendation.id) 
    : null;

  return (
    <div className="bg-earth-200 rounded-xl p-6 md:p-8 my-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/50 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-sage-800">AI Flavor Matcher</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-sage-900 mb-3">Can't Decide? Ask Our AI Baker.</h2>
            <p className="text-sage-700 mb-6">
                Tell us your mood, favorite weather, or a flavor craving, and we'll pick the perfect cookie for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. 'I love coffee and rainy Sunday mornings'"
                    className="flex-grow px-4 py-3 rounded-lg border-2 border-transparent focus:border-sage-400 focus:outline-none text-sage-900 placeholder:text-sage-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                />
                <button 
                    onClick={handleRecommend}
                    disabled={loading}
                    className="bg-sage-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-sage-700 transition-colors flex items-center justify-center min-w-[140px]"
                >
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Find My Cookie'}
                </button>
            </div>

            {recommendedProduct && (
                <div className="bg-white rounded-lg p-6 shadow-lg text-left animate-fade-in flex flex-col md:flex-row items-center gap-6">
                    <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-24 h-24 rounded-full object-cover border-2 border-earth-200" />
                    <div>
                        <h3 className="font-serif text-xl text-sage-900 mb-1">{recommendedProduct.name}</h3>
                        <p className="text-sm text-sage-600 italic mb-3">"{recommendation?.reason}"</p>
                        <Link to={`/product/${recommendedProduct.id}`} className="text-amber-700 font-bold text-sm uppercase tracking-wider hover:underline flex items-center">
                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default GeminiRecommender;
