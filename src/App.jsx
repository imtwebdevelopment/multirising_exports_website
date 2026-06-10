import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Nav";
import HeroSection from "./components/Home";
import PortfolioBanner from "./components/Portfolio";
import About from "./components/About";
import Footer from "./components/Footer";
import Facilities from "./components/Facilities";
import PhotoGallery from "./components/Gallery";
import AllProducts from "./components/AllProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/ProductDetails";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Terms from "./components/legal/Terms";
import ShippingPolicy from "./components/legal/ShippingPolicy";
import RefundPolicy from "./components/legal/RefundPolicy";
import ContactUs from "./components/Contact";
import Blog from "./components/Blog";
import { FaWhatsapp, FaPhone, FaCommentDots } from "react-icons/fa";


// Dummy pages (create these files)
// import Products from "./pages/Products";


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      once: true,     // animation happens only once
    });
  }, []);
  return (
    <>
      <div className="contact-float-container">

        {/* Main Button */}
        <button
          className={`contact-main-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <FaCommentDots />
        </button>

        {/* Tooltip Text */}
        <span className="contact-label">Contact Us</span>

        {/* Call Button */}
        <a
          href="tel:7619210277"
          className={`call-float child-btn ${open ? "show" : ""}`}
        >
          <FaPhone style={{ transform: "rotate(90deg)" }} />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/7619210277"
          className={`whatsapp-float child-btn ${open ? "show" : ""}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp />
        </a>

      </div>
      <ToastContainer position="top-right" autoClose={1500} />
      <NavbarComponent />



      <Routes>
        {/* Home Page */}

        <Route path="/" element={<HeroSection />} />

        {/* Products Page */}
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<PortfolioBanner />} />

        <Route path="/facilities" element={<Facilities />} />

        <Route path="/gallery" element={<PhotoGallery />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;