import React from 'react';

const Ingredients: React.FC = () => {
  return (
    <div className="min-h-screen bg-earth-50">
      <div className="bg-sage-900 text-white py-20 text-center">
        <h1 className="font-serif text-5xl mb-4">Our Ingredients</h1>
        <p className="text-sage-200 max-w-2xl mx-auto px-4">Nothing artificial. Nothing hidden. Just pure, organic goodness straight from the earth.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Wheat field" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
                <h2 className="font-serif text-3xl text-sage-900 mb-4">Heirloom Wheat</h2>
                <p className="text-sage-700 leading-relaxed">
                    We use stone-ground flour from local mills that process heirloom wheat varieties. This retains the nutrient-rich germ and bran, resulting in a deeper, nuttier flavor and better texture than commercial white flour.
                </p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1621315271772-28b9f39b0336?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Chocolate" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
                <h2 className="font-serif text-3xl text-sage-900 mb-4">Ethical Cacao</h2>
                <p className="text-sage-700 leading-relaxed">
                    Our chocolate is sourced from cooperatives in Ecuador and Peru that practice regenerative agriculture. Every chunk of chocolate in our cookies supports fair wages for farmers and biodiversity in the rainforest.
                </p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Butter" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
                <h2 className="font-serif text-3xl text-sage-900 mb-4">Grass-Fed Butter</h2>
                <p className="text-sage-700 leading-relaxed">
                    The secret to our richness? Butter with 84% butterfat from pasture-raised cows. It browns beautifully, creating those signature toffee notes in our classic cookies.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
