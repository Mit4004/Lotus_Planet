import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Settings, LogOut, Menu, X, Bell, Clock, IndianRupee } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../utils/api';

export function AdminLayout() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { user } = useAuth();
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (user?.token) {
      const fetchOrders = async () => {
        try {
          const res = await apiRequest('/orders', { token: user.token });
          const pending = res.data.filter((o: any) => o.paymentStatus === 'Pending Verification');
          setPendingOrders(pending);
          setPendingOrdersCount(pending.length);
        } catch { } // fail silently on background poll
      };
      
      fetchOrders();
      const interval = setInterval(fetchOrders, 60000); // Poll every minute
      return () => clearInterval(interval);
    }
  }, [user?.token]);

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const navLinks = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#7a9e7e] text-white">
      <div className="p-6">
        <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
          LotusPlanet
        </h2>
        <p className="text-[#f7f3ec]/80 text-sm mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{link.label}</span>
                </div>
                {link.label === 'Orders' && pendingOrdersCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] leading-tight font-bold px-2 py-0.5 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-white/10 transition-colors text-[#f7f3ec]"
        >
          <ShoppingCart size={20} />
          <span>View Storefront</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-[#d4a5a5]/20 text-[#f7f3ec] hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Shared notification bell + dropdown (used in both desktop bar and mobile header)
  const NotificationBell = () => (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setIsNotifOpen(prev => !prev)}
        className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
        title="Payment Notifications"
      >
        <Bell size={20} className={pendingOrdersCount > 0 ? 'animate-bounce' : ''} />
        {pendingOrdersCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
            {pendingOrdersCount > 9 ? '9+' : pendingOrdersCount}
          </span>
        )}
      </button>

      {isNotifOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-[#2d3436] text-sm">Payment Requests</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingOrdersCount} pending
              </span>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
            {pendingOrders.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={32} className="mx-auto mb-2 text-gray-200" />
                <p className="text-gray-400 text-sm">No pending payment requests</p>
              </div>
            ) : (
              pendingOrders.map(order => (
                <Link
                  key={order._id}
                  to="/admin/orders"
                  onClick={() => setIsNotifOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-amber-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2d3436] truncate">{order.customer?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Order #{order._id.slice(-8)}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 text-[#2a4a2e] font-semibold text-sm">
                    <IndianRupee size={13} />
                    {order.total}
                  </div>
                </Link>
              ))
            )}
          </div>

          {pendingOrders.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100">
              <Link
                to="/admin/orders"
                onClick={() => setIsNotifOpen(false)}
                className="block text-center text-xs font-semibold text-[#7a9e7e] hover:text-[#2a4a2e] transition-colors"
              >
                View All Orders →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex font-sans" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 bg-[#7a9e7e] shadow-xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-72 max-w-[80%] h-full flex flex-col shadow-2xl">
            <SidebarContent />
            <button 
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Bar */}
        <div className="hidden md:flex items-center justify-end px-8 py-3 bg-[#7a9e7e] shadow-sm sticky top-0 z-30">
          <NotificationBell />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#7a9e7e] shadow-sm sticky top-0 z-30">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            LotusPlanet Admin
          </h2>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 text-white bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
              <Menu size={22} />
            </button>
          </div>
        </div>

        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
