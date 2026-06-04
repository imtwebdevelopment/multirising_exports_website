import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageTranslator from "./LanguageTranslate";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const NavbarComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_BASE_URL = import.meta.env.DEV 
          ? "http://localhost:5000" 
          : "https://multirising-exports-website2026.onrender.com";
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        const data = await response.json();
        setCategories(data.map((cat) => cat.name));
      } catch (error) {
        console.error("Error fetching categories in Nav:", error);
      }
    };
    fetchCategories();
  }, []);



  const greenIconStyle = { color: "green" }; // reusable style for all icons

  return (
    <div>
      {/* TOP BAR */}
      <div className="topbar d-lg-flex  d-none ">
        <Container className="d-flex justify-content-between align-items-center">

          <div className="d-flex gap-3">

            <span> <FaEnvelope />  infomultirisingexports@gmail.com</span>
            <span>  <FaEnvelope />  support@multirisingexports.com</span>
            <span>    <FaPhone style={{ transform: "rotate(90deg)", marginRight: "8px" }} />  +91 76192 10277</span>
          </div>
          <LanguageTranslator />
        </Container>
      </div>

      <Navbar expand="lg" fixed="top" className="shadow-sm border-bottom bg-white flex-lg-column">

        {/* MOBILE TOP ROW: Logo + Cart + User */}
        <Container className="d-flex d-lg-none justify-content-between align-items-center py-2">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Company Logo" height="60" />
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-3">
          </div>
        </Container>

        {/* MOBILE SECOND ROW: Navbar Toggle */}
        <Container className="d-flex d-lg-none justify-content-end">
          <Navbar.Toggle />
        </Container>

        {/* DESKTOP LOGO ROW */}
        <Container className="d-none d-lg-flex align-items-center justify-content-between py-2">
          <div style={{ width: "200px" }}></div>
          <Navbar.Brand as={Link} to="/" className="mx-auto">
            <img src={logo} alt="Company Logo" height="90" />
          </Navbar.Brand>

          <div className="d-flex align-items-center ms-auto">
            <Nav className="d-flex flex-row gap-3 align-items-center">
              <Navbar.Toggle />
            </Nav>
          </div>
        </Container>

        {/* NAV LINKS ROW */}
        <Container>
          <Navbar.Collapse className="justify-content-center pb-3">
            <Nav className="fw-semibold flex-column flex-lg-row text-center text-lg-start">
              <Nav.Link as={NavLink} to="/" className="nav-item-custom px-4">
                Home
              </Nav.Link>

              <NavDropdown
                title="Products"
                id="products-dropdown"
                className="px-4 nav-item-custom"
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <NavDropdown.Item as={NavLink} to="/products">
                  All Products
                </NavDropdown.Item>
                {(categories.length > 0 ? categories : ["Plates", "Bowls", "Trays", "Spoons"]).map((cat) => (
                  <NavDropdown.Item
                    key={cat}
                    as={NavLink}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link as={NavLink} to="/gallery" className="nav-item-custom px-4">
                Gallery
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" className="nav-item-custom px-4">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="nav-item-custom px-4">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </div>
  );
};

export default NavbarComponent;