import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
// Firebase imports removed
import "../components/css/productdetails.css"

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.DEV 
        ? "http://localhost:5000" 
        : "https://multirising-1.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct({ id: data._id, ...data });
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch suggestions
  const fetchSuggestions = async () => {
    try {
      const API_BASE_URL = import.meta.env.DEV 
        ? "http://localhost:5000" 
        : "https://multirising-1.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      const shuffled = data
        .map(p => ({ id: p._id, ...p }))
        .filter(p => p.id !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setSuggestions(shuffled);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchSuggestions();
  }, [id]);

  if (loading) {
    return <h3 className="text-center mt-5">Loading product...</h3>;
  }

  if (!product) {
    return <h3 className="text-center mt-5">Product Not Found</h3>;
  }

  // No auth or cart logic needed

  return (

    <Container className="p-5 mt-5 product-page">

      <Button
        variant="primary"
        className="shadow-sm mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </Button>

      <Row className="g-5">

        {/* Product Image */}

        <Col md={6}>
          <div className="product-image-wrapper shadow-lg">
            <Image src={product.image} fluid />
          </div>
        </Col>


        {/* Product Info */}

        <Col md={6}>

          <h2 className="fw-bold">{product.name}</h2>

          <div className="mb-2 text-warning">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            <span className="text-muted ms-2">(120 reviews)</span>
          </div>

          <p className="text-muted">

            {product.description ||
              "Premium eco-friendly product made from natural materials. Safe for food and perfect for events and daily use."}

          </p>


          {/* Buttons */}

          <div className="d-flex gap-3">

            <Button
              variant="success"
              size="lg"
              className="rounded-pill px-4 action-btn"
              onClick={() => navigate("/contact")}
            >
              Inquire Now
            </Button>

          </div>

        </Col>

      </Row>



      {/* Suggested Products */}

      <Row className="mt-5">

        <h4 className="fw-bold mb-4 text-center">You May Also Like</h4>

        {suggestions.map((item) => (

          <Col md={3} key={item.id}>

            <Card
              className="shadow-sm border-0 rounded-4 suggestion-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >

              <Card.Img
                src={item.image}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <Card.Body className="text-center">

                <Card.Title className="fw-semibold">
                  {item.name}
                </Card.Title>

                {/* Click card to view details & inquire */}

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>


      {/* Login modal removed */}

    </Container>
  );
}

export default ProductDetails;