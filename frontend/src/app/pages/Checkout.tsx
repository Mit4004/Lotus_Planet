import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { MapPin, Phone, User as UserIcon } from 'lucide-react';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shipping = 50;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#f7f3ec] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="bg-[#7a9e7e] text-white px-6 py-3 rounded-xl">Back to Shop</button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedItems = items.map(item => ({
      productId: item.id, // Assuming cart item id matches backend db product ObjectId
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      quantity: item.quantity
    }));

    try {
      const res = await apiRequest<{ success: boolean; data: any }>('/orders', {
        method: 'POST',
        token: user?.token, // Optional if guest checkout is allowed
        body: {
          customer: { name: form.name, email: form.email, phone: form.phone },
          address: {
            fullName: form.name,
            phone: form.phone,
            house: form.house,
            street: form.street,
            landmark: form.landmark,
            city: form.city,
            state: form.state,
            pincode: form.pincode
          },
          items: formattedItems,
          subtotal: cartTotal,
          shippingCharge: shipping,
          total: cartTotal + shipping,
          paymentMethod: 'UPI' // defaulting to UPI for this flow
        }
      });
      
      const orderId = res.data._id;
      clearCart();
      navigate(`/payment/${orderId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f7f3ec]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-medium text-[#2d3436] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Checkout Details
          </h1>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{error}</div>}

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <UserIcon size={18} className="text-[#7a9e7e]" /> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Phone Number (Required for delivery updates)</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <MapPin size={18} className="text-[#d4a5a5]" /> Delivery Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">House/Flat No. & Building</label>
                  <input required type="text" name="house" value={form.house} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Street Address</label>
                  <input required type="text" name="street" value={form.street} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Nearest Landmark</label>
                  <input type="text" name="landmark" value={form.landmark} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">City</label>
                  <input required type="text" name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">State</label>
                  <input required type="text" name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Pincode</label>
                  <input required type="text" name="pincode" value={form.pincode} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]/50" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#7a9e7e]/20 sticky top-32">
            <h3 className="text-xl font-medium mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-[#2d3436]">{item.name}</h4>
                    <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                    <p className="font-semibold text-sm mt-1">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Flat Rate Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-[#2a4a2e] pt-3 border-t border-gray-100">
                <span>Total Amount</span>
                <span>₹{cartTotal + shipping}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-[#2a4a2e] hover:bg-[#1f3722] text-white py-4 rounded-xl font-medium transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center h-[56px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Proceed to Payment'
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              You will verify payment on the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
