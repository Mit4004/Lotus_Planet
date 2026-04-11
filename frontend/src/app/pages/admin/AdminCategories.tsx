import { useState } from 'react';
import { useAdminProducts, AdminCategory } from '../../context/AdminProductContext';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Upload, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

export function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '', isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description, image: cat.image, isActive: cat.isActive });
    setIsModalOpen(true);
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
      
      setFormData(prev => ({ ...prev, image: uploadData.imageUrl }));
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
    if (!formData.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory({ ...formData, id: `cat_${Date.now()}` } as AdminCategory);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#2d3436] font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Categories
          </h1>
          <p className="text-gray-500 mt-1">Organize your shop by plant types.</p>
        </div>
        <button onClick={openAddModal} className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={20} /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
              <ImageWithFallback src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4">
                {cat.isActive ? (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle size={12} /> Active</span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"><XCircle size={12} /> Hidden</span>
                )}
              </div>
            </div>
            <div className="p-5 relative">
              <h3 className="text-xl font-medium text-[#2d3436] mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{cat.description}</p>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50 text-right justify-end">
                <button onClick={() => openEditModal(cat)} className="text-gray-400 hover:text-blue-500 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  <Edit size={18} />
                </button>
                <button onClick={() => setDeleteConfirmId(cat.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-medium text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"><XCircle size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-4" id="cat-form">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none" />
                    
                    <div 
                      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`mt-3 border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-6 px-4 transition-colors relative ${isDragging ? 'border-[#7a9e7e] bg-[#7a9e7e]/5' : 'border-gray-300 hover:border-[#7a9e7e] hover:bg-gray-50'}`}
                    >
                      {uploadingImage ? (
                        <div className="flex flex-col items-center justify-center text-[#7a9e7e]">
                          <Loader2 size={24} className="animate-spin mb-2" />
                          <p className="font-medium text-sm">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 bg-[#f7f3ec] text-[#7a9e7e] rounded-full flex items-center justify-center mb-2">
                            <Upload size={18} />
                          </div>
                          <p className="font-medium text-[#2d3436] text-sm text-center">Drag & Drop or click to upload</p>
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a9e7e]/50 outline-none resize-none h-24" />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7a9e7e]"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">Set as Active</span>
                    </label>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-3 justify-end bg-gray-50 rounded-b-3xl">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                <button form="cat-form" type="submit" className="px-6 py-2.5 rounded-xl font-medium bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white transition-colors shadow-sm">Save Settings</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirmId(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-medium text-[#2d3436] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Delete Category?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this category? Products within it will not be deleted but may lose their categorization.</p>
              <div className="flex gap-4 justify-end">
                <button onClick={() => setDeleteConfirmId(null)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button onClick={() => { deleteCategory(deleteConfirmId); setDeleteConfirmId(null); }} className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
