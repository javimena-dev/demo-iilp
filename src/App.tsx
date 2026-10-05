import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ProgramDetailPage from '@/pages/ProgramDetailPage';
import RiltaPage from '@/pages/RiltaPage';
import ConvocatoriasPage from '@/pages/ConvocatoriasPage';
import ContactoPage from '@/pages/ContactoPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programas" element={<CatalogPage />} />
            <Route path="/programas/:slug" element={<ProgramDetailPage />} />
            <Route path="/rilta" element={<RiltaPage />} />
            <Route path="/revistas" element={<RiltaPage />} />
            <Route path="/convocatorias" element={<ConvocatoriasPage />} />
            <Route path="/eventos" element={<ConvocatoriasPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/instituto" element={<ContactoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}

