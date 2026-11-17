import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ShippingRates from './pages/ShippingRates';
import TrackShipment from './pages/TrackShipment';
import OurBrands from './pages/OurBrands';
import WhyChooseUs from './pages/WhyChooseUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import PwaPrompts from './components/PwaPrompts';
import RiderAppRoutes from './rider-app/RiderAppRoutes';

function MarketingLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shipping-rates" element={<ShippingRates />} />
          <Route path="/track-shipment" element={<TrackShipment />} />
          <Route path="/our-brands" element={<OurBrands />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>
      <Footer />
      <PwaPrompts />
    </div>
  );
}

function AppShellRouter() {
  const location = useLocation();
  const isRiderApp = location.pathname.startsWith('/app');

  if (isRiderApp) {
    return (
      <Routes>
        <Route path="/app/*" element={<RiderAppRoutes />} />
      </Routes>
    );
  }

  return <MarketingLayout />;
}

function App() {
  return (
    <Router>
      <AppShellRouter />
    </Router>
  );
}

export default App;
