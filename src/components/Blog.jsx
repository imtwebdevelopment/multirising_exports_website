import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import aboutBamboo from "../assets/about_bamboo.png";
import aboutJute from "../assets/about_jute.png";
import aboutLeather from "../assets/about_leather.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Sustainable Packaging: Why Jute is the Future",
      date: "June 08, 2026",
      author: "Admin",
      excerpt: "Discover how jute bags are revolutionizing global shipping and retail packaging, helping brands reduce plastic footprints with robust organic materials.",
      content: `In an era where sustainability is no longer optional, businesses worldwide are searching for packaging solutions that minimize environmental impact. Jute, often referred to as the "golden fiber," has emerged as one of the most powerful and eco-friendly packaging materials available today.

Why Jute is leading the revolution:
1. 100% Biodegradable & Compostable: Unlike plastic, which takes centuries to decompose, jute fibers break down naturally within a few months, leaving no toxic residue behind.
2. Low Carbon Footprint: Jute plants consume carbon dioxide and release oxygen at an extremely high rate compared to most trees. Cultivating jute requires very little water and fertilizer.
3. Durable & Reusable: Jute packaging is highly resilient, offering excellent heat insulation and breathability, making it ideal for shipping agricultural goods, retail bags, and industrial items.

At MultiRising Exports, we supply premium quality, customizable jute bags to global markets, enabling companies to transition to green supply chains seamlessly.`,
      image: aboutJute,
    },
    {
      id: 2,
      title: "Bamboo: The Miracle Plant for Eco-Friendly Homeware",
      date: "May 24, 2026",
      author: "Admin",
      excerpt: "Learn about the durability, hygiene, and carbon-negative footprint of bamboo-based utensils and home decor products in modern households.",
      content: `Bamboo is one of the fastest-growing plants on earth, making it a highly renewable resource. It has recently taken the homeware and kitchenware industries by storm, offering a natural and elegant alternative to plastics and traditional hardwoods.

Key benefits of bamboo products:
1. Rapid Growth Cycle: Bamboo can grow up to 3 feet in a single day and matures in just 3-5 years, compared to hardwoods which take decades.
2. Natural Strength and Durability: Bamboo has tensile strength comparable to steel, making utensils, cutting boards, and organizers incredibly sturdy and resistant to warping.
3. Antibacterial Properties: Bamboo possesses a natural bio-agent called "bamboo kun," which prevents bacteria from growing on it, making it exceptionally hygienic for food contact.

Our bamboo product collections combine traditional craftsmanship with state-of-the-art manufacturing to deliver elegant, long-lasting products that bring nature into your home.`,
      image: aboutBamboo,
    },
    {
      id: 3,
      title: "Handcrafted Leather: Balancing Tradition and Modern Fashion",
      date: "April 12, 2026",
      author: "Admin",
      excerpt: "Explore our ethical sourcing and crafting processes that make premium leather bags both durable and responsible style investments.",
      content: `Leather has been a symbol of durability and sophistication for centuries. In modern fashion, however, the focus is shifting towards responsible sourcing and classic craftsmanship. Investing in high-quality, ethically produced leather items is a step towards sustainable consumption.

Why premium handcrafted leather stands out:
1. Lifetime Product Span: High-grade leather products can last for decades when cared for properly, reducing the cycle of fast-fashion waste.
2. Artisanal Craftsmanship: Handcrafted stitching and brass hardware make each bag unique. The leather develops a beautiful patina over time, gaining character as it ages.
3. Ethical Practices: We partner with certified tanneries that prioritize water filtration and non-toxic tanning agents.

Our leather messenger bags and accessories represent the peak of artisan quality, custom-designed to serve the modern professional while honoring time-tested techniques.`,
      image: aboutLeather,
    },
  ];

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="blog-page-wrapper py-5" style={{ background: "#f8f9fa", minHeight: "80vh" }}>
      {/* Page Header Banner */}
      <div className="blog-header-banner text-center text-white py-5 mb-5" style={{ background: "linear-gradient(135deg, #072146, #b30e12)", borderRadius: "0 0 40px 40px" }}>
        <Container>
          <h1 className="display-4 fw-bold" style={{ fontFamily: "var(--font-serif)" }}>Our Blog</h1>
          <p className="lead" style={{ opacity: 0.9 }}>Insights on sustainability, craftsmanship, and global exports</p>
        </Container>
      </div>

      <Container>
        <Row className="g-4">
          {blogPosts.map((post, idx) => (
            <Col md={4} key={post.id} data-aos="fade-up" data-aos-delay={idx * 150}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px", overflow: "hidden", transition: "transform 0.3s ease" }}>
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={post.image}
                    style={{ height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="blog-card-img"
                  />
                </div>
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: "var(--color-navy)", fontFamily: "var(--font-serif)", fontSize: "1.2rem", lineHeight: 1.4 }}>
                    {post.title}
                  </h5>
                  <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {post.excerpt}
                  </Card.Text>
                  <Button
                    onClick={() => handleOpenPost(post)}
                    className="mt-3 brand-btn-quote"
                    style={{ width: "fit-content" }}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Article Modal */}
      {selectedPost && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold" style={{ color: "var(--color-navy)", fontFamily: "var(--font-serif)" }}>
              {selectedPost.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 pb-5 pt-2">
            <div className="d-flex gap-3 text-muted small mb-4">
              <span>Published: {selectedPost.date}</span>
              <span>Author: {selectedPost.author}</span>
            </div>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-100 mb-4 rounded shadow-sm"
              style={{ maxHeight: "380px", objectFit: "cover" }}
            />
            <div
              className="blog-full-content"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.05rem",
                color: "#333",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {selectedPost.content}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Blog;
