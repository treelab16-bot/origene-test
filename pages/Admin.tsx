import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Plus, Trash, Edit, Package, BarChart } from 'lucide-react';

const Admin: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct, orders } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, category: 'Classic', description: '', image: 'https://picsum.photos/seed/new/500/500', ingredients: [], inStock: true, stockCount: 0
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if(newProduct.name && newProduct.price) {
        addProduct({
            id: Date.now().toString(),
            name: newProduct.name,
            price: Number(newProduct.price),
            category: newProduct.category as any,
            description: newProduct.description || '',
            image: newProduct.image || '',
            ingredients: (newProduct.ingredients as unknown as string).split(','),
            inStock: true,
            stockCount: Number(newProduct.stockCount)
        });
        setNewProduct({ name: '', price: 0, category: 'Classic', description: '', image: '', ingredients: [], stockCount: 0 });
    }
  };

  const toggleStock = (product: Product) => {
      updateProduct({ ...product, inStock: !product.inStock });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl text-gray-800">Admin Dashboard</h1>
            <div className="bg-white rounded-lg p-1 flex shadow-sm">
                <button 
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'products' ? 'bg-sage-800 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    Products
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'orders' ? 'bg-sage-800 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    Orders ({orders.length})
                </button>
            </div>
        </div>

        {activeTab === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Product Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input 
                                placeholder="Name" 
                                className="w-full border p-2 rounded" 
                                value={newProduct.name}
                                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                            />
                            <textarea 
                                placeholder="Description" 
                                className="w-full border p-2 rounded" 
                                value={newProduct.description}
                                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input 
                                    type="number" placeholder="Price (RM)" className="w-full border p-2 rounded"
                                    value={newProduct.price || ''}
                                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                                />
                                <input 
                                    type="number" placeholder="Stock" className="w-full border p-2 rounded"
                                    value={newProduct.stockCount || ''}
                                    onChange={e => setNewProduct({...newProduct, stockCount: parseInt(e.target.value)})}
                                />
                            </div>
                            <select 
                                className="w-full border p-2 rounded"
                                value={newProduct.category}
                                onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                            >
                                <option>Classic</option>
                                <option>Vegan</option>
                                <option>Organic Five-Spice Vegetarian</option>
                                <option>Butter-Based Vegetarian (No Egg)</option>
                                <option>Gluten-Free</option>
                                <option>Seasonal</option>
                                <option>Tart</option>
                                <option>Premium</option>
                            </select>
                            <input 
                                placeholder="Ingredients (comma separated)" 
                                className="w-full border p-2 rounded" 
                                value={newProduct.ingredients}
                                onChange={e => setNewProduct({...newProduct, ingredients: e.target.value as any})}
                            />
                            <input 
                                placeholder="Image URL" 
                                className="w-full border p-2 rounded" 
                                value={newProduct.image}
                                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                            />
                            <button className="w-full bg-sage-800 text-white py-2 rounded font-bold hover:bg-sage-700">Add Product</button>
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                                <tr>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={p.image} className="w-10 h-10 rounded object-cover bg-gray-200" alt="" />
                                            <div>
                                                <div className="font-medium text-gray-900">{p.name}</div>
                                                <div className="text-xs text-gray-500">{p.category}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700">RM {p.price.toFixed(2)}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => toggleStock(p)}
                                                className={`px-2 py-1 text-xs rounded font-bold ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {p.inStock ? `${p.stockCount} In Stock` : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700"><Trash className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No orders placed yet.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="p-4 font-mono text-xs text-gray-500">#{order.id}</td>
                                    <td className="p-4 font-medium">{order.customerName}</td>
                                    <td className="p-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">RM {order.total.toFixed(2)}</td>
                                    <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">{order.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
