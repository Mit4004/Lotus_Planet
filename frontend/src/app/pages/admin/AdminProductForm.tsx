import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAdminProducts, AdminProduct } from '../../context/AdminProductContext';
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useAdminProducts();
  
  const isEditMode = Boolean(id);
  const existingProduct = isEditMode ? products.find(p => p.id === id) : null;

  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: '',
    category: categories[0]?.name || '',
    shortDescription: '',
    fullDescription: '',
    difficulty: 'Medium',
    basePrice: 0,
    salePrice: null,
    sizePricing: { S: 0, M: 0, L: 0 },
    stockQuantity: 10,
    lowStockAlert: 2,
    images: [''],
    sunlight: 'Partial',
    watering: 'Weekly',
    soilType: 'Well-draining potting mix',
    petFriendly: false,
    airPurifying: false,
    growthRate: 'Medium',
    floweringSeason: '',
    badges: { newArrival: false, bestSeller: false, onSale: false, featured: false },
    visibility: 'Active'
  });

  const [errors, setErrors] = useState<{name?: string; basePrice?: string}>({});
  const [showToast, setShowToast] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData(existingProduct);
    }
  }, [isEditMode, existingProduct]);

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof AdminProduct] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    if ((formData.images || []).length < 6) {
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ''] }));
    }
  };

  const removeImageField = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    if (newImages.length === 0) newImages.push('');
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
        alert('Please drop an image file');
        return;
    }
    setUploadingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      const uploadRes = await fetch(import.meta.env.VITE_API_URL + '/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message);
      
      // Append strictly to images array trimming empty placeholder elements
      setFormData(prev => {
        const currentImgs = (prev.images || []).filter(u => u !== '');
        return { ...prev, images: [...currentImgs, uploadData.imageUrl] };
      });
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  };
  
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    if (!formData.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData.basePrice || formData.basePrice <= 0) newErrors.basePrice = 'Valid base price is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isEditMode && id) {
      updateProduct(id, formData);
    } else {
      const newId = `prod_${Date.now()}`;
      addProduct({ ...formData, id: newId } as AdminProduct);
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/admin/products');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 font-medium"
          >
            <Save size={20} />
            Product successfully saved!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl text-[#2d3436] font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plant Name *</label>
              <input type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select value={formData.category || ''} onChange={e => handleChange('category', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none">
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (Max 100 chars)</label>
            <textarea maxLength={100} value={formData.shortDescription || ''} onChange={e => handleChange('shortDescription', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none resize-none h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
            <textarea value={formData.fullDescription || ''} onChange={e => handleChange('fullDescription', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none min-h-[120px]" />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-4">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (₹) *</label>
              <input type="number" min="0" value={formData.basePrice || ''} onChange={e => handleChange('basePrice', Number(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border ${errors.basePrice ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none`} />
              {errors.basePrice && <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price (₹)</label>
              <input type="number" min="0" value={formData.salePrice || ''} onChange={e => handleChange('salePrice', e.target.value ? Number(e.target.value) : null)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input type="number" min="0" value={formData.stockQuantity || ''} onChange={e => handleChange('stockQuantity', Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Alert At</label>
              <input type="number" min="0" value={formData.lowStockAlert || ''} onChange={e => handleChange('lowStockAlert', Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Size Pricing Add-ons (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['S', 'M', 'L'].map(size => (
                <div key={size} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full font-medium text-sm border border-gray-200">{size}</span>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input type="number" min="0" value={(formData.sizePricing as any)?.[size] || 0} onChange={e => handleChange(`sizePricing.${size}`, Number(e.target.value))} className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <h2 className="text-xl font-medium text-[#2d3436] border-b border-gray-100 pb-4">Plant Characteristics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-3">
                {['Easy', 'Medium', 'Advanced'].map(diff => (
                  <label key={diff} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="difficulty" checked={formData.difficulty === diff} onChange={() => handleChange('difficulty', diff)} className="text-[#7a9e7e] focus:ring-[#7a9e7e]" />
                    <span className="text-sm text-gray-700">{diff}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sunlight</label>
              <select value={formData.sunlight || 'Partial'} onChange={e => handleChange('sunlight', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none">
                <option>Full Sun</option>
                <option>Partial</option>
                <option>Shade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Watering</label>
              <select value={formData.watering || 'Weekly'} onChange={e => handleChange('watering', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Rarely</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate</label>
              <select value={formData.growthRate || 'Medium'} onChange={e => handleChange('growthRate', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none">
                <option>Slow</option>
                <option>Medium</option>
                <option>Fast</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer pt-6">
                <input type="checkbox" checked={formData.petFriendly || false} onChange={e => handleChange('petFriendly', e.target.checked)} className="rounded text-[#7a9e7e] focus:ring-[#7a9e7e] w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Pet Friendly</span>
              </label>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer pt-6">
                <input type="checkbox" checked={formData.airPurifying || false} onChange={e => handleChange('airPurifying', e.target.checked)} className="rounded text-[#7a9e7e] focus:ring-[#7a9e7e] w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Air Purifying</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-xl font-medium text-[#2d3436]">Media & Display</h2>
            <button type="button" onClick={addImageField} disabled={(formData.images || []).length >= 6} className="text-sm text-[#7a9e7e] hover:text-[#2d3436] font-medium flex items-center gap-1 disabled:opacity-50">
              <Plus size={16} /> Add Image
            </button>
          </div>
          <div className="space-y-4">
            {(formData.images || []).map((url, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200">
                  {url ? <img src={url} alt="preview" className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-gray-400" />}
                </div>
                <input type="text" placeholder="https://images.unsplash.com/..." value={url} onChange={e => handleImageChange(i, e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                <button type="button" onClick={() => removeImageField(i)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-xl hover:bg-red-50">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div 
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`mt-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors relative ${isDragging ? 'border-[#7a9e7e] bg-[#7a9e7e]/5' : 'border-gray-300 hover:border-[#7a9e7e] hover:bg-gray-50'}`}
          >
            {uploadingImage ? (
              <div className="flex flex-col items-center justify-center text-[#7a9e7e]">
                <Loader2 size={32} className="animate-spin mb-3" />
                <p className="font-medium">Uploading securely...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#f7f3ec] text-[#7a9e7e] rounded-full flex items-center justify-center mb-4">
                  <Upload size={28} />
                </div>
                <p className="font-medium text-[#2d3436]">Drag & Drop to auto-upload image</p>
                <p className="text-xs text-gray-500 mt-1">Or click to select a file directly from your computer</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileInput} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  title="Upload Image" 
                />
              </>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl pt-4 mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Badges & Tags</h3>
            <div className="flex flex-wrap gap-6">
              {[
                { key: 'newArrival', label: 'New Arrival' },
                { key: 'bestSeller', label: 'Best Seller' },
                { key: 'onSale', label: 'On Sale' },
                { key: 'featured', label: 'Featured' }
              ].map(badge => (
                <label key={badge.key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={(formData.badges as any)?.[badge.key] || false} onChange={e => handleChange(`badges.${badge.key}`, e.target.checked)} className="rounded text-[#7a9e7e] focus:ring-[#7a9e7e] w-4 h-4" />
                  <span className="text-sm text-gray-700">{badge.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Visibility Status</label>
            <select value={formData.visibility || 'Active'} onChange={e => handleChange('visibility', e.target.value)} className="w-full md:w-64 px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none">
              <option>Active</option>
              <option>Draft</option>
              <option>Hidden</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-8 py-3 rounded-xl font-medium text-gray-600 hover:bg-white border border-transparent hover:border-gray-200 transition-all">
            Cancel
          </button>
          <button type="submit" className="bg-[#2d3a2e] hover:bg-[#1f2820] text-white px-10 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
            <Save size={20} />
            {isEditMode ? 'Update Product' : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
