import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
// Firebase imports removed

import AOS from "aos";
import "aos/dist/aos.css";

import panner from "../assets/productbanner.png";
import "./css/product.css";
import "./css/loading .css";

function Products() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const fetchProducts = async () => {
    try {
      const API_BASE_URL = import.meta.env.DEV 
        ? "http://localhost:5000" 
        : "https://multirising-1.onrender.com";

      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/categories`)
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      const formattedProducts = productsData.map((p) => ({
        id: p._id,
        ...p
      }));

      setProducts(formattedProducts);
      setCategories(categoriesData.map((c) => c.name));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="products-page-wrapper">

      {/* HERO BANNER */}

      <div className="hero-banner-container">

        <img
          src={panner}
          alt="Banner"
          className="hero-banner"
          data-aos="fade-down"
        />

        <div className="hero-overlay">

          <div className="hero-text" data-aos="fade-right">

          <h1 
  className="fw-bold display-4 text-white"
  style={{ 
    color: "#1a1a1a",
    textShadow: "2px 2px 6px rgba(0,0,0,0.3)"
  }}
>
  🌿 Discover Natural & Eco Products
</h1>

<p 
  className="fw-bold fs-5 text-white"
  style={{ 
    color: "#333",
    textShadow: "1px 1px 4px rgba(0,0,0,0.25)"
  }}
>
  Sustainable, eco-friendly products crafted with care.
  Shop natural items that are good for you and the planet.
</p>

            <button
              className="shop-btn"
              onClick={() =>
                document
                  .querySelector(".main-heading")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Products
            </button>

          </div>

        </div>

      </div>

      {/* PRODUCTS SECTION */}

      <div className="products-section">

        {/* SEARCH + FILTER */}

        <Row className="filter-section mb-4 g-3 align-items-center" data-aos="fade-up">

          <Col md={6}>

            <div className="search-box">

              <i className="bi bi-search search-icon"></i>

              <Form.Control
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </Col>

          <Col md={6}>

            <div className="category-select">

              <i className="bi bi-grid category-icon"></i>

              <Form.Select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSearchParams(e.target.value ? { category: e.target.value } : {})}
              >

                <option value="">All Categories</option>

                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}

              </Form.Select>

            </div>

          </Col>

        </Row>

        {/* CATEGORY BUTTONS */}

        <div className="category-filter mb-4" data-aos="fade-up">

          <button
            className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => setSearchParams({})}
          >
            All
          </button>

          {categories.map((cat, idx) => (

            <button
              key={idx}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSearchParams({ category: cat })}
            >
              {cat}
            </button>

          ))}

        </div>

        <h2 className="main-heading" data-aos="fade-up">
          Products <span>For You</span>
        </h2>

        {/* PRODUCTS GRID */}

        <Row className="g-4">

          {loading ? (

            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading amazing products...</p>
            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="empty-products">
              <i className="bi bi-box-seam"></i>
              <h5>No products found</h5>
              <p>Try searching another product or category</p>
            </div>

          ) : (

            filteredProducts.map((product, index) => (

              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >

                <Card className="product-card-modern border-0 shadow-sm">

                  <div
                    className="card-img-container"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >

                    <Card.Img variant="top" src={product.image} />

                  </div>

                  <Card.Body>

                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>

                    <div className="price-section">

                      {/* <span className="product-price">
                        ₹{product.price}
                      </span> */}

                    </div>

                    <div className="rating-stars mb-3">

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>

                    </div>

                    <Button
                      variant="success"
                      className="w-100 action-btn rounded-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/contact");
                      }}
                    >
                      Inquire Now
                    </Button>

                  </Card.Body>

                </Card>

              </Col>

            ))

          )}

        </Row>

      </div>

    </div>

  );
}

export default Products;