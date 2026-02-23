import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-earth-50 min-h-screen py-20">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-sage-900 mb-6">Get in Touch</h1>
            <p className="text-sage-700 leading-relaxed text-lg max-w-2xl mx-auto">
                Have a question about our organic ingredients, shipping, or looking for a custom order? 
                We're here to help. Reach out to us via email or WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Card */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-sage-100 flex flex-col items-center text-center hover:shadow-md transition-all group">
                <div className="bg-sage-50 p-5 rounded-full text-sage-600 mb-6 group-hover:bg-sage-100 transition-colors">
                    <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sage-900 uppercase tracking-wide text-xs mb-3">Email Us</h3>
                <a href="mailto:info@origenebakery.com" className="text-xl font-serif text-sage-900 hover:text-earth-600 transition mb-2">
                    info@origenebakery.com
                </a>
                <p className="text-sm text-sage-500">We'll respond within 24 hours.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-sage-100 flex flex-col items-center text-center hover:shadow-md transition-all group">
                <div className="bg-green-50 p-5 rounded-full text-green-600 mb-6 group-hover:bg-green-100 transition-colors">
                    <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sage-900 uppercase tracking-wide text-xs mb-3">WhatsApp</h3>
                <a 
                    href="https://wa.link/gzv6xy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-serif text-sage-900 hover:text-green-600 transition mb-2"
                >
                    016 3919411
                </a>
                <p className="text-sm text-sage-500">Available daily, 9am - 6pm.</p>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;