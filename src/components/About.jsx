import heroImage from "../assets/palm.jpg";
import logo from "../assets/logo.png";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 🔹 Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          className="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <h1 className="fw-bold display-6 display-md-5">
            ABOUT US
          </h1>

          <div
            className="bg-white mt-2"
            style={{ width: "60px", height: "3px" }}
          ></div>
        </div>
      </section>

      {/* 🔹 About Content */}
      
        <Container>
          <div className="text-center mt-3">
            <h2  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">About Us</h2>

            <div className="text-muted mx-auto text-start" style={{ maxWidth: "900px", lineHeight: "1.8", fontSize: "1.05rem" }}>
              <p className="mb-4">
                At Multirising Exports, we believe sustainability is not simply a choice — it is a way of life, gracefully reflected through timeless design and conscious craftsmanship.
              </p>
              <p className="mb-4">
                Inspired by a vision to redefine natural and handcrafted products beyond their conventional identity, we transform jute, bamboo, and traditional Shantinikethan leather craftsmanship into refined creations that embody elegance, functionality, and understated sophistication.
              </p>
              <p className="mb-4">
                Every piece we create is a harmonious expression of artisanal excellence, thoughtful design, and enduring style — from eco-luxury jute handbags and handcrafted bamboo décor to authentic Shantinikethan leather collections and curated gifting solutions, each crafted to be treasured for years to come.
              </p>
              <p className="mb-4">
                Deeply rooted in India’s rich artistic heritage, we proudly collaborate with skilled artisans from underprivileged communities, preserving traditional craftsmanship while fostering empowerment, dignity, and sustainable livelihoods.
              </p>
              <p className="mb-4 fw-semibold text-dark text-center" style={{ fontStyle: "italic" }}>
                At the heart of our philosophy lies a simple yet powerful belief:<br />
                that small, mindful choices can inspire meaningful change —<br />
                for people, for tradition, and for the planet.
              </p>
            </div>
            
          </div>
        </Container>
   

      {/* 🔹 Quality Section */}
      <Container className="py-5">
        <Row className="align-items-center g-4">
          
          {/* Image */}
          <Col xs={12} md={6} className="text-center">
            <Image src={logo} fluid className="p-3" style={{ maxHeight: "350px", objectFit: "contain" }} />
          </Col>

          {/* Text */}
          <Col xs={12} md={6}>
            <div className="mb-4 text-center text-md-start">
              <h4  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">Our Quality Assurance</h4>
              <p className="text-muted">
                We ensure consistent quality in all our products.
                Every item is hygienically processed following international
                standards.
              </p>
            </div>

            <div className="text-center text-md-start">
              <h4  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">Client Satisfaction</h4>
              <p className="text-muted">
                We focus on understanding client needs and delivering reliable,
                high-quality products with timely service and transparent
                business practices.
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </>
  );
}