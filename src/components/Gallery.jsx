import React, { useEffect, useState } from "react";
import plate from "../assets/round.png"
import eco from "../assets/leaf.jpg"
import collect from "../assets/process/collect.png"
import dry from "../assets/process/dry.png"
import cut from "../assets/process/cut.png"
import wash from "../assets/process/wash.png"
import pack from "../assets/process/pack.png"

const PhotoGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://multirising-exports-website2026.onrender.com/api/products");
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products for gallery:", error);
      }
    };
    fetchProducts();
  }, []);

  const fallbackImages = [
    { url: plate, text: "Round Plate" },
    { url: eco, text: "Eco Friendly" },
    { url: collect, text: "Collecting Process" },
    { url: dry, text: "Dry Process" },
    { url: cut, text: "Cutting Process" },
    { url: wash, text: "Washing Process" },
    { url: pack, text: "Packing Process" }
  ];

  // Gather all unique images from products
  const dynamicImages = products.flatMap(p => {
    const list = [];
    if (p.image) {
      list.push({ url: p.image, text: p.name });
    }
    if (Array.isArray(p.images)) {
      p.images.forEach(img => {
        if (img && img !== p.image) {
          list.push({ url: img, text: p.name });
        }
      });
    }
    return list;
  });

  const displayImages = dynamicImages.length > 0 ? dynamicImages : fallbackImages;

  return (
    <div className="container my-5 "  style={{paddingTop:"40px"}}>
      <h2 className="main-heading" data-aos="fade-up">
         Our Gallery
        </h2>
      <div className="row g-4">
        {displayImages.map((item, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <div className="gallery-box">
              <img src={item.url} alt="" className="img-fluid" />
              <div className="overlay">
                <h5>{item.text}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;