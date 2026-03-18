import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
