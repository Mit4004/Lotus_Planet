import { useState } from 'react';
import { useAdminProducts } from '../../context/AdminProductContext';
import { Link } from 'react-router';
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, Package } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

export function AdminProducts() {
  const { products, categories, deleteProduct, toggleProductVisibility } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || p.category === categoryFilter)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#2d3436] font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your inventory and catalog.</p>
        </div>
        <Link to="/admin/products/new">
          <button className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={20} />
            Add New Product
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50 appearance-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Product</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Category</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Price</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Stock</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                <th className="px-6 py-4 font-medium text-right border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback src={product.images[0] || ''} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-medium text-[#2d3436] block">{product.name}</span>
                        <div className="flex gap-1 mt-1">
                          {product.badges?.bestSeller && <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Best Seller</span>}
                          {product.badges?.newArrival && <span className="text-[10px] bg-[#d4a5a5]/20 text-[#d4a5a5] px-1.5 py-0.5 rounded">New</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4">
                    <div className="text-[#2d3436] font-medium">₹{product.basePrice}</div>
                    {product.salePrice && <div className="text-xs text-red-500 line-through">₹{product.salePrice}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.stockQuantity > product.lowStockAlert ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center min-w-[70px] ${
                      product.visibility === 'Active' ? 'bg-blue-100 text-blue-700' : 
                      product.visibility === 'Hidden' ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleProductVisibility(product.id)}
                        className="p-2 text-gray-400 hover:text-[#7a9e7e] transition-colors rounded-lg hover:bg-[#7a9e7e]/10"
                        title={product.visibility === 'Active' ? 'Hide Product' : 'Show Product'}
                      >
                        {product.visibility === 'Active' ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <Link to={`/admin/products/${product.id}`}>
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
                          <Edit size={18} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Package size={48} className="text-gray-300 mb-4" />
              <p className="text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-2xl font-medium text-[#2d3436] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Delete Product?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this product? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    deleteProduct(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
