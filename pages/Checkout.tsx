import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartTotal, cart, placeOrder } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    // Only redirect if cart is empty
    if (cart.length === 0) {
        navigate('/shop');
    }
  }, [cart, navigate]);

  // If cart is empty, don't render anything while redirecting
  if (cart.length === 0) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Collect Basic Info
    const orderData: any = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zip, 
        totalAmount: `RM ${cartTotal.toFixed(2)}`,
        cart: {}
    };

    // 2. Collect Cart Items
    cart.forEach(item => {
        orderData.cart[item.name] = item.quantity;
    });

    // 3. Send to Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxjdT-_6OrIY-ZYdqrYRI3gYhMcBxYy9jiuqE-9F7U24TkGGiiCZCYi7DcgrGQVyP12/exec';

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        // Finalize order in store (clears cart)
        placeOrder(formData);
        
        // Show confirmation and redirect
        alert("Order Confirmed");
        navigate('/');

    } catch (error) {
        console.error("Error submitting order", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-earth-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl text-sage-900 mb-8 text-center">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="font-serif text-xl text-sage-900 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase text-sage-500 mb-1">Full Name</label>
                            <input required name="fullName" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase text-sage-500 mb-1">Email</label>
                            <input required type="email" name="email" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase text-sage-500 mb-1">Phone</label>
                            <input required type="tel" name="phone" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="font-serif text-xl text-sage-900 mb-4">Shipping Address</h2>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-sage-500 mb-1">Address</label>
                            <input required name="address" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-sage-500 mb-1">City</label>
                                <input required name="city" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-sage-500 mb-1">ZIP Code</label>
                                <input required name="zip" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-bold uppercase text-sage-500 mb-1">Country</label>
                            <select name="country" onChange={handleChange} className="w-full border border-sage-200 rounded p-2 focus:border-sage-500 outline-none bg-white">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Malaysia</option>
                            </select>
                        </div>
                     </div>
                </div>
            </form>

            {/* Review & Pay */}
            <div className="space-y-6">
                 <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="font-serif text-xl text-sage-900 mb-4">Order Summary</h2>
                    <ul className="space-y-3 mb-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between text-sm order-summary-item">
                                <span className="text-sage-600">{item.name} x {item.quantity}</span>
                                <span className="font-medium text-sage-900">RM {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-earth-200 pt-4 flex justify-between font-bold text-lg text-sage-900">
                        <span>Total</span>
                        <span id="totalPrice">RM {cartTotal.toFixed(2)}</span>
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-lg shadow-sm">
                    <button 
                        id="confirmOrderBtn"
                        form="checkout-form"
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white py-4 rounded-lg font-bold uppercase tracking-wider transition ${isSubmitting ? 'bg-sage-400 cursor-not-allowed' : 'bg-sage-900 hover:bg-sage-800'}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm Order'}
                    </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;