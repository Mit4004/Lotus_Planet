import { useAdminProducts } from '../../context/AdminProductContext';
import { Package, FolderTree, ShoppingBag, IndianRupee, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function AdminDashboard() {
  const { products, categories } = useAdminProducts();
  
  const metrics = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Categories', value: categories.length, icon: FolderTree, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending Orders', value: 0, icon: ShoppingBag, color: 'bg-orange-100 text-orange-600' },
    { label: 'Total Revenue', value: '₹0', icon: IndianRupee, color: 'bg-[#7a9e7e]/20 text-[#7a9e7e]' },
  ];

  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#2d3436] font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome back 🌿
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening in your store today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/categories">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Plus size={18} />
              Add Category
            </button>
          </Link>
          <Link to="/admin/products/new">
            <button className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow">
              <Plus size={18} />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <p className="text-2xl font-bold text-[#2d3436] mt-0.5">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>Recently Added Products</h2>
          <Link to="/admin/products" className="text-sm text-[#7a9e7e] hover:underline font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Product</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Category</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Price</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Stock</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-[#2d3436]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-[#2d3436] font-medium">₹{product.basePrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.stockQuantity > product.lowStockAlert ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stockQuantity} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.visibility === 'Active' ? 'bg-blue-100 text-blue-700' : 
                      product.visibility === 'Hidden' ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.visibility}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
