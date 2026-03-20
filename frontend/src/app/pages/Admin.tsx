import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export function Admin() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const stats = [
    {
      label: 'Total Revenue',
      value: '₹12,458',
      change: '+12.5%',
      icon: DollarSign,
      color: '#7a9e7e'
    },
    {
      label: 'Total Orders',
      value: '348',
      change: '+8.2%',
      icon: ShoppingCart,
      color: '#d4a5a5'
    },
    {
      label: 'Products',
      value: '156',
      change: '+3.1%',
      icon: Package,
      color: '#7a9e7e'
    },
    {
      label: 'Customers',
      value: '1,249',
      change: '+15.3%',
      icon: Users,
      color: '#d4a5a5'
    }
  ];

  const products: Product[] = [
    { id: '1', name: 'Monstera Deliciosa', category: 'Tropical', price: 45, stock: 24, status: 'In Stock' },
    { id: '2', name: 'Fiddle Leaf Fig', category: 'Statement', price: 65, stock: 8, status: 'Low Stock' },
    { id: '3', name: 'Snake Plant', category: 'Air Purifying', price: 35, stock: 42, status: 'In Stock' },
    { id: '4', name: 'Peace Lily', category: 'Air Purifying', price: 38, stock: 0, status: 'Out of Stock' },
    { id: '5', name: 'Golden Pothos', category: 'Hanging', price: 28, stock: 36, status: 'In Stock' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Sarah Johnson', items: 3, total: 128, status: 'Delivered', date: '2026-03-15' },
    { id: '#1235', customer: 'Michael Chen', items: 1, total: 45, status: 'Processing', date: '2026-03-15' },
    { id: '#1236', customer: 'Emma Davis', items: 2, total: 93, status: 'Shipped', date: '2026-03-14' },
    { id: '#1237', customer: 'James Wilson', items: 4, total: 176, status: 'Delivered', date: '2026-03-14' },
    { id: '#1238', customer: 'Lisa Anderson', items: 1, total: 65, status: 'Processing', date: '2026-03-13' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ec] pt-32 pb-20 px-8 md:px-16 lg:px-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl mb-4 text-[#2d3436]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your plant shop with ease
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-md inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedTab === tab.id
                    ? 'bg-[#7a9e7e] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <Icon size={24} style={{ color: stat.color }} />
                      </div>
                      <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                    <p 
                      className="text-3xl text-[#2d3436]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {stat.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 
                    className="text-2xl text-[#2d3436]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Sales Overview
                  </h3>
                  <TrendingUp className="text-[#7a9e7e]" size={24} />
                </div>
                <div className="h-64 flex items-center justify-center bg-[#f7f3ec] rounded-xl">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h3 
                  className="text-2xl mb-6 text-[#2d3436]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-[#2d3436]">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#2d3436]">₹{order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            {/* Header with Add Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h3 
                className="text-2xl text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Product Inventory
              </h3>
              <div className="flex gap-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7a9e7e] transition-colors"
                  />
                </div>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors duration-300"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-600">Product Name</th>
                    <th className="text-left py-4 px-4 text-gray-600">Category</th>
                    <th className="text-left py-4 px-4 text-gray-600">Price</th>
                    <th className="text-left py-4 px-4 text-gray-600">Stock</th>
                    <th className="text-left py-4 px-4 text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-[#f7f3ec] transition-colors">
                      <td className="py-4 px-4 text-[#2d3436]">{product.name}</td>
                      <td className="py-4 px-4 text-gray-600">{product.category}</td>
                      <td className="py-4 px-4 text-[#2d3436]">₹{product.price}</td>
                      <td className="py-4 px-4 text-gray-600">{product.stock}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                          product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit size={18} className="text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h3 
              className="text-2xl mb-8 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Management
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-4 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-4 px-4 text-gray-600">Items</th>
                    <th className="text-left py-4 px-4 text-gray-600">Total</th>
                    <th className="text-left py-4 px-4 text-gray-600">Date</th>
                    <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-[#f7f3ec] transition-colors">
                      <td className="py-4 px-4 text-[#2d3436]">{order.id}</td>
                      <td className="py-4 px-4 text-gray-600">{order.customer}</td>
                      <td className="py-4 px-4 text-gray-600">{order.items}</td>
                      <td className="py-4 px-4 text-[#2d3436]">₹{order.total}</td>
                      <td className="py-4 px-4 text-gray-600">{order.date}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Customers Tab */}
        {selectedTab === 'customers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h3 
              className="text-2xl mb-8 text-[#2d3436]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Customer Management
            </h3>
            <div className="text-center py-20">
              <Users size={64} className="mx-auto mb-6 text-gray-300" />
              <p className="text-gray-600 text-lg">Customer management features coming soon</p>
            </div>
          </motion.div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddProduct(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 
                className="text-2xl mb-6 text-[#2d3436]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Add New Product
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7a9e7e]"
                    placeholder="e.g., Monstera Deliciosa"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Category</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7a9e7e]"
                    placeholder="e.g., Tropical Plants"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7a9e7e]"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7a9e7e]"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white rounded-xl transition-colors"
                >
                  Add Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
