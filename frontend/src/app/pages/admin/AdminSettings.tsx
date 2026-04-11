import { useState, useEffect } from 'react';
import { Save, Store, Truck, MapPin, Link as LinkIcon, Share2, Image as ImageIcon, Upload, Loader2, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiRequest } from '../../utils/api';

const ImageUploadField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (val: string) => void, placeholder?: string }) => {
  const [uploading, setUploading] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return alert('Please drop an image file');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch(import.meta.env.VITE_API_URL + '/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onChange(data.imageUrl);
    } catch (err: any) { alert('Upload failed: ' + err.message); } 
      finally { setUploading(false); }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 relative">
          {value ? <img src={value} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-gray-400"><ImageIcon size={24}/></div>}
          {value && (
            <button type="button" onClick={() => onChange('')} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:text-red-700">
              <X size={14} />
            </button>
          )}
        </div>
        <div 
          onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={e => { e.preventDefault(); setIsDrag(false); const f = e.dataTransfer.files?.[0]; if(f) uploadFile(f); }}
          className={`flex-1 w-full relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors ${isDrag ? 'border-[#7a9e7e] bg-[#7a9e7e]/5' : 'border-gray-200 hover:border-gray-300'}`}
        >
          {uploading ? (
            <Loader2 className="animate-spin text-[#7a9e7e]" size={24} />
          ) : (
            <>
              <Upload size={20} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 font-medium">{placeholder || "Drag & drop image here or click"}</span>
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if(f) uploadFile(f); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export function AdminSettings() {
  const [formData, setFormData] = useState({
    shopName: '',
    tagline: '',
    slidingText: '',
    upiId: '',
    upiQrCode: '',
    whatsapp: '',
    email: '',
    address: '',
    shippingCharge: 0,
    freeShippingAbove: 0,
    expressCharge: 0,
    instagram: '',
    facebook: '',
    visuals: {
      hero1: '', hero2: '', hero3: '',
      cat1: '', cat2: '', cat3: '', cat4: '', cat5: '', cat6: '',
      sea1: '', sea2: '', sea3: '', about: '',
      gal1: '', gal2: '', gal3: '', gal4: '', gal5: '', gal6: ''
    }
  });

  const handleVisualChange = (key: string, val: string) => {
    setFormData(prev => ({ ...prev, visuals: { ...prev.visuals, [key]: val } }));
  };

  const [showToast, setShowToast] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/settings')
      .then(res => {
        setFormData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed fetching settings", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/settings', { method: 'PUT', body: formData });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch(err) {
      alert("Failed submitting settings securely");
    }
  };

  if (loading) return <div>Loading Backend Configurations...</div>;

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
            <Store size={20} className="text-[#d4a5a5]" /> Platform Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
              <input type="text" name="shopName" value={formData.shopName || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" name="tagline" value={formData.tagline || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Page Sliding Text</label>
              <input type="text" name="slidingText" value={formData.slidingText || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
              <p className="text-xs text-gray-400 mt-1">This text continuously scrolls across the home page banner. Add bullets (•) to space items out.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">UPI Id for Checkouts</label>
              <input type="text" name="upiId" value={formData.upiId || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#7a9e7e]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input type="text" name="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#7a9e7e]" />
            </div>
          </div>
          
          <div className="pt-2 pb-2">
            <h3 className="text-sm font-medium text-gray-700 mb-4 block">Store UPI QR Code</h3>
             <ImageUploadField label="" value={formData.upiQrCode || ''} onChange={v => setFormData(p => ({ ...p, upiQrCode: v }))} placeholder="Upload your static UPI QR code graphic here..." />
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

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-3 flex items-center gap-2">
            <Camera size={20} className="text-[#d4a5a5]" /> Storefront Visuals
          </h2>
          <p className="text-sm text-gray-500 pb-4">Manage the immersive imagery displayed across your homepage landing regions natively.</p>
          
          <div className="space-y-8">
             <div>
                <h3 className="text-[#2d3436] font-medium mb-4">Hero Section (Top Collage)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField label="Top Right Image" value={formData.visuals.hero1} onChange={v => handleVisualChange('hero1', v)} placeholder="Tall aesthetic image..." />
                   <ImageUploadField label="Bottom Left Image" value={formData.visuals.hero2} onChange={v => handleVisualChange('hero2', v)} placeholder="Wide balanced image..." />
                   <ImageUploadField label="Center Foreground" value={formData.visuals.hero3} onChange={v => handleVisualChange('hero3', v)} placeholder="Small accent pop image..." />
                </div>
             </div>

             <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[#2d3436] font-medium mb-4">Shop by Category (6 Images)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField label="1. Large Indoor Plants" value={formData.visuals.cat1} onChange={v => handleVisualChange('cat1', v)} />
                   <ImageUploadField label="2. Large Outdoor Plants" value={formData.visuals.cat2} onChange={v => handleVisualChange('cat2', v)} />
                   <ImageUploadField label="3. Succulents & Cacti" value={formData.visuals.cat3} onChange={v => handleVisualChange('cat3', v)} />
                   <ImageUploadField label="4. Flowering Plants" value={formData.visuals.cat4} onChange={v => handleVisualChange('cat4', v)} />
                   <ImageUploadField label="5. Herbs & Kitchen" value={formData.visuals.cat5} onChange={v => handleVisualChange('cat5', v)} />
                   <ImageUploadField label="6. Rare & Exotic" value={formData.visuals.cat6} onChange={v => handleVisualChange('cat6', v)} />
                </div>
             </div>

             <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[#2d3436] font-medium mb-4">Seasonal Picks Banner</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField label="Background Right" value={formData.visuals.sea1} onChange={v => handleVisualChange('sea1', v)} />
                   <ImageUploadField label="Background Left" value={formData.visuals.sea2} onChange={v => handleVisualChange('sea2', v)} />
                   <ImageUploadField label="Foreground Center" value={formData.visuals.sea3} onChange={v => handleVisualChange('sea3', v)} />
                </div>
             </div>

             <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[#2d3436] font-medium mb-4">About Us Region</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField label="Growing Together Journey Image" value={formData.visuals.about} onChange={v => handleVisualChange('about', v)} />
                </div>
             </div>
             
             <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[#2d3436] font-medium mb-4">Garden Gallery Strip (Footer Carousel)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField label="Gallery Image 1" value={formData.visuals.gal1} onChange={v => handleVisualChange('gal1', v)} />
                   <ImageUploadField label="Gallery Image 2" value={formData.visuals.gal2} onChange={v => handleVisualChange('gal2', v)} />
                   <ImageUploadField label="Gallery Image 3" value={formData.visuals.gal3} onChange={v => handleVisualChange('gal3', v)} />
                   <ImageUploadField label="Gallery Image 4" value={formData.visuals.gal4} onChange={v => handleVisualChange('gal4', v)} />
                   <ImageUploadField label="Gallery Image 5" value={formData.visuals.gal5} onChange={v => handleVisualChange('gal5', v)} />
                   <ImageUploadField label="Gallery Image 6" value={formData.visuals.gal6} onChange={v => handleVisualChange('gal6', v)} />
                </div>
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
