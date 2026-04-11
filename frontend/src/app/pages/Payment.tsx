import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { apiRequest } from '../utils/api';
import { ShieldCheck, Upload, Image as ImageIcon, CheckCircle, Clock, X, Copy } from 'lucide-react';

export function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [storeSettings, setStoreSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [orderRes, settingsRes] = await Promise.all([
        apiRequest(`/orders/${id}`),
        apiRequest('/settings')
      ]);
      setOrder(orderRes.data);
      setStoreSettings(settingsRes);
    } catch (err) {
      setError('Order or Settings not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');

    try {
      // 1. Upload to Cloudinary via backend
      const formData = new FormData();
      formData.append('image', file);

      const uploadRes = await fetch(import.meta.env.VITE_API_URL + '/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed');

      // 2. Attach screenshot to Order
      await apiRequest(`/orders/${id}/upload-screenshot`, {
        method: 'PUT',
        body: {
          paymentScreenshot: { url: uploadData.imageUrl, publicId: uploadData.publicId }
        }
      });

      // 3. Refresh Order State
      const ordRes = await apiRequest(`/orders/${id}`);
      setOrder(ordRes.data);

    } catch (err: any) {
      setError(err.message || 'Failed to submit payment. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center">Loading...</div>;
  if (!order) return <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f7f3ec]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-3xl mx-auto px-6">
        
        {order.paymentStatus === 'Pending Verification' ? (
          <div className="bg-white p-12 rounded-3xl shadow-md text-center border border-[#7a9e7e]/20">
            <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={40} />
            </div>
            <h1 className="text-3xl font-medium text-[#2d3436] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Payment Under Review
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We've received your payment screenshot for Order #{order._id}. Our team is currently verifying the transaction. You will receive an email confirmation once approved.
            </p>
            <button onClick={() => navigate('/shop')} className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-3.5 rounded-xl font-medium transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : order.paymentStatus === 'Verified' ? (
          <div className="bg-white p-12 rounded-3xl shadow-md text-center border border-[#7a9e7e]/20">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-medium text-[#2d3436] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Payment Verified!
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Thank you! Your payment for Order #{order._id} has been fully confirmed and we are preparing your plants for shipment.
            </p>
            <button onClick={() => navigate('/shop')} className="bg-[#7a9e7e] hover:bg-[#6a8e6e] text-white px-8 py-3.5 rounded-xl font-medium transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-[#7a9e7e]/20 overflow-hidden">
            <div className="bg-[#7a9e7e] text-white p-8 text-center relative overflow-hidden">
              <ShieldCheck size={120} className="absolute -right-4 -bottom-4 opacity-10" />
              <h1 className="text-3xl font-medium mb-2 relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                Complete Your Payment
              </h1>
              <p className="opacity-90 relative z-10">Order Amount: <span className="font-bold text-xl ml-1">₹{order.total}</span></p>
            </div>

            <div className="p-8 md:p-12">
              <div className="bg-[#f7f3ec] p-6 rounded-2xl mb-8 border border-[#7a9e7e]/10">
                <h3 className="font-medium text-[#2d3436] mb-4">Admin Payment Details</h3>

                {storeSettings?.upiQrCode && (
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-[#7a9e7e]/20 mb-6">
                    <p className="text-xs text-center text-gray-500 font-medium mb-3 uppercase tracking-wider">Scan to Pay via any UPI App</p>
                    <img src={storeSettings.upiQrCode} alt="Scan to Pay UPI QR Code" className="w-56 h-56 object-contain rounded-xl" />
                  </div>
                )}

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between border-b border-[#7a9e7e]/10 pb-2">
                    <span className="text-gray-500">Store Name</span>
                    <span className="font-medium">{storeSettings?.shopName || 'Lotus Planet'}</span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="text-gray-500">UPI ID</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#c49595]">{storeSettings?.upiId || 'lotusplanet@upi'}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(storeSettings?.upiId || 'lotusplanet@upi');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`p-1.5 rounded text-white text-xs flex items-center transition-colors ${copied ? 'bg-green-500' : 'bg-[#7a9e7e] hover:bg-[#6a8e6e]'}`}
                      >
                        {copied ? 'Copied' : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <h3 className="font-medium text-[#2d3436] mb-1">Upload Payment Screenshot</h3>
                <p className="text-xs text-gray-500 mb-4">Please transfer ₹{order.total} to the account above and upload the success screenshot here.</p>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-colors ${preview ? 'border-[#7a9e7e] bg-[#7a9e7e]/5' : 'border-gray-300 hover:border-[#7a9e7e] hover:bg-gray-50'}`}
                >
                  {preview ? (
                    <div className="relative w-full max-w-xs">
                      <img src={preview} alt="Screenshot Preview" className="w-full h-auto rounded-xl shadow-sm" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(''); }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-[#f7f3ec] text-[#7a9e7e] rounded-full flex items-center justify-center mb-4">
                        <ImageIcon size={28} />
                      </div>
                      <p className="font-medium text-[#2d3436]">Click to upload screenshot</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG, up to 5MB</p>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full mt-6 bg-[#2a4a2e] hover:bg-[#1f3722] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-colors shadow-lg flex justify-center items-center gap-2 h-[56px]"
              >
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Upload size={18} /> Submit Screenshot</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
