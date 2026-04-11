import { useState, useEffect } from 'react';
import { Save, Store, Truck, MapPin, Link as LinkIcon, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminSettings() {
  const [formData, setFormData] = useState({
    shopName: 'LotusPlanet',
    tagline: 'Where Every Corner Blooms',
    upiId: 'lotusplanet@upi',
    whatsapp: '+91 98765 43210',
    email: 'hello@lotusplanet.in',
    address: '123 Green Avenue, Botanic Sector, New Delhi',
    shippingCharge: 50,
    freeShippingAbove: 500,
    expressCharge: 150,
    instagram: 'https://instagram.com/lotusplanet',
    facebook: 'https://facebook.com/lotusplanet'
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lotusplanet_settings');
    if (saved) {
      try { setFormData(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('lotusplanet_settings', JSON.stringify(formData));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 font-medium"
          >
            <Save size={20} />
            Settings saved perfectly!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h1 className="text-3xl text-[#2d3436] font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
          Store Settings
        </h1>
        <p className="text-gray-500 mt-1">Configure your shop's global parameters and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-3 flex items-center gap-2">
            <Store size={20} className="text-[#d4a5a5]" /> General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
              <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-3 flex items-center gap-2">
            <MapPin size={20} className="text-[#d4a5a5]" /> Contact & Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp/Phone</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment UPI ID</label>
              <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-3 flex items-center gap-2">
            <Truck size={20} className="text-[#d4a5a5]" /> Shipping Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping</label>
              <span className="absolute left-3 top-9 text-gray-400">₹</span>
              <input type="number" name="shippingCharge" value={formData.shippingCharge} onChange={handleNumChange} className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Express Delivery</label>
              <span className="absolute left-3 top-9 text-gray-400">₹</span>
              <input type="number" name="expressCharge" value={formData.expressCharge} onChange={handleNumChange} className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Above</label>
              <span className="absolute left-3 top-9 text-gray-400">₹</span>
              <input type="number" name="freeShippingAbove" value={formData.freeShippingAbove} onChange={handleNumChange} className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-3 flex items-center gap-2">
            <Share2 size={20} className="text-[#d4a5a5]" /> Social Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <LinkIcon size={16} className="absolute left-3 top-10 text-gray-400" />
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none text-gray-600" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <LinkIcon size={16} className="absolute left-3 top-10 text-gray-400" />
              <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none text-gray-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-[#2d3a2e] hover:bg-[#1f2820] text-white px-10 py-3.5 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
            <Save size={20} /> Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
}
