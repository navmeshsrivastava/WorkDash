import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <main className="container">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
