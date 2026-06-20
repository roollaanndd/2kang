import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/website/Navbar';
import { Footer } from '../../components/website/Footer';

export function WebsiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAFA' }}>
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
