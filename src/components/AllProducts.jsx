import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Accordion } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
// Firebase imports removed

import AOS from "aos";
import "aos/dist/aos.css";

import panner from "../assets/productbanner.png";
import "./css/product.css";
import "./css/loading.css";

const fallbackProducts = [
  {
    id: "jute-bag-1",
    name: "Premium Eco-Friendly Jute Bag",
    category: "Jute Products",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=80",
    description: "Premium eco-friendly jute bags and craft items."
  },
  {
    id: "bamboo-mug-1",
    name: "Sustainable Bamboo Mug",
    category: "Bamboo Products",
    image: "https://images.unsplash.com/photo-1618330834371-d68a9b3d16ce?auto=format&fit=crop&w=600&q=80",
    description: "Sustainable bamboo kitchenware and products."
  },
  {
    id: "leather-goods-1",
    name: "Handcrafted Pure Leather Wallet",
    category: "Leather Products",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80",
    description: "Exquisite handcrafted pure leather goods."
  }
];

const fallbackCategories = ["Jute Products", "Bamboo Products", "Leather Products"];

const faqData = {
  "Jute Products": [
    { q: "What are jute products?", a: "Jute products are eco-friendly items made from natural jute fiber, including bags, handbags, shopping bags, wallets, pouches, home décor, and packaging products." },
    { q: "What types of jute products do you export?", a: "We export jute handbags, shopping bags, wine bags, gift bags, pouches, wallets, folders, and promotional bags." },
    { q: "Can jute products be customized?", a: "Yes. Products can be customized in size, color, printing, logo, and packaging." },
    { q: "Do you offer private labeling?", a: "Yes. Private labeling and manufacturing services are available." },
    { q: "What materials are used with jute?", a: "Jute is often combined with cotton, canvas, leather, bamboo handles, or laminated fabric." },
    { q: "Can logos be printed on jute bags?", a: "Yes. Screen printing, digital printing, embroidery, and customized branding are available." },
    { q: "Are jute products suitable for corporate gifting?", a: "Yes. Jute bags and accessories are popular eco-friendly corporate gifting products." },
    { q: "Are jute products suitable for supermarkets and retail stores?", a: "Yes. Retailers widely use jute bags as reusable shopping bags." },
    { q: "Are jute products suitable for fashion brands?", a: "Yes. Jute is increasingly used in sustainable fashion and lifestyle products." },
    { q: "Are samples available before bulk orders?", a: "Yes. Product samples can be supplied for approval." },
    { q: "What are your payment terms?", a: "Payment terms are generally advance payment with balance before shipment or against documents." },
    { q: "Are handmade artisan products available?", a: "Yes. We work with skilled artisan communities producing handcrafted jute products." },
    { q: "Can custom tags and labels be added?", a: "Yes. Hang tags, barcode stickers, and woven labels can be customized." },
    { q: "Can buyers track shipments?", a: "Yes. Shipment tracking details are shared after dispatch." },
    { q: "Are jute products suitable for promotional events?", a: "Yes. Promotional jute bags are widely used for exhibitions and branding." },
    { q: "Can jute bags carry heavy products?", a: "Yes. Jute bags are designed for strength and durability." }
  ],
  "Leather Products": [
    { q: "What types of leather products do you export?", a: "We export leather wallets, purses, card holders, key pouches, coin pouches, organizers, and handcrafted leather accessories." },
    { q: "Are your leather products handmade?", a: "Many of our products are handcrafted by skilled artisans using traditional workmanship." },
    { q: "Do you offer customized leather products?", a: "Yes. We provide customization in design, size, color, stitching, logo, and packaging." },
    { q: "Do you support private labeling?", a: "Yes, we do. Private label manufacturing services are available." },
    { q: "Are leather gift sets available?", a: "Yes. Wallet and accessory gift sets can be customized for retail and corporate gifting." },
    { q: "Do you offer luxury leather collections?", a: "Yes. Premium leather collections with high-quality finishing are available." },
    { q: "Are mixed-product orders accepted?", a: "Yes. Buyers can combine multiple products in one shipment." },
    { q: "Can you handle bulk export orders?", a: "Yes. We can handle both small and large export quantities." },
    { q: "Do you provide product samples?", a: "Yes. Samples can be arranged before bulk production." },
    { q: "What packaging options are available?", a: "Standard export cartons, gift boxes, dust bags, and retail packaging options are available." },
    { q: "Can packaging be customized?", a: "Yes. Customized retail and premium packaging solutions are supported." },
    { q: "Can shipments be consolidated?", a: "Yes. Multiple product categories can be consolidated in one shipment." },
    { q: "What shipping methods are available?", a: "Sea freight, air freight, and courier shipments are available." },
    { q: "Are your products compliant with international standards?", a: "Yes. Products can be manufactured according to buyer country requirements." },
    { q: "Are handcrafted artisan collections available?", a: "Yes. Artisan-crafted GI Tagged leather products with traditional workmanship are available." },
    { q: "Are antique-finish leather products available?", a: "Yes. Vintage and antique-finish leather collections are available." },
    { q: "Are export samples available worldwide?", a: "Yes. Samples can be couriered internationally." },
    { q: "Do you provide container shipment support?", a: "Yes. Both FCL and LCL shipments can be arranged." }
  ],
  "Bamboo Products": [
    { q: "What type of bamboo products do you manufacture/export?", a: "We manufacture and export handcrafted bamboo products such as lamps, baskets, trays, home décor, utility items, gift articles, storage products, and eco-friendly lifestyle products." },
    { q: "Are your products handmade?", a: "Yes. Most of our bamboo products are handcrafted by skilled artisans using traditional techniques and modern finishing methods." },
    { q: "What is your minimum order quantity (MOQ)?", a: "MOQ depends on the product type and customization requirements. We support both small and bulk export orders." },
    { q: "Are your bamboo products durable?", a: "Yes. Properly treated bamboo products are lightweight, strong, durable, and suitable for long-term use." },
    { q: "Are the products chemically treated?", a: "We use safe and standard treatment methods to improve durability and resistance against insects and moisture." },
    { q: "Do you provide samples before bulk orders?", a: "Yes. Sample orders are available for quality evaluation before finalizing bulk production." },
    { q: "What packaging options do you provide?", a: "We provide export-standard packaging including corrugated boxes, bubble wrapping, barcode labels, and customized retail packaging." },
    { q: "Are your products suitable for gifting and retail stores?", a: "Yes. Our bamboo products are ideal for gift shops, eco stores, hotels, home décor stores, and online marketplaces." },
    { q: "Do you provide quality inspection before shipment?", a: "Yes. Every shipment undergoes quality checking before packing and dispatch." },
    { q: "What payment terms do you accept?", a: "We generally accept T/T (Bank Transfer), LC, and mutually agreed international payment terms." },
    { q: "Can you handle bulk export orders?", a: "Yes. We are capable of handling commercial bulk orders with consistent quality and timely delivery." },
    { q: "Are your products moisture resistant?", a: "Treated bamboo products have good resistance to normal moisture conditions, but proper storage is recommended." },
    { q: "Can buyers mix different products in one container?", a: "Yes. Mixed product orders are accepted depending on order quantity and logistics planning." },
    { q: "Are bamboo products safe for indoor use?", a: "Yes. Our bamboo products are suitable for indoor decorative and utility purposes." },
    { q: "What makes bamboo a preferred material?", a: "Bamboo is lightweight, sustainable, naturally attractive, and an excellent alternative to plastic and wood products." },
    { q: "How can buyers contact you for inquiries?", a: "Buyers can contact us through our website, email, WhatsApp, or social media platforms for quotations and product catalogs." },
    { q: "What are your bestselling bamboo products?", a: "Bamboo baskets, lamps, trays, storage organizers, and decorative handicrafts are among our bestselling products." },
    { q: "Do you offer branding support?", a: "Yes. We support private branding and packaging development." },
    { q: "Do buyers pay courier charges for samples?", a: "Yes. Courier charges are generally paid by buyers." },
    { q: "Can multiple samples be shipped together?", a: "Yes. Multiple product samples can be combined in one shipment." },
    { q: "Do you offer virtual product presentations?", a: "Yes. Product presentations can be arranged through online meetings." }
  ]
};

function Products() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      const API_BASE_URL = "https://multirising-exports-website2026.onrender.com";

      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/api/categories`, { signal: controller.signal })
      ]);

      clearTimeout(timeoutId);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      if (Array.isArray(productsData)) {
        const formattedProducts = productsData.map((p) => ({
          id: p._id,
          ...p
        }));
        setProducts(formattedProducts);
      } else {
        console.error("Products response is not an array:", productsData);
        setProducts(fallbackProducts);
      }

      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData.map((c) => c.name));
      } else {
        console.error("Categories response is not an array:", categoriesData);
        setCategories(fallbackCategories);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("Fetch products/categories timed out. Falling back to local default data.");
      } else {
        console.error("Error fetching products:", error);
      }
      setProducts(fallbackProducts);
      setCategories(fallbackCategories);
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
      selectedCategory
        ? (product.category === selectedCategory ||
          product.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(product.category?.toLowerCase()))
        : true;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="products-page-wrapper">

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

      {/* FAQ SECTION */}
      <div className="faq-section py-5">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="about-subtitle-wrapper d-flex align-items-center justify-content-center gap-3">
              <div className="gold-accent-line"></div>
              <span className="about-subtitle">FAQ</span>
              <div className="gold-accent-line"></div>
            </div>
            <h2 className="fw-bold brand-title mt-3 text-dark">
              {selectedCategory ? `${selectedCategory} FAQs` : "Frequently Asked Questions"}
            </h2>
            <p className="text-muted">Find answers to common questions about our products and export services.</p>
          </div>

          <Row className="justify-content-center" data-aos="fade-up">
            <Col lg={9}>
              {Object.keys(faqData)
                .filter(cat => !selectedCategory || cat.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(cat.toLowerCase()))
                .map((catName) => (
                  <div key={catName} className="mb-5 faq-category-group">
                    {!selectedCategory && (
                      <h4 className="faq-category-title mb-4 text-start fw-bold">
                        <span className="pb-1 border-bottom border-danger border-2 text-dark">{catName}</span>
                      </h4>
                    )}
                    <Accordion className="faq-accordion">
                      {faqData[catName].map((item, idx) => (
                        <Accordion.Item key={idx} eventKey={`${catName}-${idx}`}>
                          <Accordion.Header>{item.q}</Accordion.Header>
                          <Accordion.Body>{item.a}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
      </div>

    </div>

  );
}

export default Products;