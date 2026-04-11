import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, Clock, Package, ChevronDown, ChevronUp } from 'lucide-react';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await apiRequest('/orders', { token: user?.token });
      setOrders(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (orderId: string) => {
    setProcessing(orderId);
    try {
      await apiRequest(`/orders/${orderId}/verify-payment`, {
        method: 'PUT',
        token: user?.token
      });
      await fetchOrders();
    } catch (err: any) {
      alert('Failed to verify payment: ' + err.message);
    } finally {
      setProcessing(null);
    }
  };

  const rejectPayment = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to reject this payment? The customer will be notified.')) return;
    
    setProcessing(orderId);
    try {
      await apiRequest(`/orders/${orderId}/reject-payment`, {
        method: 'PUT',
        token: user?.token
      });
      await fetchOrders();
    } catch (err: any) {
      alert('Failed to reject payment: ' + err.message);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#7a9e7e]/20 p-2.5 rounded-xl text-[#2a4a2e]">
          <Package size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Customer Orders
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f7f3ec] text-gray-700 text-sm">
                  <th className="p-4 font-medium border-b border-gray-100">Order ID</th>
                  <th className="p-4 font-medium border-b border-gray-100">Customer</th>
                  <th className="p-4 font-medium border-b border-gray-100">Amount</th>
                  <th className="p-4 font-medium border-b border-gray-100">Status</th>
                  <th className="p-4 font-medium border-b border-gray-100">Payment Proof</th>
                  <th className="p-4 font-medium border-b border-gray-100 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.map(order => (
                  <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs text-gray-500">{order._id.substring(order._id.length - 8)}</span>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                      <button 
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)} 
                        className="flex items-center gap-1 text-[#7a9e7e] hover:text-[#2a4a2e] text-xs font-medium mt-2 transition-colors"
                      >
                        {expandedOrder === order._id ? <><ChevronUp size={14}/> Hide Details</> : <><ChevronDown size={14}/> View Full Details</>}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{order.customer?.name}</div>
                      <div className="text-gray-500 text-xs">{order.customer?.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-[#2d3436]">₹{order.total}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                          order.orderStatus === 'Placed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          order.orderStatus === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {order.orderStatus}
                        </span>
                        
                        {order.paymentStatus === 'Pending Verification' && (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">
                            <Clock size={10} /> Verify Payment
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {order.paymentScreenshot?.url ? (
                        <a 
                          href={order.paymentScreenshot.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[#7a9e7e] hover:text-[#2a4a2e] bg-[#7a9e7e]/10 px-3 py-1.5 rounded-lg border border-[#7a9e7e]/20 w-max transition-colors"
                        >
                          <ExternalLink size={14} /> View Slip
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Awaiting upload</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {order.paymentStatus === 'Pending Verification' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => verifyPayment(order._id)}
                            disabled={processing === order._id}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Verify Payment"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => rejectPayment(order._id)}
                            disabled={processing === order._id}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject Payment"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      ) : (
                        <span className={`text-xs font-medium ${
                          order.paymentStatus === 'Verified' ? 'text-green-600' : 
                          order.paymentStatus === 'Rejected' ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="p-0">
                    <td colSpan={6} className="p-0 border-0">
                      <AnimatePresence>
                        {expandedOrder === order._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden bg-gray-50/30"
                          >
                            <div className="p-6 border-b border-gray-100">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <div>
                                  <h4 className="font-medium text-[#2d3436] mb-3 border-b border-gray-100 pb-2">🚚 Delivery Instructions</h4>
                                  <div className="bg-[#f7f3ec]/50 p-4 rounded-xl text-xs leading-relaxed space-y-1">
                                    <p className="font-semibold text-gray-800 text-sm mb-1">{order.address?.fullName || order.customer?.name}</p>
                                    <p><span className="text-gray-400">Address:</span> {order.address?.house}, {order.address?.street}</p>
                                    {order.address?.landmark && <p><span className="text-gray-400">Landmark:</span> {order.address.landmark}</p>}
                                    <p><span className="text-gray-400">Area:</span> {order.address?.city}, {order.address?.state}</p>
                                    <p><span className="text-gray-400">Pincode:</span> <span className="font-medium">{order.address?.pincode}</span></p>
                                    <p className="pt-2 mt-2 border-t border-gray-200/50"><span className="text-gray-400">Contact:</span> {order.address?.phone || order.customer?.phone}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-[#2d3436] mb-3 border-b border-gray-100 pb-2">📦 Items Ordered ({order.items?.length})</h4>
                                  <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {order.items?.map((item: any, i: number) => (
                                      <li key={i} className="flex gap-3 items-center bg-[#f7f3ec]/30 p-2.5 border border-[#7a9e7e]/10 rounded-xl">
                                        {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-white" />}
                                        <div className="flex-1 min-w-0">
                                          <p className="truncate text-[13px] font-medium text-gray-800">{item.name}</p>
                                          <p className="text-[11px] text-gray-500">Size: {item.size} • ₹{item.price}</p>
                                        </div>
                                        <span className="flex-shrink-0 text-xs font-bold bg-[#7a9e7e]/20 text-[#2a4a2e] px-2.5 py-1 rounded-md">
                                          x{item.quantity}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500 font-medium bg-[#f7f3ec]/50 p-3 rounded-xl">
                                      <span>Shipping: ₹{order.shippingCharge}</span>
                                      <span>Subtotal: ₹{order.subtotal}</span>
                                      <span className="text-[#2a4a2e] font-bold text-sm">Total: ₹{order.total}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
