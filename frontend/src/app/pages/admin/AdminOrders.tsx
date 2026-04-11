import { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, ExternalLink, Clock, Package } from 'lucide-react';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
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
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs text-gray-500">{order._id.substring(order._id.length - 8)}</span>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
