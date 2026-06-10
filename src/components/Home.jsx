import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import heroProducts from "../assets/hero_products.png";
import aboutBamboo from "../assets/about_bamboo.png";
import aboutJute from "../assets/about_jute.png";
import aboutLeather from "../assets/about_leather.png";
import logo from "../assets/logo.png";
import ShapesSection from "./ShapeSection";
import '../components/css/home.css';
import frame2 from "../assets/frame2.png";
import { useEffect, useState } from "react";
import AOS from "aos";
import ContactSection from "./ContactHome";
import { FaGlobe, FaStar, FaHandshake, FaLeaf, FaTruck, FaAward, FaUsers } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      try {
        const response = await fetch("https://multirising-exports-website2026.onrender.com/api/categories", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategoriesData(data);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.warn("Fetch categories on home timed out.");
        } else {
          console.error("Error fetching categories on home:", error);
        }
      }
    };
    fetchCategories();
  }, []);

  const fallbackCategories = [
    {
      name: "Jute Products",
      description: "Premium eco-friendly jute bags and craft items.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Bamboo Products",
      description: "Sustainable bamboo kitchenware and products.",
      image: "https://images.unsplash.com/photo-1618330834371-d68a9b3d16ce?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Leather Products",
      description: "Exquisite handcrafted pure leather goods.",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const displayCategories = categoriesData.length > 0
    ? categoriesData.map(cat => ({
        name: cat.name,
        description: cat.name.toLowerCase().includes("jute")
          ? "Premium eco-friendly jute bags and craft items."
          : cat.name.toLowerCase().includes("bamboo")
            ? "Sustainable bamboo kitchenware and products."
            : "Exquisite handcrafted pure leather goods.",
        image: cat.image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80"
      }))
    : fallbackCategories;

  return (
    <section className="home-page">

      {/* HERO SECTION */}
      <div className="hero-section-new">
        <Container>
          <Row className="align-items-center">
            {/* Left Column: Text & Content */}
            <Col lg={6} className="hero-text-col" data-aos="fade-right">
              <h1 className="hero-title-new">
                QUALITY PRODUCTS <br />
                GLOBAL <span className="highlight-red">TRUST</span>
              </h1>
              <div className="red-accent-line"></div>
              <p className="hero-desc-new">
                Multi Rising is committed to delivering high-quality, eco-friendly products with reliability and excellence worldwide.
              </p>
              <button className="btn-discover" onClick={() => navigate("/about")}>
                Discover More <span className="arrow">→</span>
              </button>
            </Col>
            
            {/* Right Column: Curved Image Frame */}
            <Col lg={6} className="hero-image-col mt-4 mt-lg-0" data-aos="fade-left">
              <div className="curved-frame-wrapper">
                <div className="curved-border-blue"></div>
                <div className="curved-border-red"></div>
                <div className="curved-image-container">
                  <img src={heroProducts} alt="MultiRising Premium Products" className="hero-products-img" />
                  {/* CSS overlay for the logo directly on the jute bag */}
                  <div className="logo-overlay-on-bag">
                    <img src={logo} alt="Logo overlay" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* STRENGTHS BAR */}
      <div className="strengths-bar">
        <Container>
          <Row className="g-4 justify-content-between align-items-center">
            <Col lg={3} md={6} className="strength-item">
              <div className="d-flex align-items-center gap-3 strength-item-inner">
                <div className="strength-icon-box">
                  <FaGlobe size={24} />
                </div>
                <div>
                  <h6 className="strength-title">GLOBAL PRESENCE</h6>
                  <p className="strength-desc">Exporting to multiple countries worldwide</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} className="strength-item">
              <div className="d-flex align-items-center gap-3 strength-item-inner">
                <div className="strength-icon-box">
                  <FaStar size={24} />
                </div>
                <div>
                  <h6 className="strength-title">PREMIUM QUALITY</h6>
                  <p className="strength-desc">Ensuring the highest quality in every product</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} className="strength-item">
              <div className="d-flex align-items-center gap-3 strength-item-inner">
                <div className="strength-icon-box">
                  <FaHandshake size={24} />
                </div>
                <div>
                  <h6 className="strength-title">TRUSTED PARTNER</h6>
                  <p className="strength-desc">Building long-term relationships</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} className="strength-item">
              <div className="d-flex align-items-center gap-3 strength-item-inner">
                <div className="strength-icon-box">
                  <FaLeaf size={24} />
                </div>
                <div>
                  <h6 className="strength-title">SUSTAINABLE PRODUCTS</h6>
                  <p className="strength-desc">Wide range of eco-friendly and handmade products</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ABOUT US SECTION */}
      <div className="about-section-new py-5">
        <Container>
          <Row className="align-items-center g-5">
            {/* Left: About Text */}
            <Col lg={6} data-aos="fade-right">
              <div className="about-subtitle-wrapper d-flex align-items-center gap-3">
                <span className="about-subtitle">About Us</span>
                <div className="gold-accent-line"></div>
              </div>
              <h2 className="about-heading mt-3">
                Reliable Products. Responsible Business.
              </h2>
              <p className="about-text-desc mt-4">
                Multi Rising is a trusted exporter of premium quality Bamboo, Jute, and Leather products. We focus on sustainability, innovation, and customer satisfaction.
              </p>
              <button className="btn-discover" onClick={() => navigate("/about")}>
                Read More <span className="arrow">→</span>
              </button>
            </Col>

            {/* Right: Three Category Cards */}
            <Col lg={6} data-aos="fade-left">
              <Row className="g-3">
                <Col xs={4}>
                  <div className="about-category-card">
                    <img src={aboutBamboo} alt="Bamboo poles" className="about-card-img" />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-category-card">
                    <img src={aboutJute} alt="Jute bag" className="about-card-img" />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-category-card">
                    <img src={aboutLeather} alt="Leather bag" className="about-card-img" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>


      {/* OUR CATEGORIES */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">
          Our Categories
        </h2>

        <Row className="g-4 mt-3">
          {displayCategories.map((cat, idx) => (
            <Col md={4} key={cat.name}>
              <Card
                className="product-card shadow-sm border-0 brand-card-hover"
                data-aos="fade-up"
                data-aos-delay={String((idx + 1) * 200)}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ overflow: "hidden", height: "240px" }}>
                  <Card.Img
                    variant="top"
                    src={cat.image}
                    style={{ height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="product-img"
                  />
                </div>
                <Card.Body>
                  <h5 className="fw-bold text-success mt-2">{cat.name}</h5>
                  <p className="text-muted">{cat.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          className="shop-btn brand-btn mt-4"
          onClick={() => navigate("/products")}
        >
          View All Products →
        </Button>
      </Container>

      <div className="export-banner text-center">

        <h2>Looking for Bulk Orders?</h2>

        <p>
          We export premium Bamboo, Jute, and Leather products worldwide with premium packaging
          and international quality standards.
        </p>

        <button
          className="shop-btn mt-3"
          onClick={() => navigate("/contact")}
        >
          Inquire Now
        </button>

      </div>



      {/* OUR SERVICES */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">Our Services</h2>

        <Row className="g-4 mt-3">
          {[1, 2, 3].map((item, i) => (
            <Col md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
              <div className="service-card shadow-sm p-4 brand-card-hover bg-white text-center">

                {/* ICON */}
                <div className="service-icon mb-3">
                  {i === 0 && <FaTruck size={50} />}
                  {i === 1 && <FaStar size={50} />}
                  {i === 2 && <FaGlobe size={50} />}
                </div>

                {/* TITLE */}
                <h5 className="fw-bold mt-2 text-dark">
                  {i === 0
                    ? "Fast Delivery"
                    : i === 1
                      ? "Premium Quality"
                      : "Global Export"}
                </h5>

                {/* TEXT */}
                <p className="text-muted">
                  {i === 0
                    ? "Quick & safe delivery worldwide."
                    : i === 1
                      ? "Highest international quality standards."
                      : "Reliable exports across the globe."}
                </p>

              </div>
            </Col>
          ))}
        </Row>
      </Container>


      {/* WHY CHOOSE US */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title mb-4">Why Choose Multirising Exports</h2>

        <Row className="g-4 mt-3">

          {/* 1 */}
          <Col md={4} data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-box p-4 shadow-sm brand-card-hover h-100 d-flex flex-column text-center">
              <div className="feature-icon mb-3">
                <FaLeaf size={50} className="text-success" />
              </div>
              <h5 className="mt-3 text-dark">100% Sustainable & Handcrafted</h5>
              <p className="text-muted flex-grow-1">
                Our collections are handcrafted from natural jute, durable bamboo, and authentic Shantinikethan leather. We use organic, eco-friendly materials that empower local artisans, preserving traditional techniques and reducing environmental footprint.
              </p>
            </div>
          </Col>

          {/* 2 */}
          <Col md={4} data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-box p-4 shadow-sm brand-card-hover h-100 d-flex flex-column text-center">
              <div className="feature-icon mb-3">
                <FaAward size={50} className="text-success" />
              </div>
              <h5 className="mt-3 text-dark">International Quality Standards</h5>
              <p className="text-muted flex-grow-1">
                Every creation undergoes rigorous quality checks to meet global standards. We combine artisanal excellence with modern quality controls, ensuring consistency, premium durability, and secure packaging for safe international delivery.
              </p>
            </div>
          </Col>

          {/* 3 */}
          <Col md={4} data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-box p-4 shadow-sm brand-card-hover h-100 d-flex flex-column text-center">
              <div className="feature-icon mb-3">
                <FaUsers size={50} className="text-success" />
              </div>
              <h5 className="mt-3 text-dark">Trusted by Global Clients</h5>
              <p className="text-muted flex-grow-1">
                We serve bulk buyers, global brands, boutique shops, and wholesalers across multiple countries. Our commitment to transparent communication, timely shipping, and exceptional craftsmanship has earned us long-term partnerships worldwide.
              </p>
            </div>
          </Col>

        </Row>
      </Container>

      {/* TESTIMONIALS / REVIEWS SECTION */}
      <div className="reviews-section py-5 bg-light-section">
        <Container>
          <div className="text-center mb-5">
            <div className="about-subtitle-wrapper d-flex align-items-center justify-content-center gap-3">
              <div className="gold-accent-line"></div>
              <span className="about-subtitle">Testimonials</span>
              <div className="gold-accent-line"></div>
            </div>
            <h2 className="fw-bold brand-title mt-3">What Our Clients Say</h2>
          </div>
          <Row className="g-4">
            {[
              {
                name: "Rajesh Gowda",
                role: "Green Earth Boutique, Bangalore",
                rating: 5,
                text: "The quality of the handcrafted jute handbags is exceptional. Our customers love the durability and the elegant Shantinikethan leather details. A reliable partner for sustainable luxury."
              },
              {
                name: "Karan Mehta",
                role: "Eco-Life Distributors, Bangalore",
                rating: 5,
                text: "We ordered bamboo kitchenware in bulk, and the craftsmanship exceeded expectations. The global delivery was timely, and the packaging met all international standards. Highly recommended!"
              },
              {
                name: "Ananya Rao",
                role: "Heritage Crafts Guild, Bangalore",
                rating: 5,
                text: "Multirising Exports brings authentic Indian craftsmanship to the world stage. Their commitment to supporting underprivileged artisan communities and maintaining premium quality is inspiring."
              }
            ].map((rev, idx) => (
              <Col md={4} key={idx} data-aos="fade-up" data-aos-delay={String(idx * 200)}>
                <div className="review-card p-4 shadow-sm h-100 d-flex flex-column bg-white">
                  <div className="stars-wrapper mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} className="text-gold me-1" size={16} />
                    ))}
                  </div>
                  <p className="review-text flex-grow-1 text-muted italic">
                    "{rev.text}"
                  </p>
                  <div className="review-author mt-4 border-top pt-3 d-flex align-items-center gap-3">
                    <div className="author-avatar d-flex align-items-center justify-content-center">
                      {rev.name.charAt(0)}
                    </div>
                    <div className="text-start">
                      <h6 className="author-name mb-0 fw-bold">{rev.name}</h6>
                      <span className="author-role text-muted small">{rev.role}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <ContactSection />

    </section>
  );
};

export default HeroSection;
