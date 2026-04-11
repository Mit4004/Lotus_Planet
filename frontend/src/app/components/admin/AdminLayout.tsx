import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function AdminLayout() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-white/10 transition-colors text-[#f7f3ec]"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
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
        {/* Top Header Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
          <h2 className="text-xl font-semibold text-[#2d3436]" style={{ fontFamily: 'Playfair Display, serif' }}>
            LotusPlanet Admin
          </h2>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-[#7a9e7e]">
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
