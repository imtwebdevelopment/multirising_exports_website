import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageTranslator from "./LanguageTranslate";
import { FaEnvelope, FaPhone, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const NavbarComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState(["Jute Products", "Bamboo Products", "Leather Products"]);

  useEffect(() => {
    const fetchCategories = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      try {
        const API_BASE_URL = "https://multirising-exports-website2026.onrender.com";
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data.map((cat) => cat.name));
        }
      } catch (error) {
        console.warn("Fetch categories in Nav timed out / failed:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {/* TOP BAR */}
      <div className="topbar">
        <Container className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex gap-4 align-items-center topbar-contact">
            <span className="d-flex align-items-center gap-2 text-white">
              <FaPhone size={13} style={{ transform: "rotate(90deg)" }} />
              <a href="tel:+91 76192 10277" className="text-white text-decoration-none">+91 76192 10277</a>

            </span>
            <span className="d-flex align-items-center gap-2 text-white">
              <FaEnvelope size={13} />
              <a href="mailto:support@multirisingexports.com" className="text-white text-decoration-none">support@multirisingexports.com</a>
            </span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link social-link-facebook">
              <FaFacebookF size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link social-link-linkedin">
              <FaLinkedinIn size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link social-link-instagram">
              <FaInstagram size={14} />
            </a>
            <div className="ms-2 border-start border-white-50 ps-2 d-flex align-items-center">
              <LanguageTranslator />
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN NAVBAR */}
      <Navbar expand="lg" fixed="top" className="shadow-sm border-bottom bg-white main-navbar">
        <Container className="d-flex align-items-center justify-content-between">

          {/* Logo on Left */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-1">
            <img src={logo} alt="MultiRising Logo" className="navbar-logo" />
          </Navbar.Brand>

          {/* Toggle button for mobile */}
          <Navbar.Toggle aria-controls="main-navbar-nav" />

          {/* Center Links + Right Action Button */}
          <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center fw-semibold text-center py-3 py-lg-0 navbar-links-nav ms-auto">
              <Nav.Link as={NavLink} to="/" className="px-3 nav-link-custom">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" className="px-3 nav-link-custom">
                About Us
              </Nav.Link>

              <NavDropdown
                title="Products"
                id="products-dropdown"
                className="px-3 nav-dropdown-custom"
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {(categories.length > 0 ? categories : ["Jute Products", "Bamboo Products", "Leather Products"]).map((cat) => (
                  <NavDropdown.Item
                    key={cat}
                    as={NavLink}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link as={NavLink} to="/gallery" className="px-3 nav-link-custom">
                Gallery
              </Nav.Link>

              <Nav.Link as={NavLink} to="/blog" className="px-3 nav-link-custom">
                Blog
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact" className="px-3 nav-link-custom">
                Contact Us
              </Nav.Link>
            </Nav>

            {/* Catalog Download & Get a Quote Buttons */}
            <div className="d-flex align-items-center justify-content-center gap-3 ms-lg-3 mt-3 mt-lg-0 flex-column flex-lg-row">
              <a
                href="/Multirising_Product_Catalog_2026.pdf"
                download="Multirising - Product Catalog 2026.pdf"
                className="brand-btn-catalog btn"
              >
                Download Catalog
              </a>
              <Button as={Link} to="/contact" className="brand-btn-quote">
                Get a Quote
              </Button>
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;